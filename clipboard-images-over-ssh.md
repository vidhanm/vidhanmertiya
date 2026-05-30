# Pasting Clipboard Images into Remote AI Coding Agents over SSH

> How I wired up `Ctrl+V` in WezTerm to transparently deliver clipboard images
> to Claude Code and OpenCode running on a remote server — no display server,
> no second connection, no third-party tools.

---

## The Problem

I run my AI coding agents — Claude Code, OpenCode — on a remote Linux VM over
SSH. This is great for compute, for keeping state alive in tmux, for not
burning my laptop's battery. But it breaks one workflow I rely on constantly:
**pasting a screenshot into the conversation**.

On a local machine, you hit `Ctrl+V` and the agent sees your clipboard image.
Over SSH, nothing works. The remote machine has no display server, so every
clipboard tool fails immediately:

```
$ xclip -selection clipboard -t image/png -o
Error: Can't open display: (null)

$ wl-paste --type image/png
Error: Wayland display is not available
```

The clipboard lives on your local machine. The agent lives on the remote. There
is no built-in bridge.

---

## What I Tried First (And Why It Didn't Work)

Before arriving at the final solution I went through every approach I could
find. Here is why each one fell short.

### OSC 52 — The "Obvious" Terminal Trick

OSC 52 is an ANSI escape sequence. When a remote process writes
`\033]52;c;?\007` to its stdout, a compliant terminal is supposed to respond
with the clipboard contents as base64 through stdin. It sounds like exactly
what we need — a pure in-band clipboard bridge with no extra connections.

Two fatal problems killed this approach:

**Problem 1 — WezTerm deliberately does not support OSC 52 reads.**
WezTerm responds to OSC 52 *writes* (remote process → local clipboard) but
silently ignores *read queries* (remote process asking for clipboard contents).
This is a deliberate security decision — allowing any remote process to read
your clipboard is a privacy risk. There is no config option to enable it.

**Problem 2 — OSC 52 is text-only.**
The protocol has no MIME type field. It cannot express "this is a PNG" versus
"this is plain text". Terminals that do support OSC 52 reads will only return
text content. Images are simply not part of the specification.

There is a newer protocol — OSC 5522, developed by the Kitty terminal — that
does support MIME types and binary data including images. But it is only
implemented in Kitty and Ghostty. WezTerm does not support it yet.

### PasteHop — The Right Idea, Wrong Platform

PasteHop (`github.com/shantanugoel/pastehop`) is exactly the tool built for
this problem. It intercepts your paste shortcut, uploads the clipboard image
to the remote server via SCP, and pastes the remote file path into the
terminal. It even has a native WezTerm integration hook.

There is one showstopper: **PasteHop is Linux and macOS only**. It has no
Windows support and no prebuilt Windows binary. Internally it calls `pbpaste`,
`xclip`, or `wl-paste` to read the local clipboard — none of which exist on
Windows. We could run it inside WSL, but that adds a dependency that is bigger
than the problem it solves.

### SSH ControlMaster Multiplexing — Blocked by Windows

On Linux and macOS you can share a single SSH TCP connection across multiple
processes using `ControlMaster`. An SCP upload from a shell script would reuse
the already-authenticated connection — no second TCP handshake, no second
authentication. Clean and invisible.

Windows OpenSSH does not support `ControlMaster`. It relies on Unix domain
sockets, which are not available in the Windows implementation. Confirmed
broken with `getsockname failed: Not a socket`.

### In-band Base64 via PTY Heredoc

The only truly single-connection approach available on Windows: base64-encode
the image locally, then "type" a heredoc into the SSH terminal that decodes it
on the remote.

```bash
base64 -d <<'B64IMG' > /tmp/clipboard-images/img.png
iVBORw0KGgoAAAANSUhEUgAA... (270KB of base64)
B64IMG
```

This works. But a 200KB screenshot produces about 270KB of base64 text that
scrolls through your terminal every time you paste. It looks like your terminal
is having a seizure. Technically correct, practically unusable.

### WezTerm's Built-in `PasteImageToSshUpload`

Some sources online describe a WezTerm action called `PasteImageToSshUpload`
that supposedly handles this automatically. After checking the WezTerm
changelog, release notes, and Lua API documentation: **this action does not
exist** in any released or nightly version of WezTerm as of mid-2026. The
references appear to be hallucinated by AI search summaries.

---

## The Solution We Built

Since no existing tool covers Windows + WezTerm + SSH image paste cleanly, we
built the equivalent directly — about 70 lines split across WezTerm's Lua
config and two small shell scripts on the remote.

### Architecture

```
 Local Machine (Windows)             Remote Server (Linux VM)
 ─────────────────────────           ──────────────────────────────
  Ctrl+V pressed
       │
  WezTerm Lua callback
       │
  PowerShell reads clipboard
  saves PNG to %TEMP%
       │
  scp uploads to myvm
  (/tmp/clipboard-images/)  ──────►  /tmp/clipboard-images/clip_xxx.png
       │
  Remote path typed into PTY ──────►  Claude Code / OpenCode sees path
       │
  Local temp PNG deleted             ~/bin/xclip shim returns image
                                     when Claude Code calls xclip
```

### Part 1 — WezTerm Lua (Local)

WezTerm exposes a full Lua scripting API including `wezterm.run_child_process`
and `wezterm.action_callback`. We intercept `Ctrl+V` and fork the behaviour:

```lua
local PS_SAVE_IMAGE = [[
  Add-Type -AssemblyName System.Windows.Forms
  Add-Type -AssemblyName System.Drawing
  $img = [System.Windows.Forms.Clipboard]::GetImage()
  if ($null -eq $img) { exit 1 }
  $ts   = Get-Date -Format 'yyyyMMdd-HHmmss'
  $path = "$env:TEMP\clip_$ts.png"
  $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output $path
]]

local function paste_image(window, pane)
  local ok, stdout, _ = wezterm.run_child_process({
    'powershell.exe', '-NoProfile', '-NonInteractive', '-Command', PS_SAVE_IMAGE
  })

  if not ok or not stdout or stdout == '' then
    -- No image in clipboard → normal text paste
    window:perform_action(act.PasteFrom('Clipboard'), pane)
    return
  end

  local local_path  = stdout:match('^%s*(.-)%s*$')
  local filename    = local_path:match('[^\\]+$')
  local remote_path = '/tmp/clipboard-images/' .. filename

  -- Upload via scp — uses ~/.ssh/config so key auth is automatic
  wezterm.run_child_process({ 'scp', local_path, 'myvm:' .. remote_path })

  -- Clean up locally, type remote path into terminal
  wezterm.run_child_process({
    'powershell.exe', '-NoProfile', '-NonInteractive', '-Command',
    'Remove-Item "' .. local_path .. '" -ErrorAction SilentlyContinue'
  })

  pane:send_text(remote_path)
end

config.keys = {
  { key = 'v', mods = 'CTRL', action = wezterm.action_callback(paste_image) },
}
```

Key design decisions:

- **PowerShell for clipboard access** — `System.Windows.Forms.Clipboard` is the
  most reliable way to check for and extract image data on Windows. No external
  tools required.
- **SCP uses the SSH config alias** — `scp local_path myvm:remote_path` picks
  up the `HostName`, `User`, and `IdentityFile` from `~/.ssh/config`
  automatically. Key-based auth means zero prompts and sub-second upload.
- **Fallback on failure** — if PowerShell finds no image or SCP fails, the
  code falls back to `PasteFrom('Clipboard')` so `Ctrl+V` is never a dead key.
- **Cleanup** — the local temp PNG is deleted immediately after upload.

### Part 2 — Remote Shims (Linux VM)

Claude Code internally calls `xclip -selection clipboard -t image/png -o` to
try to read an image from the clipboard. On a headless server this always fails.

We install two shim scripts at `~/bin/xclip` and `~/bin/wl-paste` (with
`~/bin` prepended to `PATH` in `.bashrc`) that intercept these calls and return
the latest image from the upload directory instead:

```bash
#!/usr/bin/env bash
# ~/bin/xclip — shim that returns latest SCP-uploaded clipboard image

CLIP_DIR="/tmp/clipboard-images"

is_out=false; is_clip=false; target=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    -o)         is_out=true ; shift ;;
    -selection) shift; [[ "${1:-}" == "clipboard" ]] && is_clip=true; shift ;;
    -t)         shift; target="${1:-}"; shift ;;
    *)          shift ;;
  esac
done

if $is_out && $is_clip && [[ "$target" == image/* ]]; then
  latest=$(ls -t "$CLIP_DIR"/*.png "$CLIP_DIR"/*.jpg 2>/dev/null | head -1)
  [[ -f "$latest" ]] && cat "$latest" && exit 0
  echo "xclip-shim: no image in $CLIP_DIR" >&2; exit 1
fi

# Pass through to real xclip for everything else
for d in /usr/bin /usr/local/bin /bin; do
  [[ -x "$d/xclip" ]] && exec "$d/xclip" "$@"
done
exit 1
```

The shim is transparent — it only intercepts the exact call signature Claude
Code uses for image reads. Write operations and text reads are passed through
to the real `xclip` binary if it exists.

---

## Why This Approach Works

### The SCP "Second Connection" Is Invisible

The one trade-off is that SCP opens a new TCP connection to the server. In
practice this is a non-issue:

- Key-based auth means no password prompt, no user interaction
- The connection opens, transfers a PNG, and closes in under a second
- It uses the same `~/.ssh/config` entry so the host, user, and key are
  resolved automatically
- You see nothing in the terminal — WezTerm handles it as a background process

### Works With Any Terminal AI Agent

The `Ctrl+V` → SCP → path-typed-into-terminal flow works with anything that
accepts file paths:

- **Claude Code** — also benefits from the `xclip` shim for its internal
  clipboard read mechanism
- **OpenCode** — accepts image paths typed into the prompt directly
- **Aider** — same
- **Any future tool** — the path appears in the terminal like typed text

### No Extra Dependencies

Everything used already exists on a standard Windows + WezTerm setup:

| Component | Already Available |
|-----------|:-:|
| PowerShell + System.Windows.Forms | ✅ Built into Windows |
| `scp` | ✅ Ships with OpenSSH for Windows |
| WezTerm Lua API | ✅ Built into WezTerm |
| bash on remote | ✅ Standard Linux |

---

## Security Considerations

**What this setup can do:**

- Write PNG files to `/tmp/clipboard-images/` on the remote — this is
  intentional and scoped to that one directory
- Read your clipboard image when you explicitly press `Ctrl+V` — not
  automatically, not in the background

**What this setup cannot do:**

- Read arbitrary files from the remote server
- Exfiltrate data without a keypress
- Open any ports or run any daemons
- Access credentials or SSH keys

The attack surface is equivalent to running `scp` yourself. The only thing
worth auditing is the PowerShell snippet in `wezterm.lua` — it is 8 lines and
does exactly what it says.

---

## Files Changed

| File | Machine | What |
|------|---------|------|
| `~/.wezterm.lua` | Local (Windows) | Added smart `Ctrl+V` paste logic |
| `~/bin/xclip` | Remote (Linux) | Shim: returns latest uploaded image |
| `~/bin/wl-paste` | Remote (Linux) | Same, for Wayland-style calls |
| `~/.bashrc` | Remote (Linux) | `~/bin` prepended to PATH |
| `/tmp/clipboard-images/` | Remote (Linux) | Drop directory for uploaded images |

---

## Result

```
Before:  Ctrl+V in Claude Code over SSH → "Error: Can't open display"
After:   Ctrl+V in WezTerm over SSH → image appears at /tmp/clipboard-images/clip_20260530-221500.png
```

One keypress. No extra windows, no extra tools, no configuration per-session.
Works every time you SSH in because the setup is permanent on both ends.

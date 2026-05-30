export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "clipboard-images-over-ssh",
    title: "Pasting Clipboard Images into Remote AI Coding Agents over SSH",
    excerpt: "How I wired up Ctrl+V in WezTerm to transparently deliver clipboard images to Claude Code and OpenCode running on a remote server — no display server, no second connection, no third-party tools.",
    date: "May 31, 2026",
    readTime: "12 min read",
    tags: ["SSH", "WezTerm", "Terminal", "DevOps", "AI Agents"],
    content: `# Pasting Clipboard Images into Remote AI Coding Agents over SSH

> How I wired up \`Ctrl+V\` in WezTerm to transparently deliver clipboard images
> to Claude Code and OpenCode running on a remote server — no display server,
> no second connection, no third-party tools.

---

## The Problem

I run my AI coding agents — Claude Code, OpenCode — on a remote Linux VM over
SSH. This is great for compute, for keeping state alive in tmux, for not
burning my laptop's battery. But it breaks one workflow I rely on constantly:
**pasting a screenshot into the conversation**.

On a local machine, you hit \`Ctrl+V\` and the agent sees your clipboard image.
Over SSH, nothing works. The remote machine has no display server, so every
clipboard tool fails immediately:

\`\`\`
$ xclip -selection clipboard -t image/png -o
Error: Can't open display: (null)

$ wl-paste --type image/png
Error: Wayland display is not available
\`\`\`

The clipboard lives on your local machine. The agent lives on the remote. There
is no built-in bridge.

---

## What I Tried First (And Why It Didn't Work)

Before arriving at the final solution I went through every approach I could
find. Here is why each one fell short.

### OSC 52 — The "Obvious" Terminal Trick

OSC 52 is an ANSI escape sequence. When a remote process writes
\`\\033]52;c;?\\007\` to its stdout, a compliant terminal is supposed to respond
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

### The Solution We Built

Since no existing tool covers Windows + WezTerm + SSH image paste cleanly, we
built the equivalent directly — about 70 lines split across WezTerm's Lua
config and two small shell scripts on the remote.

#### Architecture

\`\`\`
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
\`\`\`

#### WezTerm Lua (Local)

WezTerm exposes a full Lua scripting API including \`wezterm.run_child_process\`
and \`wezterm.action_callback\`. We intercept \`Ctrl+V\` and fork the behaviour:

The key design decisions:

- **PowerShell for clipboard access** — \`System.Windows.Forms.Clipboard\` is the
  most reliable way to check for and extract image data on Windows
- **SCP uses the SSH config alias** — \`scp local_path myvm:remote_path\` picks
  up the HostName, User, and IdentityFile from ~/.ssh/config automatically
- **Fallback on failure** — if PowerShell finds no image, the
  code falls back to normal text paste so \`Ctrl+V\` is never a dead key
- **Cleanup** — the local temp PNG is deleted immediately after upload

#### Remote Shims (Linux VM)

Claude Code internally calls \`xclip -selection clipboard -t image/png -o\` to
try to read an image from the clipboard. On a headless server this always fails.

We install two shim scripts at \`~/bin/xclip\` and \`~/bin/wl-paste\` (with
\`~/bin\` prepended to PATH in \`.bashrc\`) that intercept these calls and return
the latest image from the upload directory instead.

---

## Why This Approach Works

### The SCP "Second Connection" Is Invisible

The one trade-off is that SCP opens a new TCP connection to the server. In
practice this is a non-issue:

- Key-based auth means no password prompt, no user interaction
- The connection opens, transfers a PNG, and closes in under a second
- It uses the same ~/.ssh/config entry so the host, user, and key are
  resolved automatically
- You see nothing in the terminal — WezTerm handles it as a background process

### Works With Any Terminal AI Agent

The \`Ctrl+V\` → SCP → path-typed-into-terminal flow works with anything that
accepts file paths.

### No Extra Dependencies

Everything used already exists on a standard Windows + WezTerm setup.

---

## Result

\`\`\`
Before:  Ctrl+V in Claude Code over SSH → "Error: Can't open display"
After:   Ctrl+V in WezTerm over SSH → image appears at /tmp/clipboard-images/clip_20260530-221500.png
\`\`\`

One keypress. No extra windows, no extra tools, no configuration per-session.
Works every time you SSH in because the setup is permanent on both ends.`,
  },

]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

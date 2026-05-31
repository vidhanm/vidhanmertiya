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
    excerpt: "How I wired up Ctrl+V in WezTerm to transparently deliver clipboard images to Claude Code and OpenCode running on a remote server - no display server, no second connection, no third-party tools.",
    date: "May 31, 2026",
    readTime: "12 min read",
    tags: ["SSH", "WezTerm", "Terminal", "DevOps", "AI Agents"],
    content: `# Pasting Clipboard Images into Remote AI Coding Agents over SSH

> How I wired up \`Ctrl+V\` in WezTerm to transparently deliver clipboard images
> to Claude Code and OpenCode running on a remote server - no display server,
> no second connection, no third-party tools.

---

## The Problem

I run my AI coding agents - Claude Code, OpenCode - on a remote Linux VM over
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

### OSC 52 - The "Obvious" Terminal Trick

OSC 52 is an ANSI escape sequence. When a remote process writes
\`\\033]52;c;?\\007\` to its stdout, a compliant terminal is supposed to respond
with the clipboard contents as base64 through stdin. It sounds like exactly
what we need - a pure in-band clipboard bridge with no extra connections.

Two fatal problems killed this approach:

**Problem 1 - WezTerm deliberately does not support OSC 52 reads.**
WezTerm responds to OSC 52 *writes* (remote process → local clipboard) but
silently ignores *read queries* (remote process asking for clipboard contents).
This is a deliberate security decision - allowing any remote process to read
your clipboard is a privacy risk. There is no config option to enable it.

**Problem 2 - OSC 52 is text-only.**
The protocol has no MIME type field. It cannot express "this is a PNG" versus
"this is plain text". Terminals that do support OSC 52 reads will only return
text content. Images are simply not part of the specification.

### The Solution We Built

Since no existing tool covers Windows + WezTerm + SSH image paste cleanly, we
built the equivalent directly - about 70 lines split across WezTerm's Lua
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

- **PowerShell for clipboard access** - \`System.Windows.Forms.Clipboard\` is the
  most reliable way to check for and extract image data on Windows
- **SCP uses the SSH config alias** - \`scp local_path myvm:remote_path\` picks
  up the HostName, User, and IdentityFile from ~/.ssh/config automatically
- **Fallback on failure** - if PowerShell finds no image, the
  code falls back to normal text paste so \`Ctrl+V\` is never a dead key
- **Cleanup** - the local temp PNG is deleted immediately after upload

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
- You see nothing in the terminal - WezTerm handles it as a background process

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

  },
  {
    id: "2",
    slug: "marc-lou-landing-pages",
    title: "I spent a weekend studying Marc Lou's landing pages. Here's what I found.",
    excerpt: "Two indie hackers. Four products. Nearly identical page structures. This is what I learned about how successful products actually sell themselves.",
    date: "May 28, 2026",
    readTime: "7 min read",
    tags: ["Landing Pages", "Copywriting", "Product Design", "Sales"],
    content: `# I spent a weekend studying Marc Lou's landing pages. Here's what I found.

So I've been building a product. And like every builder who's deep in the weeds of actual development, I hit the point where I had to think about the landing page.

I did what most people do - started googling "high converting landing page examples," opened a dozen tabs, felt overwhelmed, closed them all.

Then I remembered Marc Lou.

If you don't know him - he's a French indie hacker who's quietly built somewhere around 25 products, made over a million dollars from them, and was named Maker of the Year on Product Hunt in 2023. He runs multiple live products: ShipFast (a Next.js boilerplate), DataFast (revenue analytics), CodeFast (a coding course). All different categories. All built by one person.

I also pulled in PostBridge - a social media scheduling tool built by Jack Friks, a different indie hacker entirely. Same world, different person.

What I wanted to know was: is there a pattern? Does Marc build landing pages the same way each time? And if he does, does anyone else?

I went through all four pages section by section. What I didn't expect was that Marc and Jack - who I'm pretty sure didn't coordinate on this - had built pages that follow almost the same skeleton. Two people, independently, converging on the same approach.

That's when I stopped thinking about this as "Marc's style" and started thinking about it as a playbook.

## The page skeleton

Every single one of these pages has the same structure:

1. Hero - "What is this?"
2. Press Bar - "Is it real?"
3. Pain Section - "Do I actually need this?"
4. How It Works - "Is it complicated?"
5. Features - "What do I get?"
6. Founder Story - "Who built this?"
7. Testimonials - "Did it work for others?"
8. Pricing - "What's the cost?"
9. FAQ - "What's the catch?"
10. Final CTA - "Okay, I'm in."

Every section answers one silent question. The visitor isn't reading top to bottom - they're resolving doubt. Remove any section and you leave a question unanswered. Unanswered questions become reasons to leave.

## The headline formula (and why PostBridge breaks it interestingly)

I noticed this in the first five minutes and couldn't unsee it after.

Marc's product headlines follow one structure almost exactly: [Do something] in [shorter time unit], not [longer time unit].

ShipFast: "Ship your startup in days, not weeks."
CodeFast: "Learn to code in weeks, not months."
DataFast: "Revenue-first analytics." - shorter, but the subheadline delivers the same promise.

The second half - "not weeks," "not months" - is doing something clever. It activates the pain without needing a separate problem section. The person who's been putting off their startup reads "not weeks" and immediately maps that to their own situation. You've made them feel understood before they've read anything else.

Now here's where PostBridge gets interesting. Jack's headline is different: "Post to all your social accounts from one dashboard." No time compression. It's a clarity headline - here's what it does, stated plainly. But scroll slightly and you hit a stat he puts front and center: "2 min average time to post everywhere." Same psychology, different placement. The time compression is still there, just distributed differently across the hero.

Two builders, two slightly different executions, same underlying logic: your visitor is busy and time is the real cost. The headline's job is to show you're going to give some of it back.

## The enemy is never a competitor

This one surprised me more than anything else.

Every page has a section that could be called "why existing solutions suck." But neither Marc nor Jack ever names a specific product as the villain in their hero. The enemy is always the old way of doing things.

ShipFast doesn't say "better than Vercel templates." It shows a list of setup tasks: 4 hrs to set up emails. 6 hrs designing a landing page. 4 hrs to handle Stripe webhooks... totaling 22+ hours. The enemy is the process, not a product.

CodeFast doesn't say "better than Udemy." It says courses are designed for software engineers, not entrepreneurs. The enemy is a wrong assumption baked into the entire category.

DataFast doesn't attack Plausible in the hero. It says most analytics tools show you vanity metrics - pageviews, visitors - that tell you nothing about where your money comes from. The enemy is useless data.

PostBridge? Jack's version is in the founder story section, where he writes: "the existing tools I needed were way too expensive ($75-$200/month) for my needs and way too damn complex." No names. Just the category's failure.

If I say "Competitor X is bad," you might disagree because you've used X and liked it. If I say "the entire approach of doing this is broken," it's harder to argue with. You're not defending a product anymore, you're defending a worldview.

The competitor comparison does show up eventually - DataFast has a section called "How is it better than Plausible?" - but always much later. By then, you've already bought into the problem framing.

## The founder story position

Every page has a personal section. Marc's says "hey it's Marc." Jack's says "heyo! it's jack." The informality is intentional on both - no titles, no credentials upfront, just a name and a face.

This isn't surprising on its own. Lots of founders write about why they built their product. What caught my attention was where they put it.

It's never in the hero. It always comes after the features section, right before pricing. That placement is intentional and, once you think about it, obviously right.

If you put the founder story at the top, it feels like self-promotion. You're asking people to care about you before they understand what you've built. But by the time you've shown someone the problem, the solution, and the features - they're curious. Now the story feels like context, not bragging.

And credibility - follower counts, maker of the year titles, revenue numbers - always comes at the end of the story, never at the beginning. Starting with credentials feels like a pitch. Starting with a frustrating Tuesday afternoon and ending with proof feels like honesty.

## Social proof layers, not just testimonials

The testimonial wall is standard SaaS practice. What both Marc and Jack do differently is layer three types of proof in sequence - and the order is deliberate.

Numbers first, near the hero. "8,310 makers." "1,683 users." This just establishes the product exists and people use it. It doesn't tell you if they're happy, only that it's not a ghost town.

Twitter screenshots in the middle. Not designed testimonial cards - actual screenshots of tweets with usernames, timestamps, the general mess of a real post. Designed cards are easy to fabricate. A tweet screenshot looks like it came from a real public post you could go find. The authenticity signal is much stronger.

Video testimonials near pricing. By the time you're at pricing, the heaviest objections kick in. Video is harder to fake than text, and seeing a real person talk about specific results - revenue numbers, time saved - converts differently than reading a quote.

## The 8-second test, actually applied

There's a lot of writing about "the fold" and the 8-second rule in landing page advice. What struck me going through these pages was how seriously both Marc and Jack take it.

In every hero, without scrolling, you see: one headline, one CTA button, a user count, and a product screenshot or demo. Nothing competes for attention.

The product visual is always present - a dashboard screenshot, a code snippet, a demo video thumbnail. This removes the need for imagination. If I read "analytics tool" but see nothing, I have to guess what it looks like. Guessing is cognitive work. Work creates friction. The screenshot eliminates that entirely.

What's also notable is what's absent from these heroes. No paragraph explaining everything. No "the most powerful all-in-one solution for..." No buzzwords. Just: here's what it does, here's how fast, here's proof others are doing it.

## The thing underneath all of it

After going through all four pages, I think the pattern isn't really about landing page design. It's about a specific belief - that Marc and Jack seem to share - about how selling actually works.

They treat the landing page like a conversation with a skeptic, not an announcement to a crowd.

Every section answers a question that's running in the visitor's head. The hero answers "what is this?" The pain section answers "do I actually need this?" The how-it-works answers "is it complicated?" The founder story answers "who built this and why?" The testimonials answer "did it work for anyone like me?" The FAQ catches everything that slipped through.

Remove any section and you leave a question unanswered. Unanswered questions become reasons to leave.

The fact that two different builders - working in completely different categories, with no apparent coordination - independently arrived at nearly identical page structures suggests this isn't personal style. It's just what works.

I've been thinking about this because I'm building something called talkbook.live - a platform where you can have voice conversations with books instead of passively reading them. You pick a book, ask it anything, and it responds like a tutor who's read the whole thing.

Going through these pages forced me to think clearly about what I'm actually selling and what my visitor's silent objections are. The headline I landed on - "Talk to any book. Learn it in hours, not months" - is a direct result of understanding the time-compression formula.

The founder story on my page starts with: "I had 47 books on my shelf. I'd finished maybe 6." Because that's the honest truth, and it turns out the honest truth is usually the right opening.

If you're building something and thinking about how to present it to the world, I'd genuinely recommend doing this exercise. Pick 3-4 products in a space you admire, go through each page slowly, and ask: why is this section here? What question is it answering? What would happen if it wasn't there?

The patterns reveal themselves pretty fast. And once you see them, you can't unsee them.`,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

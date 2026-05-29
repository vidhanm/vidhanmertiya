"use client"

import { useRef, useState } from "react"
import Image from "next/image"

import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Play } from "lucide-react"

type ProjectLink = {
  label: string
  href: string
}

type Project = {
  name: string
  href: string
  description: string
  tag: string
  accent: string
  previewType: "iframe" | "placeholder" | "video"
  videoSrc?: string
  showPlayOverlay?: boolean
  links: ProjectLink[]
  tech: string[]
}

const projects: Project[] = [
  {
    name: "TalkBook",
    href: "https://talkbook.live/",
    description: "A conversational product landing page with a polished real-world feel.",
    tag: "Commercial",
    accent: "from-stone-200 via-zinc-100 to-neutral-100",
    previewType: "iframe",
    links: [{ label: "Live", href: "https://talkbook.live/" }],
    tech: ["Landing Page", "Product", "Messaging"],
  },
  {
    name: "JobSpy",
    href: "/jobspy-preview.mp4",
    description:
      "A comprehensive web application to list and search for jobs across all major employment websites. Features resume upload functionality for personalized job suggestions using AI.",
    tag: "Video",
    accent: "from-amber-200 via-orange-100 to-rose-100",
    previewType: "video",
    videoSrc: "/jobspy-preview.mp4",
    showPlayOverlay: true,
    links: [{ label: "Video", href: "/jobspy-preview.mp4" }],
    tech: ["Go", "Python", "PostgreSQL", "Next.js", "Docker"],
  },
  {
    name: "IITM Quizzes",
    href: "https://github.com/vidhanm/IITM-quizzes",
    description:
      "Full-stack web application for quiz attempts with LLM-generated explanations. Features auto-deployment using GitHub Actions and modern UI components.",
    tag: "Repo",
    accent: "from-sky-200 via-cyan-100 to-indigo-100",
    previewType: "placeholder",
    links: [{ label: "Repo", href: "https://github.com/vidhanm/IITM-quizzes" }],
    tech: ["React", "Flask", "Go", "LLM", "TypeScript"],
  },
  {
    name: "CoinCraft",
    href: "https://coincraft-two.vercel.app/",
    description:
      "Full-stack web application teaching children financial literacy through AI-generated learning modules with gamification elements including coins and achievements.",
    tag: "Live",
    accent: "from-violet-200 via-fuchsia-100 to-pink-100",
    previewType: "iframe",
    links: [
      { label: "Live", href: "https://coincraft-two.vercel.app/" },
      { label: "Repo", href: "https://github.com/vidhanm/coincraft" },
    ],
    tech: ["Vue.js", "Flask", "SQLite", "LLM", "TypeScript"],
  },
  {
    name: "Household Services App",
    href: "https://github.com/vidhanm/household-services",
    description:
      "Full-stack web application for on-demand household services, enabling users to book professionals seamlessly. Features robust document verification for trust and security.",
    tag: "Repo",
    accent: "from-emerald-200 via-lime-100 to-yellow-100",
    previewType: "placeholder",
    links: [{ label: "Repo", href: "https://github.com/vidhanm/household-services" }],
    tech: ["TypeScript", "Vue.js", "Flask", "SQLite"],
  },
  {
    name: "RL-Based Voice Agent",
    href: "https://github.com/vidhanm/RL-DDQ",
    description:
      "DDQ (Dyna-style) reinforcement learning agent for optimal conversation strategies using self-play. Features semantic caching, multi-step planning, and multilingual support (Hindi/Hinglish).",
    tag: "Repo",
    accent: "from-stone-200 via-zinc-100 to-neutral-100",
    previewType: "placeholder",
    links: [{ label: "Repo", href: "https://github.com/vidhanm/RL-DDQ" }],
    tech: ["FastAPI", "Keras", "Reinforcement Learning", "NLU"],
  },
  {
    name: "ML Flashcards",
    href: "https://ml-flashcards.vercel.app/",
    description: "Interactive flashcards for machine learning concepts.",
    tag: "Learning",
    accent: "from-amber-200 via-orange-100 to-rose-100",
    previewType: "iframe",
    links: [{ label: "Live", href: "https://ml-flashcards.vercel.app/" }],
    tech: ["Education", "Flashcards", "Web App"],
  },
  {
    name: "100 Days of CUDA",
    href: "https://100daysofcuda.vercel.app/",
    description: "A learning log and showcase for CUDA practice and experiments.",
    tag: "Technical",
    accent: "from-sky-200 via-cyan-100 to-indigo-100",
    previewType: "iframe",
    links: [{ label: "Live", href: "https://100daysofcuda.vercel.app/" }],
    tech: ["CUDA", "Learning Log", "Experiments"],
  },
  {
    name: "Card Pick",
    href: "https://card--pick.vercel.app/cards",
    description: "Card-based browsing experience for picking and exploring cards.",
    tag: "Product",
    accent: "from-emerald-200 via-lime-100 to-yellow-100",
    previewType: "iframe",
    links: [{ label: "Live", href: "https://card--pick.vercel.app/cards" }],
    tech: ["Cards", "Browse", "UI"],
  },
  {
    name: "Browser Haptics",
    href: "https://browser-haptics.pages.dev/",
    description: "Experiments with tactile feedback cues and micro-interactions in the browser.",
    tag: "Live",
    accent: "from-rose-200 via-orange-100 to-amber-100",
    previewType: "video",
    videoSrc: "/browser-haptics-preview.mp4",
    showPlayOverlay: false,
    links: [
      { label: "Live", href: "https://browser-haptics.pages.dev/" },
      { label: "Repo", href: "https://github.com/vidhanm/browser-haptics" },
    ],
    tech: ["Web APIs", "Haptics", "Interaction"],
  },
]

function getTagColor(tag: string): { bg: string; border: string } {
  const colors: Record<string, { bg: string; border: string }> = {
    Commercial: { bg: "bg-[#f27a1a]", border: "border-[#f27a1a]" },
    Video: { bg: "bg-[#ec1c5f]", border: "border-[#ec1c5f]" },
    Repo: { bg: "bg-[#2e88eb]", border: "border-[#2e88eb]" },
    Live: { bg: "bg-[#34b819]", border: "border-[#34b819]" },
    Learning: { bg: "bg-[#9d4edd]", border: "border-[#9d4edd]" },
    Technical: { bg: "bg-[#00bfff]", border: "border-[#00bfff]" },
    Product: { bg: "bg-[#ff006e]", border: "border-[#ff006e]" },
  }
  return colors[tag] || { bg: "bg-black", border: "border-black" }
}

function ProjectPreview({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const showPlayOverlay = project.previewType === "video" && project.showPlayOverlay !== false

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.muted = false
    video.loop = false
    void video.play()
    setIsPlaying(true)
  }

  const tagColors = getTagColor(project.tag)

  return (
    <article
      className={`flip-card-scene ${flipped ? "is-flipped" : ""}`}
      style={{ height: "360px" }}
    >
      <div className="flip-card-inner border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,0.2)] transition-shadow duration-200 hover:shadow-[12px_12px_0px_rgba(0,0,0,0.3)]">

        {/* ── FRONT FACE ── */}
        <div className="flip-card-front flex flex-col bg-white">

          {/* Header */}
          <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-tight text-black">{project.name}</p>
              {project.tag === "Repo" && (() => {
                const repo = project.links.find((l) => l.label.toLowerCase() === "repo")
                return repo ? (
                  <a href={repo.href} target="_blank" rel="noopener noreferrer" className="inline-flex">
                    <Github size={16} className="text-gray-700" />
                  </a>
                ) : (
                  <Github size={16} className="text-gray-700" />
                )
              })()}
            </div>
            <div className="flex items-center gap-2">
              {/* ⓘ info button */}
              <button
                type="button"
                onClick={() => setFlipped(true)}
                className="flip-info-btn"
                aria-label="Show project info"
                title="Show info"
              >
                i
              </button>
              <span
                className={`border-[2px] ${tagColors.border} ${tagColors.bg} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white`}
              >
                {project.tag}
              </span>
            </div>
          </div>

          {/* Preview — fills remaining height */}
          <div className="relative flex-1 overflow-hidden border-b-[3px] border-black bg-black">
            {project.previewType === "iframe" ? (
              <iframe
                src={project.href}
                title={project.name}
                className="absolute inset-0 h-full w-full border-0 bg-white"
                loading="lazy"
              />
            ) : project.previewType === "video" ? (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={project.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  controls={showPlayOverlay && isPlaying}
                />
                {showPlayOverlay && !isPlaying && (
                  <button
                    type="button"
                    onClick={handlePlay}
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-[3px] border-white bg-black text-white shadow-[4px_4px_0px_rgba(255,255,255,0.5)] transition-transform hover:scale-105"
                    aria-label={`Play ${project.name} video`}
                  >
                    <Play size={22} className="ml-0.5" />
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between bg-white p-6 text-black">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                  <span className="border-[2px] border-black bg-black px-3 py-1 text-white">Repo only</span>
                  <span className="border-[2px] border-black bg-black px-3 py-1 text-white">No live site</span>
                </div>
                <div className="border-[3px] border-black bg-white p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black">Project snapshot</p>
                  <h4 className="mt-2 text-2xl font-black tracking-tight text-black">{project.name}</h4>
                  <p className="mt-2 max-w-md text-sm leading-6 text-black">{project.description}</p>
                  <div className="mt-4 text-sm text-gray-600">{project.tech.slice(0, 3).join(" · ")}</div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ── BACK FACE ── */}
        <div className="flip-card-back flex flex-col bg-white">

          {/* Header — mirrors front, × closes */}
          <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-4 py-3">
            <p className="text-sm font-semibold tracking-tight text-black">{project.name}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="flip-info-btn active"
                aria-label="Close project info"
                title="Close"
              >
                ×
              </button>
              <span
                className={`border-[2px] ${tagColors.border} ${tagColors.bg} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white`}
              >
                {project.tag}
              </span>
            </div>
          </div>

          {/* Back content: description + tech + links */}
          <div className="flex flex-1 flex-col justify-between overflow-auto p-5">
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">About</p>
                <p className="text-[13px] leading-6 text-black">{project.description}</p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="border-[2px] border-black bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-black"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t-[2px] border-black pt-4">
              {project.links.map((link) => (
                <a
                  key={`back-${project.name}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border-[2px] border-black bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
                >
                  {link.label}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </article>
  )
}

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="pointer-events-none absolute inset-0"></div>

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="border-b-[4px] border-black bg-white px-6 py-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r-[4px] lg:px-10">
          <div className="flex h-full flex-col gap-8 pt-2">
            {/* Profile section */}
            <div className="flex flex-col items-start gap-4">

              {/* Tall rounded rectangle image */}
              <div className="relative w-full overflow-hidden rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,0.15)]" style={{ height: "400px" }}>
                <Image
                  src="/profile.jpg"
                  alt="Vidhan Mertiya"
                  fill
                  sizes="400px"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Name */}
              <h1 className="font-heading text-4xl font-black leading-[0.9] text-black sm:text-5xl">
                Vidhan
                <span className="block">Mertiya</span>
              </h1>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                <MapPin size={14} />
                India
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3 text-black">
                <a
                  href="https://github.com/vidhanm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-black bg-white transition-all hover:bg-black hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/vidhanmertiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-black bg-white transition-all hover:bg-black hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://x.com/vidhanmertiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-black bg-white transition-all hover:bg-black hover:text-white"
                  aria-label="X (Twitter)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="mailto:vidhanmertiya.vm@gmail.com"
                  className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-black bg-white transition-all hover:bg-black hover:text-white"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

        </aside>

        <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectPreview key={project.name} project={project} />
            ))}
          </div>

          <div className="mt-10 border-[3px] border-black bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black">Portfolio mix</p>
                <h4 className="mt-2 text-lg font-semibold text-black">Live apps, repos, and fresh experiments</h4>
              </div>
              <span className="border-[2px] border-black bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {projects.length} projects
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      {/* STICKY TOP NAVBAR (Pattern 1) */}
      <nav className="sticky top-0 z-40 bg-white border-b-[4px] border-black px-8 py-4 flex items-center justify-between gap-8">
        {/* Left: Avatar + Photo + Brand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative w-[50px] h-[50px] rounded-lg border-[2px] border-black overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
            <Image
              src="/profile.jpg"
              alt="Vidhan Mertiya"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="font-black text-sm leading-tight">
            Vidhan<br />Mertiya
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <div className="flex justify-center flex-1">
          <div className="flex border-[2px] border-black bg-white">
            <a href="/" className="px-4 py-2 border-r-[2px] border-black bg-white text-black text-xs font-semibold uppercase tracking-[0.05em] hover:bg-gray-100 transition-all">
              Projects
            </a>
            <a href="/blog" className="px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-[0.05em] hover:bg-gray-900 transition-all">
              Blog
            </a>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-2 flex-shrink-0">
          <a
            href="https://github.com/vidhanm"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border-[2px] border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/vidhanmertiya"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border-[2px] border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://x.com/vidhanmertiya"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border-[2px] border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
            aria-label="X"
          >
            <Twitter size={16} />
          </a>
          <a
            href="mailto:vidhanmertiya.vm@gmail.com"
            className="w-10 h-10 border-[2px] border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </nav>

      {/* BLOG CONTENT */}
      <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-4 tracking-tight">Blog</h1>
            <p className="text-lg text-gray-600">
              Thoughts on web development, design, and building in public.
            </p>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border-[3px] border-black bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transition-all hover:shadow-[12px_12px_0px_rgba(0,0,0,0.2)]"
              >
                <h2 className="text-xl font-bold text-black mb-2 hover:underline">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-[1px] border-gray-300 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta + Read More */}
                <div className="flex justify-between items-center border-t-[2px] border-gray-200 pt-4">
                  <div className="flex gap-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-xs font-semibold uppercase tracking-[0.1em] text-black border-b-2 border-black pb-0.5 hover:border-none">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

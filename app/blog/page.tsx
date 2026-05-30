"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="pointer-events-none absolute inset-0"></div>

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="border-b-[4px] border-black bg-white px-6 py-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r-[4px] lg:px-10">
          <div className="flex h-full flex-col gap-8 pt-2">
            {/* Back to home */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 border-[2px] border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white"
              >
                <ArrowLeft size={14} />
                Back
              </Link>

              {/* Title */}
              <h1 className="font-heading text-3xl font-black leading-[0.9] text-black sm:text-4xl">
                Blog
              </h1>

              <p className="text-sm text-gray-600">
                Thoughts on web development, design, and building in public.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 border-t-[3px] border-black pt-6">
              <a
                href="/"
                className="border-[2px] border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white"
              >
                Projects
              </a>
              <a
                href="/blog"
                className="border-[2px] border-black bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
              >
                Blog
              </a>
            </nav>
          </div>
        </aside>

        <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transition-all hover:shadow-[10px_10px_0px_rgba(0,0,0,0.15)]"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-black hover:underline">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border-[1px] border-gray-300 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-col items-start gap-1 sm:items-end sm:text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                      {post.date}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                      {post.readTime}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

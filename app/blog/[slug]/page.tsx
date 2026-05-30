"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getBlogPost, blogPosts } from "@/lib/blog-posts"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const formattedContent = post.content
    .split("\n")
    .map((line, i) => {
      // Headers
      if (line.startsWith("# ")) return <h1 key={i} className="mt-8 text-4xl font-black text-black mb-4">{line.slice(2)}</h1>
      if (line.startsWith("## ")) return <h2 key={i} className="mt-6 text-3xl font-bold text-black mb-3">{line.slice(3)}</h2>
      if (line.startsWith("### ")) return <h3 key={i} className="mt-5 text-2xl font-bold text-black mb-2">{line.slice(4)}</h3>
      if (line.startsWith("#### ")) return <h4 key={i} className="mt-4 text-xl font-bold text-black mb-2">{line.slice(5)}</h4>

      // Code blocks (simple handling)
      if (line.startsWith("```")) return null

      // Blockquotes
      if (line.startsWith("> ")) 
        return <blockquote key={i} className="mt-4 border-l-4 border-black pl-4 italic text-gray-700">{line.slice(2)}</blockquote>

      // Lists
      if (line.startsWith("- "))
        return <li key={i} className="ml-6 text-black">{line.slice(2)}</li>

      // Horizontal rule
      if (line === "---") return <hr key={i} className="my-6 border-t-[2px] border-black" />

      // Empty lines
      if (line.trim() === "") return <div key={i} className="h-3" />

      // Normal paragraphs
      if (line.trim()) {
        return (
          <p key={i} className="text-base leading-7 text-black mb-3">
            {line.replace(/`([^`]+)`/g, "<code className='bg-gray-100 px-2 py-1 rounded'>$1</code>")}
          </p>
        )
      }

      return null
    })
    .filter(Boolean)

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="pointer-events-none absolute inset-0"></div>

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="border-b-[4px] border-black bg-white px-6 py-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r-[4px] lg:px-10">
          <div className="flex h-full flex-col gap-8 pt-2">
            {/* Back to blog */}
            <div className="flex flex-col gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border-[2px] border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white w-fit"
              >
                <ArrowLeft size={14} />
                Back
              </Link>

              {/* Post meta */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500 mb-2">
                  {post.date} • {post.readTime}
                </p>
                <h1 className="font-heading text-2xl font-black leading-[1.1] text-black sm:text-3xl">
                  {post.title}
                </h1>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-[1px] border-black bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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

            {/* Related posts */}
            {blogPosts.length > 1 && (
              <div className="border-t-[3px] border-black pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-3">
                  More posts
                </p>
                <div className="flex flex-col gap-2">
                  {blogPosts
                    .filter((p) => p.slug !== post.slug)
                    .slice(0, 3)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="text-xs font-semibold text-black hover:underline"
                      >
                        {relatedPost.title}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        <article className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12 prose prose-invert max-w-none">
          <div className="max-w-2xl space-y-4">
            {formattedContent}
          </div>

          {/* Footer */}
          <div className="mt-12 border-t-[3px] border-black pt-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Share this post
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://vidhanmertiya.vercel.app/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[2px] border-black bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
                >
                  Twitter
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=https://vidhanmertiya.vercel.app/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[2px] border-black bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

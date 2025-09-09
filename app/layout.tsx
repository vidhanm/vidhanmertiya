import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vidhan Mertiya - Full-Stack Developer & Software Engineer",
  description:
    "Portfolio of Vidhan Mertiya - Full-Stack Developer specializing in modern web applications, Discord bots, and innovative software solutions.",
  generator: "v0.app",
  keywords: [
    "Vidhan Mertiya",
    "Full-Stack Developer",
    "Software Engineer",
    "Python",
    "JavaScript",
    "React",
    "Next.js",
    "Vue.js",
  ],
  authors: [{ name: "Vidhan Mertiya" }],
  openGraph: {
    title: "Vidhan Mertiya - Full-Stack Developer",
    description: "Portfolio showcasing projects in web development, Discord bots, and software engineering.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${manrope.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

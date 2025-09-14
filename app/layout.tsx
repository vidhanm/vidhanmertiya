import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vidhan Mertiya - Data Science Student & Full-Stack Developer",
  description:
    "Portfolio of Vidhan Mertiya - Data Science Student at IIT Madras and Full-Stack Developer specializing in web applications, data analysis, and AI-powered solutions.",
  generator: "v0.app",
  keywords: [
    "Vidhan Mertiya",
    "Data Science",
    "Full-Stack Developer",
    "IIT Madras",
    "Python",
    "JavaScript",
    "React",
    "Next.js",
    "Vue.js",
    "Machine Learning",
    "Data Analysis",
  ],
  authors: [{ name: "Vidhan Mertiya" }],
  openGraph: {
    title: "Vidhan Mertiya - Data Science Student & Full-Stack Developer",
    description: "Portfolio showcasing projects in web development, data science, and AI-powered applications.",
    type: "website",
    url: "https://vidhanmertiya.vercel.app",
    siteName: "Vidhan Mertiya Portfolio",
  },
  metadataBase: new URL("https://vidhanmertiya.vercel.app"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${manrope.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

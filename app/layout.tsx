import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Fraunces, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vidhan Mertiya - Portfolio",
  description:
    "A portfolio inspired by the Marc Lou style, featuring a fixed profile rail and live website previews for selected projects.",
  generator: "v0.app",
  keywords: [
    "Vidhan Mertiya",
    "Portfolio",
    "Website previews",
    "Next.js",
    "Product design",
  ],
  authors: [{ name: "Vidhan Mertiya" }],
  openGraph: {
    title: "Vidhan Mertiya - Portfolio",
    description: "A portfolio with a Marc Lou inspired layout and live previews of selected projects.",
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
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} ${spaceGrotesk.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RootLayoutClient } from "@/components/root-layout-client"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Brett White",
  description: "Portfolio of Brett White - Software Engineer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootLayoutClient className={`${inter.variable} antialiased font-normal`}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}
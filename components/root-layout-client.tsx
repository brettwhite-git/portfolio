"use client"

import { useNavigationScroll } from "@/hooks/use-navigation-scroll"
import { ThemeProvider } from "@/components/theme-provider"

export function RootLayoutClient({
  children,
  inter,
}: {
  children: React.ReactNode
  inter: string
}) {
  useNavigationScroll()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter} antialiased font-normal`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

"use client"

import { useNavigationScroll } from "@/hooks/use-navigation-scroll"
import { ThemeProvider } from "@/components/theme-provider"

export function RootLayoutClient({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  useNavigationScroll()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={className}>
        {children}
      </div>
    </ThemeProvider>
  )
}
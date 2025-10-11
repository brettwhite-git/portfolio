"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useNavigationScroll() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only scroll to top on forward navigation
    if (window.history.state?.forward) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, searchParams]) // Re-run when route changes

  return null
}

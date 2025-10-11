"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useNavigationScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route changes (forward navigation)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname]) // Re-run when pathname changes

  return null
}
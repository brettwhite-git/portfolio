"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconArrowRight } from "@tabler/icons-react"

interface HomeSectionProps {
  onNavigate?: (section: "contact") => void
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const heroRef = useRef(null)
  const profileRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const isProfileInView = useInView(profileRef, { once: true, margin: "-100px" })

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Hero Content */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-center space-y-6 bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow p-16 h-full"
      >
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Building solutions that{" "}
            <span className="text-primary">scale.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Great technology isn't about complexity — it's about clarity. I transform
            business challenges into elegant solutions that people actually want to use.
            From architecting cloud infrastructure to orchestrating AI workflows, I bridge
            the gap between what's possible and what's practical. The best solutions don't
            just solve today's problems — they unlock tomorrow's opportunities.
          </p>
        </div>
        <div>
          <Button
            size="lg"
            className="rounded-full px-8 gap-2"
            onClick={() => onNavigate?.("contact")}
          >
            Let's not just talk, lets build
            <IconArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        ref={profileRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isProfileInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex-none w-full lg:w-[280px]"
      >
        <div className="bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
          {/* Profile Image */}
          <div className="relative w-full aspect-square p-4 pb-0">
            <Image
              src="/profile.jpg"
              alt="Brett White"
              fill
              className="object-cover rounded-[20px]"
              priority
            />
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Brett White</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Solutions Architect who focuses on creating exceptional digital experiences.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

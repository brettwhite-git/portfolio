"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
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
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Hero Content */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-center space-y-6 bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow p-8 md:p-10 lg:p-16 h-full"
      >
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Building solutions that{" "}
            <span className="text-primary">scale.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Great technology isn&apos;t about complexity but clarity. I transform
            business challenges into elegant solutions that people actually want to use.
            From architecting cloud infrastructure to orchestrating AI workflows, I bridge
            the gap between what&apos;s possible and what&apos;s practical. The best solutions not only
            solve today&apos;s problems but also unlock tomorrow&apos;s opportunities.
          </p>
        </div>
        <div>
          <Button
            size="lg"
            className="rounded-full px-8 gap-2"
            onClick={() => onNavigate?.("contact")}
          >
            Let&apos;s not just talk, let&apos;s build
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
        className="flex-none w-full sm:w-[320px] md:w-[280px] lg:w-[320px] mx-auto md:mx-0 flex items-stretch"
      >
        <div className="bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col w-full">
          {/* Profile Image */}
          <div className="relative w-full aspect-square p-4 pb-0">
            <Image
              src="/profile.webp"
              alt="Brett White"
              fill
              className="object-cover rounded-[20px]"
              priority
            />
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-2 flex-grow flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Brett White</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Solutions Architect who focuses on creating exceptional digital experiences.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

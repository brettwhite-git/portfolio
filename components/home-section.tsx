"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconArrowRight } from "@tabler/icons-react"

interface HomeSectionProps {
  onNavigate?: (section: "contact") => void
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center space-y-6 bg-secondary/60 backdrop-blur-sm border border-border/10 rounded-[24px] p-16 h-full shadow-lg">
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
      </div>
      
      {/* Profile Card */}
      <div className="flex-none w-full lg:w-[280px]">
        <div className="bg-card/80 backdrop-blur-sm border bg-secondary/60 border-border/10 rounded-[24px] shadow-lg overflow-hidden">
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
      </div>
    </div>
  )
}

"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HomeSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
      {/* Hero Content */}
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Design that drives{" "}
            <span className="text-primary">impact.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Design should be more than decoration — it should be a catalyst for growth. 
            I combine strategy, storytelling, and visual clarity to craft brand experiences 
            that spark emotion, drive engagement, and generate lasting impact. From 
            brand identity to product interfaces, I help businesses transform ideas into 
            results and customers into advocates.
          </p>
        </div>
        <div>
          <Button size="lg" className="rounded-full px-8">
            Book a call with me
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-[280px]">
          <div className="bg-card/80 backdrop-blur-sm border border-border/10 rounded-[24px] p-0 shadow-lg overflow-hidden">
            {/* Profile Image */}
            <div className="relative w-full aspect-square mb-4">
              <Image
                src="/profile.jpg"
                alt="Brett White"
                fill
                className="rounded-t-[24px] object-cover"
                priority
              />
            </div>
            
            {/* Content */}
            <div className="px-6 pb-6 space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Brett White</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-Stack Developer who focuses on creating exceptional digital experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

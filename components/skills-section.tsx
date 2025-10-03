"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import {
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandReact,
  IconSql,
  IconBrandPython,
  IconBrandTypescript,
  IconCode,
} from "@tabler/icons-react"

interface Skill {
  id: number
  name: string
  icon: React.ComponentType<{ className?: string }>
}

const skills: Skill[] = [
  {
    id: 1,
    name: "HTML",
    icon: IconBrandHtml5,
  },
  {
    id: 2,
    name: "JavaScript",
    icon: IconBrandJavascript,
  },
  {
    id: 3,
    name: "TypeScript",
    icon: IconBrandTypescript,
  },
  {
    id: 4,
    name: "Tailwind",
    icon: IconBrandTailwind,
  },
  {
    id: 5,
    name: "React",
    icon: IconBrandReact,
  },
  {
    id: 6,
    name: "SQL",
    icon: IconSql,
  },
  {
    id: 7,
    name: "Python",
    icon: IconBrandPython,
  },
  {
    id: 8,
    name: "SuiteScript",
    icon: IconCode,
  },
]

export function SkillsSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
        <p className="text-muted-foreground">
          Programming languages and technologies
        </p>
      </motion.div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
            >
              <Card className="flex flex-col p-4 bg-card/50 backdrop-blur-sm bg-secondary/60 shadow-lg border-border/50 hover:bg-card/80 transition-colors">
              <div className="flex flex-col flex-1 bg-secondary rounded-xl p-6 mb-4">
                <div className="flex items-center justify-center aspect-square">
                  <Icon className="w-full h-full text-primary" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 px-2">
                <span className="font-semibold text-base">{skill.name}</span>
              </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

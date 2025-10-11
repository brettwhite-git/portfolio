"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import {
  IconBrandHtml5,
  IconBrandTailwind,
  IconBrandReact,
  IconSql,
  IconBrandPython,
  IconBrandTypescript,
  IconBrandDocker,
} from "@tabler/icons-react"
import { BiLogoPostgresql } from "react-icons/bi"
import { SiOracle } from "react-icons/si"

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
    name: "TypeScript",
    icon: IconBrandTypescript,
  },
  {
    id: 3,
    name: "React",
    icon: IconBrandReact,
  },
  {
    id: 4,
    name: "Tailwind",
    icon: IconBrandTailwind,
  },
  {
    id: 5,
    name: "SQL",
    icon: IconSql,
  },
  {
    id: 6,
    name: "PostgreSQL",
    icon: BiLogoPostgresql,
  },
  {
    id: 7,
    name: "Docker",
    icon: IconBrandDocker,
  },
  {
    id: 8,
    name: "Python",
    icon: IconBrandPython,
  },
  {
    id: 9,
    name: "SuiteScript",
    icon: SiOracle,
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
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Skills</h2>
        <p className="text-muted-foreground">
          Programming languages and technologies
        </p>
      </motion.div>

      <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9">
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
            >
              <Card className="flex flex-col p-3 sm:p-4 bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col flex-1 bg-primary/5 rounded-xl p-4 sm:p-6 mb-3 sm:mb-4">
                <div className="flex items-center justify-center aspect-square">
                  <Icon className="w-full h-full text-primary" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 px-1 sm:px-2">
                <span className="font-semibold text-sm sm:text-base text-center">{skill.name}</span>
              </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

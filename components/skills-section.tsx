"use client"

import { Card } from "@/components/ui/card"
import {
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandReact,
  IconSql,
  IconBrandPython,
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
    name: "Tailwind",
    icon: IconBrandTailwind,
  },
  {
    id: 4,
    name: "React",
    icon: IconBrandReact,
  },
  {
    id: 5,
    name: "SQL",
    icon: IconSql,
  },
  {
    id: 6,
    name: "Python",
    icon: IconBrandPython,
  },
]

export function SkillsSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
        <p className="text-muted-foreground">
          Programming languages and technologies
        </p>
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <Card
              key={skill.id}
              className="flex flex-col items-center justify-center p-6 bg-secondary/50 hover:bg-secondary transition-colors aspect-square"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 flex items-center justify-center">
                  <Icon className="w-full h-full text-primary" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-semibold text-sm">{skill.name}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

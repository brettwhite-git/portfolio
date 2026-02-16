"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconBrandGithub } from "@tabler/icons-react"

const projects = [
  {
    id: 1,
    title: "BitBasis",
    description: "A Bitcoin cost basis tracker that enables users to upload CSVs, record transactions, calculate cost basis, track fees, and visualize investment performance with KPIs and charts.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/brettwhite-git/bitbasis-public",
    demo: "#",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Portfolio",
    description: "A personal website to showcase solution consultant sales experience. Features a career impact section, work history, certifications, projects, and an analytics dashboard.",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/brettwhite-git/portfolio",
    demo: "#",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "NSAW Schema Explorer",
    description: "Built an interactive data visualization tool for Oracle NetSuite Analytics Warehouse that maps schema relationships using D3 force-directed graphs and ReactFlow.",
    tags: ["React", "Vite", "ReactFlow", "D3", "Gemini API"],
    github: "https://github.com/brettwhite-git/nsaw-schema-explorer",
    demo: "#",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "SuitePrompt",
    description: "Developed a full-stack marketplace and learning platform for NetSuite AI prompts and SuiteCloud development skills. Features interactive coding courses with an embedded Monaco editor, MDX-powered content authoring, and a curated prompt/template library.",
    tags: ["Next.js", "MDX", "Monaco Editor", "Tailwind CSS"],
    github: "https://github.com/brettwhite-git/suiteprompt",
    demo: "#",
    image: "/placeholder.svg"
  },
]

export function ProjectsSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          A showcase of my recent work and side projects
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
            className="h-full"
          >
            <Card className="flex flex-col h-full bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-foreground/5"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <IconBrandGithub className="h-4 w-4" />
              </a>
            </Button>
            <CardHeader className="pr-14">
              <CardTitle className="text-lg md:text-xl">{project.title}</CardTitle>
              <CardDescription className="text-sm md:text-base">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-end">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-foreground/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

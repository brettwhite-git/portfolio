"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react"

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A comprehensive full-stack application built with modern technologies and best practices.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    github: "#",
    demo: "#",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Project Beta",
    description: "An innovative solution for streamlining workflow automation and data processing.",
    tags: ["Next.js", "Tailwind CSS", "Prisma"],
    github: "#",
    demo: "#",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Mobile-first responsive web application with real-time features.",
    tags: ["React Native", "Firebase", "Redux"],
    github: "#",
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
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
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
          >
            <Card className="flex flex-col bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-foreground/10">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <IconBrandGithub className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

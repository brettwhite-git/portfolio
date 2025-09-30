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
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          A showcase of my recent work and side projects
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
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
              <Button size="sm" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <IconExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

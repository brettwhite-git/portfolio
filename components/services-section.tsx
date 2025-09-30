"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  IconUsers,
  IconCloud,
  IconCode,
  IconBrain,
  IconDatabase,
  IconShieldCheck
} from "@tabler/icons-react"

const services = [
  {
    icon: IconUsers,
    title: "Sales Enablement",
    color: "bg-primary",
    tags: ["Solution Design", "Discovery", "POC", "Value Engineering"]
  },
  {
    icon: IconCloud,
    title: "Cloud Architecture",
    color: "bg-primary",
    tags: ["Oracle Cloud", "SuiteCloud", "Networking", "Infrastructure"]
  },
  {
    icon: IconCode,
    title: "Development",
    color: "bg-primary",
    tags: ["SuiteScript", "JavaScript", "Web Services", "Workflows"]
  },
  {
    icon: IconBrain,
    title: "AI & Analytics",
    color: "bg-primary",
    tags: ["Generative AI", "Data", "Analytics", "Business Intelligence"]
  },
  {
    icon: IconDatabase,
    title: "Data Management",
    color: "bg-primary",
    tags: ["SQL", "Data Hygiene", "Database", "Integration"]
  },
  {
    icon: IconShieldCheck,
    title: "Security & Compliance",
    color: "bg-primary",
    tags: ["Access Control", "Disaster Recovery", "Compliance", "Risk Management"]
  }
]

export function ServicesSection() {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold">My services</h2>
        <p className="text-muted-foreground">Here's kind of my service will provide you:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-secondary/50 text-secondary-foreground text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

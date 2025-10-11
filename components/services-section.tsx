"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
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
    title: "Sales Engineering",
    color: "bg-primary",
    tags: ["Solution Design", "Discovery", "POC", "Value Engineering"]
  },
  {
    icon: IconBrain,
    title: "AI & Analytics",
    color: "bg-primary",
    tags: ["Generative AI", "Agents", "Orchestration", "Analytics"]
  },
  {
    icon: IconCloud,
    title: "Cloud Architecture",
    color: "bg-primary",
    tags: ["Oracle Cloud", "Serverless", "Networking", "Terraform"]
  },
  {
    icon: IconCode,
    title: "Development",
    color: "bg-primary",
    tags: ["Application Development", "DevOps", "APIs", "Authentication"]
  },
  {
    icon: IconDatabase,
    title: "Data Engineering",
    color: "bg-primary",
    tags: ["PostgreSQL", "Data Warehousing", "Data Modeling", "Data Pipelines"]
  },
  {
    icon: IconShieldCheck,
    title: "Security & Compliance",
    color: "bg-primary",
    tags: ["IAM", "Disaster Recovery", "Redundancy", "Risk Management"]
  }
]

export function ServicesSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <div ref={containerRef} className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4"
      >
        <h2 className="text-3xl lg:text-4xl font-bold">My stack</h2>
        <p className="text-muted-foreground">Here&apos;s a snapshot of my expertise:</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
              className="h-full"
            >
              <Card className="bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="space-y-3 mt-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <div className="flex flex-wrap gap-2 content-start">
                    {service.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="bg-foreground/10 text-xs md:text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

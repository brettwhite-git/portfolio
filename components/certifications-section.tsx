"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconArrowRight } from "@tabler/icons-react"

interface Certification {
  id: number
  title: string
  subtitle: string
  skills: string[]
  description: string
}

const certifications: Certification[] = [
  {
    id: 1,
    title: "Oracle Autonomous Database Professional",
    subtitle: "Advanced Database Management",
    skills: ["Provisioning", "Monitoring", "Migration", "Exadata"],
    description: "Skills in provisioning, managing, monitoring, and migrating workloads to Autonomous Database on shared and dedicated Exadata infrastructure. Certified professionals demonstrate proficiency with Autonomous Database features, workflows, architecture, and development tools.",
  },
  {
    id: 2,
    title: "Oracle Analytics Cloud Professional",
    subtitle: "Data Analytics & Visualization",
    skills: ["Data Modeling", "Visualizations", "Machine Learning", "Advanced Analytics"],
    description: "Perform provisioning, build dimensional models, and create data visualizations. Use Advanced Analytics capabilities and create a machine learning models. Understand and use the various augmented capabilities available with Oracle Analytics Cloud.",
  },
  {
    id: 3,
    title: "Oracle Cloud Architect Associate",
    subtitle: "Cloud Solution Design",
    skills: ["Architecture", "Security", "High Availability", "Disaster Recovery"],
    description: "Design and implement comprehensive cloud solutions on Oracle Cloud Infrastructure, focusing on scalable architectures, security frameworks, and cost-effective deployment strategies while ensuring high availability and disaster recovery capabilities.",
  },
  {
    id: 4,
    title: "Oracle Cloud Gen AI Professional",
    subtitle: "Generative AI Solutions",
    skills: ["Gen AI", "Language Models", "AI Integration", "Enterprise AI"],
    description: "Deep dive into enterprise-scale AI solutions utilizing Oracle's Gen AI platform, including the development and deployment of custom language models, automated learning systems, and integration of AI services within existing business infrastructures to drive innovation and efficiency.",
  },
  {
    id: 5,
    title: "Oracle Cloud AI Foundations Associate",
    subtitle: "AI & Machine Learning",
    skills: ["Machine Learning", "AI Services", "Model Deployment", "AI Workloads"],
    description: "AI fundamentals, demonstrating proficiency in how to implement machine learning solutions, working with AI services, and understanding core AI/ML concepts within the OCI ecosystem. Includes deploying AI models, managing AI workloads, and utilizing OCI's AI services for business applications.",
  },
  {
    id: 6,
    title: "Oracle Cloud Foundations Associate",
    subtitle: "Cloud Infrastructure Fundamentals",
    skills: ["OCI Architecture", "Networking", "Security", "Cloud Computing"],
    description: "Validated core foundations in Oracle Cloud Infrastructure concepts, including cloud computing fundamentals, OCI architecture, security principles, networking, storage, and compute services. Demonstrates understanding of OCI best practices for building and managing cloud solutions while ensuring optimal performance and cost efficiency.",
  },
  {
    id: 7,
    title: "NetSuite SuiteCloud Developer",
    subtitle: "Custom Development",
    skills: ["SuiteScript 2.0/2.1", "Workflows", "Custom Modules", "Integration"],
    description: "Expertise in developing sophisticated SuiteCloud solutions, including custom modules, workflows, and integrations using SuiteScript 2.0/2.1, demonstrating knowledge in creating scalable and efficient business process automations.",
  },
  {
    id: 8,
    title: "NetSuite Application Developer",
    subtitle: "Custom Applications",
    skills: ["SuiteBuilder", "SuiteScript", "Custom Solutions", "UI Development"],
    description: "Proficient in creating complex custom applications within the NetSuite environment, leveraging SuiteBuilder and SuiteScript to develop tailored solutions that enhance business operations and user experience through sophisticated interfaces and automated workflows.",
  },
  {
    id: 9,
    title: "NetSuite Web Services Developer",
    subtitle: "API & Integration",
    skills: ["SuiteTalk", "APIs", "Web Services", "Data Synchronization"],
    description: "Specialized in developing robust web services integrations using SuiteTalk, implementing secure API endpoints and real-time data synchronization solutions that seamlessly connect NetSuite with external systems and third-party applications.",
  },
  {
    id: 10,
    title: "NetSuite ERP Consultant",
    subtitle: "ERP Implementation",
    skills: ["Financial Management", "Inventory", "Supply Chain", "Implementation"],
    description: "Demonstrated knowledge in NetSuite ERP implementation and optimization, with comprehensive knowledge of financial, inventory, and supply chain management processes, specializing in tailoring solutions to meet complex business requirements.",
  },
  {
    id: 11,
    title: "NetSuite Administrator",
    subtitle: "System Administration",
    skills: ["System Config", "User Management", "Security", "Performance"],
    description: "Certified administrator with expertise in managing NetSuite environments, implementing best practices for system configuration, user management, and security protocols while optimizing system performance and maintaining organizational compliance standards.",
  },
  {
    id: 12,
    title: "NetSuite SuiteAnalytics",
    subtitle: "Business Intelligence",
    skills: ["Reports", "Dashboards", "Analytics", "Business Intelligence"],
    description: "Advanced practitioner in SuiteAnalytics, specializing in creating sophisticated reports, dashboards, and analytical tools that transform raw data into actionable business intelligence, enabling data-driven decision making.",
  },
  {
    id: 13,
    title: "NetSuite Financial User",
    subtitle: "Financial Management",
    skills: ["Accounting", "Financial Reporting", "Compliance", "Workflows"],
    description: "Certified in NetSuite's comprehensive financial management capabilities, with deep understanding of accounting processes, reporting requirements, and implementation of sophisticated financial workflows.",
  },
  {
    id: 14,
    title: "NetSuite SuiteFoundations",
    subtitle: "Platform Fundamentals",
    skills: ["Core Functionality", "Customization", "Reporting", "Business Processes"],
    description: "Certified in NetSuite's core functionality and architecture, demonstrating comprehensive understanding of the platform's fundamental capabilities, including basic customization, reporting features, and standard business process implementations.",
  }
]

export function CertificationsSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  return (
    <>
      <div ref={containerRef} className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground">
            Professional certifications and technical expertise
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
            >
              <Card className="flex flex-col p-4 bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col flex-1 bg-primary/5 rounded-xl p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {cert.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-foreground/10">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
              <CardFooter className="flex items-center justify-between px-2 pt-4 pb-0">
                <span className="text-sm font-medium">Explore</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors group"
                  onClick={() => setSelectedCert(cert)}
                >
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-3xl w-[95vw] sm:w-full sm:min-w-[500px] md:min-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">{selectedCert?.title}</DialogTitle>
            <DialogDescription className="text-sm sm:text-base font-medium pt-1">
              {selectedCert?.subtitle}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-wrap gap-2">
              {selectedCert?.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs sm:text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selectedCert?.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

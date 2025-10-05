"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { HomeSection } from "@/components/home-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { AnalyticsSection } from "@/components/analytics-section"
import { SkillsSection } from "@/components/skills-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

type Section = "home" | "about" | "experience" | "projects" | "analytics" | "skills" | "contact"

export default function Page() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [sidebarDefaultOpen, setSidebarDefaultOpen] = useState(true)

  useEffect(() => {
    // Check if window width is desktop (lg breakpoint is 1024px)
    const isDesktop = window.innerWidth >= 1024
    setSidebarDefaultOpen(isDesktop)
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <HomeSection onNavigate={setActiveSection} />
            <ServicesSection />
          </>
        )
      case "projects":
        return <ProjectsSection />
      case "about":
        return <AboutSection />
      case "experience":
        return <ExperienceSection />
      case "analytics":
        return <AnalyticsSection />
      case "skills":
        return (
          <>
            <SkillsSection />
            <CertificationsSection />
          </>
        )
      case "contact":
        return <ContactSection />
      default:
        return (
          <>
            <HomeSection onNavigate={setActiveSection} />
            <ServicesSection />
          </>
        )
    }
  }

  return (
    <SidebarProvider
      defaultOpen={sidebarDefaultOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" onNavigate={setActiveSection} />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-12 py-8 px-6 max-w-[1440px] mx-auto w-full">
            {renderSection()}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

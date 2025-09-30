"use client"

import * as React from "react"
import {
  IconChartBar,
  IconFileDescription,
  IconFolder,
  IconHome,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

type Section = "home" | "about" | "experience" | "projects" | "analytics" | "skills" | "contact"

const data = {
  navMain: [
    {
      title: "Home",
      section: "home" as Section,
      icon: IconHome,
    },
    {
      title: "About",
      section: "about" as Section,
      icon: IconUsers,
    },
    {
      title: "Experience",
      section: "experience" as Section,
      icon: IconListDetails,
    },
    {
      title: "Projects",
      section: "projects" as Section,
      icon: IconFolder,
    },
    {
      title: "Analytics",
      section: "analytics" as Section,
      icon: IconChartBar,
    },
    {
      title: "Skills",
      section: "skills" as Section,
      icon: IconChartBar,
    },
    {
      title: "Contact",
      section: "contact" as Section,
      icon: IconFileDescription,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (section: Section) => void
}

export function AppSidebar({ onNavigate, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-0 gap-0 h-(--header-height) shrink-0" />
      <SidebarContent className="px-2">
        <NavMain items={data.navMain} onNavigate={onNavigate} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}

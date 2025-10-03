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
import { Glasses } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { Section } from "@/lib/types"

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
      icon: Glasses,
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
      <SidebarHeader className="p-0 gap-0 h-(--header-height) shrink-0 md:h-(--header-height) h-16" />
      <SidebarContent className="px-2">
        <NavMain items={data.navMain} onNavigate={onNavigate} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}

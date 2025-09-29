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

const data = {
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: IconHome,
    },
    {
      title: "About",
      url: "#",
      icon: IconUsers,
    },
    {
      title: "Experience",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Skills",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Contact",
      url: "#",
      icon: IconFileDescription,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-0 gap-0 h-(--header-height) shrink-0" />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}

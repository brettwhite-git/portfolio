"use client"

import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type Section = "home" | "about" | "experience" | "projects" | "skills" | "contact"

export function NavMain({
  items,
  onNavigate,
}: {
  items: {
    title: string
    section: Section
    icon?: Icon
  }[]
  onNavigate?: (section: Section) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 px-2">
        <SidebarMenu className="px-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => onNavigate?.(item.section)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

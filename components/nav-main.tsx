"use client"

import { type Icon as TablerIcon } from "@tabler/icons-react"
import { type LucideIcon } from "lucide-react"

type IconComponent = TablerIcon | LucideIcon
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { Section } from "@/lib/types"

export function NavMain({
  items,
  onNavigate,
}: {
  items: {
    title: string
    section: Section
    icon?: IconComponent
  }[]
  onNavigate?: (section: Section) => void
}) {
  const { isMobile, setOpenMobile, setOpen } = useSidebar()

  const handleNavigate = (section: Section) => {
    onNavigate?.(section)
    // Close mobile sidebar after navigation
    if (isMobile) {
      setOpenMobile(false)
    } else if (window.innerWidth <= 1366) {
      // Close desktop sidebar on tablet/iPad Pro sizes
      setOpen(false)
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 px-2">
        <SidebarMenu className="px-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => handleNavigate(item.section)}
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

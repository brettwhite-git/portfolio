import { AppSidebar } from "@/components/app-sidebar"
import { HomeSection } from "@/components/home-section"
import { ServicesSection } from "@/components/services-section"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-12 py-8">
              <HomeSection />
              <ServicesSection />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  IconCode, 
  IconDeviceMobile, 
  IconPalette, 
  IconBrandFramer,
  IconTestPipe,
  IconTools
} from "@tabler/icons-react"

const services = [
  {
    icon: IconPalette,
    title: "Web Design",
    description: "Crafting visually appealing, responsive, user-friendly designs that reflect your brand. From wireframes to final prototypes, every detail is considered."
  },
  {
    icon: IconDeviceMobile,
    title: "Mobile Design", 
    description: "Create user-friendly interfaces for iOS and Android apps, focusing on performance and simplicity."
  },
  {
    icon: IconCode,
    title: "Design System",
    description: "Build reusable components, styles, and guidelines for consistency and faster scaling."
  },
  {
    icon: IconBrandFramer,
    title: "Framer Development",
    description: "Responsive, on-brand websites built in Framer—from wireframes to polished, user-friendly designs."
  },
  {
    icon: IconTestPipe,
    title: "Usability Testing",
    description: "Test designs to get a better experience for real users to find issues early and improve product usability."
  },
  {
    icon: IconTools,
    title: "Developer Handoff",
    description: "Provide ready-to-build assets, specs, and support for smooth implementation."
  }
]

export function ServicesSection() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
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
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

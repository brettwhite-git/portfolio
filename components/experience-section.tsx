import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    title: "Principal Solution Consultant",
    company: "Oracle NetSuite",
    period: "June 2025 - Present",
    description: "Oracle NetSuite is a leading cloud-based Enterprise Resource Planning (ERP) platform that offers a comprehensive suite of applications to manage business operations. It integrates various functions such as financials, CRM, e-commerce, and inventory, providing real-time visibility into financial data.",
    responsibilities: [
      "Drive product growth strategy across retail, hospitality, commerce, and apparel verticals while continuing to drive ARR through direct sales, creating standardized approaches the entire pre-sales team uses for vertical deals.",
      "Run two subject matter expert groups that create customer-facing assets and demo materials, cutting prep time by 40% across all consultants while maintaining top individual performance.",
      "Own the technical sales process for NetSuite Analytics Warehouse, building demonstration methods and training materials for consultants organization-wide use for complex data warehouse deals - achieved highest NSAW sales on the team while scaling methodology.",
      "Integrate generative AI tools into pre-sales workflows, creating automated dataset generation that lets consultants create advanced demo scenarios 60% faster than doing it manually.",
      "Support onboarding program for new consultants while serving in product advisory capacity, building structured training that covers business fundamentals and internal checkpoints."
    ],
    current: true
  },
  {
    id: 2,
    title: "Senior Solution Consultant",
    company: "Oracle NetSuite",
    period: "Dec 2021 - June 2025",
    description: "",
    responsibilities: [
      "Generated over $10.6M in Annual Recurring Revenue as a top-requested consultant on a team of 20.",
      "Achieved SC of the Year in an organization of 175 SCs, exceeding 250% attainment with an average 41% conversion rate.",
      "Built technical solutions that reduced customer system bottlenecks by up to 50% through architecture optimization and resource scaling recommendations.",
      "Mastered 22+ add-on applications including NetSuite Analytics Warehouse, Planning & Budgeting, and e-commerce solutions, driving higher upsell rates and customer retention through expanded product demonstrations.",
      "Delivered sales methodology workshops to Account Management teams, training on value selling techniques and product positioning strategies."
    ],
    current: false
  },
  {
    id: 3,
    title: "Staff Solution Consultant",
    company: "Oracle NetSuite",
    period: "Nov 2019 - Dec 2021",
    description: "",
    responsibilities: [
      "Drove NetSuite adoption and strategic customer engagement, generating over $3.5M in Annual Recurring Revenue (ARR) by upselling modular solutions, net new ERP instances, and managed services.",
      "Consistently achieved MVP of the Quarter awards by exceeding sales benchmarks and maintaining a 36% conversion rate.",
      "Proactively offered consultancy in NetSuite's non-profit segment, Suite Pro Bono, effectively scoping and deploying 10 to 15 hours worth of work that met specific operational needs.",
      "Built and maintained strong sales pipelines in collaboration with account managers, enhancing pipeline accuracy and strengthening relationships and overall strategy with existing clients."
    ],
    current: false
  },
  {
    id: 4,
    title: "Sourcing & Procurement Manager",
    company: "Screen Innovations",
    period: "Aug 2016 - Jan 2019",
    description: "Screen Innovations is known for its advanced manufacturing of projector screens that enhance the visual experience for residential and commercial spaces. They specialize in ambient light-rejecting technology for motorized and fixed-frame screens, offering various products that deliver superior image quality and performance.",
    responsibilities: [
      "Spearheaded cost reduction initiatives as the principal buyer and sourcing strategist for engineered materials, securing over $2M in savings through strategic negotiations and process optimization.",
      "Transformed purchasing strategies by establishing strong global supplier partnerships, reducing material costs by 20% while maintaining high-quality standards.",
      "Bridged go-to-market, engineering, and operations teams, ensuring product bills of materials (BOMs) were synchronized with product launch timelines, enhancing launch efficiency.",
      "Managed inventory and fulfillment operations with a dedicated 5-person team, implementing lean inventory strategies that improved replenishment and fulfillment metrics by an estimated 30%."
    ],
    current: false
  },
  {
    id: 5,
    title: "Supply Chain Manager",
    company: "Benedettini Cabinetry",
    period: "Feb 2013 - Jul 2016",
    description: "Benedettini Cabinetry is a distinguished provider of custom cabinetry, known for their craftsmanship and dedication to quality. Specializing in unique designs tailored to individual specifications, they blend traditional woodworking techniques with modern aesthetics to create functional and stylish cabinetry for residential spaces.",
    responsibilities: [
      "Cultivated robust supplier partnerships, guaranteeing consistent material supply and effectively navigating lumbar market changes to maintain supply chain integrity.",
      "Pioneered the creation of a mobile inventory scanning app, cutting error rates and delivery discrepancy-related back-charges by 80%, enhancing operational accuracy.",
      "Directed a 20-member inventory and logistics team in efficiently servicing and distributing hundreds of cabinets daily to top-tier home builders like Toll Brothers, Perry Homes, and Highland Homes, ensuring premium service.",
      "Engineered and implemented delivery route optimization and capacity planning strategies, achieving substantial reductions in mileage and the number of delivery trips, thereby improving logistical efficiency and reducing costs."
    ],
    current: false
  }
]

export function ExperienceSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Work Experience</h1>
        <p className="text-muted-foreground">
          My professional journey and key accomplishments
        </p>
      </div>

      <div className="flex flex-col gap-6 px-10 py-6">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl">{experience.title}</CardTitle>
                  <CardDescription className="text-base font-medium mt-1">
                    {experience.company}
                  </CardDescription>
                </div>
                <Badge variant="default" className="shrink-0 px-4 py-2">
                  {experience.period}
                </Badge>
              </div>
              {experience.description && (
                <p className="text-md text-muted-foreground mt-3 leading-relaxed">
                  {experience.description}
                </p>
              )}
            </CardHeader>
            <CardContent className="px-12 py-2">
              <ul className="space-y-2">
                {experience.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-md leading-relaxed flex gap-2">
                    <span className="text-muted-foreground shrink-0">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

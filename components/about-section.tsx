"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    text: "I wanted to take a moment to personally recognize the outstanding support Brett White provided on the recent engagement with my customer. During a critical customer decision point around NetSuite Analytics Warehouse, Brett was simply exceptional. Despite the customer not bringing in the key data users to prior demos he remained cool, calm, and collected—continually redirecting the conversation to the strengths of the platform, especially around historical data utilization. Importantly, he struck the perfect balance between highlighting value and not overpromising—something that really builds long-term trust with customers. It was impressive to witness how well Brett navigated the call and reinforced the value of our solution in a clear and honest way. Collaborating with people like Brett is one of the reasons I stay at NetSuite.",
    author: "Gary F.",
    position: "Corporate Account Manager",
    initials: "GF"
  },
  {
    text: "Brett's taught me more about ERP than any of our corporate trainings have, he's always available and never judges me for having a bizarre or simple question, and above all else, he is an absolute pleasure to work with. Brett carries each customer demo/conversation with poise and respect, creating comfortable and inviting environments for all customers he speaks with. I know with 100 percent certainty that my customers are in great hands when Brett is on a call with us. His intelligence and depth of knowledge in the industry is inspiring.",
    author: "Mel B.",
    position: "Senior Account Manager",
    initials: "MB"
  },
  {
    text: "Brett attended 2 of my customer reviews and offered a tremendous amount of support, NetSuite knowledge, and credibility to my calls. My manager even attended one of the calls and said that Brett was one of the best solution consultants he's ever heard. On our last review, he effectively communicated with the VP of IT who had a ton of industry knowledge and NetSuite expertise. He asked quite a few very niche questions and Brett was able to answer EVERY one of them. He truly ran the show and set me up for success as an Account Manager.",
    author: "Alexa R.",
    position: "Account Manager",
    initials: "AR"
  },
  {
    text: "Brett is a true rock star and watching him grow over the last few years has been awesome. Not only is he unbelievably knowledgeable about all things NetSuite but he is fantastic with customers. Whether that be assisting with a challenge a customer is experiencing or just advising them with their plans for growth, Brett truly shines when it comes to building rapport and helping drive a deal across the finish line.",
    author: "Alex D.",
    position: "Regional Director",
    initials: "AD"
  },
  {
    text: "I could always rely on Brett to find the best vendor for anything I could dream up. His ability to work with vendors to negotiate prices and make sure they met their promises took great deals of pressure off of myself and the engineering team to do what engineers do best. Tell Brett what you needed and you know it will be taken care of. However, at the same time he would make sure you are in the loop to track the progress as well as answer any questions that need to be asked and answered.",
    author: "Johnathan G.",
    position: "Senior Engineer",
    initials: "JG"
  }
]

const achievements = [
  {
    value: "$14M+",
    label: "ARR Generated"
  },
  {
    value: "500+",
    label: "Customer Wins"
  },
  {
    value: "$2M+",
    label: "Cost Savings"
  },
  {
    value: "4x",
    label: "MVP Award Winner"
  },
  {
    value: "2x",
    label: "Presidents Club"
  },
  {
    value: "3x",
    label: "Conference Presenter"
  },
  {
    value: "14x",
    label: "Certifications"
  },
  {
    value: "60+",
    label: "Pro Bono Hours"
  },
  {
    value: "10K+",
    label: "Users Impacted"
  }
]

export function AboutSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Who Am I?</h1>
        <p className="text-muted-foreground">
          A brief introduction to my professional journey
        </p>
      </div>

      {/* Bio Section */}
      <Card>
        <CardContent className="space-y-4 text-md leading-relaxed px-12 py-6">
          <p>
            I'm a seasoned technology professional with a passion for solving complex business challenges through innovative cloud solutions and data-driven insights. With extensive experience in enterprise software, cloud architecture, and AI/analytics, I help organizations transform their operations and achieve measurable results.
          </p>
          <p>
            My career spans sales enablement, solution design, development, and strategic consulting across various industries. I specialize in Oracle NetSuite, cloud infrastructure, and building scalable systems that drive business growth. From generating over $14M in ARR to helping implementing solutions for 500+ customers, I bring a proven track record of delivering value.
          </p>
          <p>
            Beyond technical expertise, I'm committed to knowledge sharing and mentorship. I've presented at industry conferences, earned 14+ certifications, and contributed 60+ hours of pro bono work to help organizations in need. I believe in building solutions that not only solve today's problems but also scale for tomorrow's opportunities.
          </p>
        </CardContent>
      </Card>

      {/* Career Highlights */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Career Highlights</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-secondary shadow-md border-border/10">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl font-bold mb-2">{achievement.value}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What Others Say</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6 px-8 py-2">
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
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
    label: "Sales MVP Award"
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
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">Who Am I?</h1>
        <p className="text-muted-foreground">
          A brief introduction to my professional journey
        </p>
      </motion.div>

      {/* Bio Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Card className="bg-card/50 backdrop-blur-sm bg-secondary/60 shadow-lg border-border/50 hover:bg-card/80 transition-colors">
        <CardContent className="space-y-4 text-md leading-relaxed px-12 py-6">
          <p>
            I'm a seasoned technology professional with a passion for solving complex business challenges through innovative cloud solutions and data-driven insights. My journey began with a BS in Industrial Distribution from Texas A&M University, where I developed a foundation in supply chain and procurement operations. Today, I'm pursuing a Master of Science in Analytics at Georgia Tech, continuously sharpening my ability to turn data into actionable business intelligence.
          </p>
          <p>
            Throughout my career, I've worked with companies both small and large across the products and e-commerce space, specializing in supply chain optimization, procurement operations, and enterprise resource planning. From managing inventory systems and vendor partnerships to architecting cloud solutions, I've seen firsthand how the right technology transforms operational complexity into competitive advantage. I specialize in Oracle NetSuite, cloud infrastructure, and building scalable systems that drive measurable business growth.
          </p>
          <p>
            I'm endlessly curious about technology and driven by the pursuit of excellence. Whether it's generating over $14M in ARR, implementing solutions for 500+ customers, or earning 14+ certifications, I'm always looking for ways to build systems that actually work—not just technically sound solutions, but ones people want to use. I've presented at industry conferences, contributed 60+ hours of pro bono work, and believe that the best solutions don't just solve today's problems—they unlock tomorrow's opportunities.
          </p>
        </CardContent>
        </Card>
      </motion.div>

      {/* Career Highlights */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold">Career Highlights</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
            >
              <Card className="bg-card/50 backdrop-blur-sm bg-secondary/60 shadow-lg border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl font-bold mb-2">{achievement.value}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </CardContent>
            </Card>
          </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold">What Others Say</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.7 + (index * 0.1), ease: "easeOut" }}
            >
              <Card className="bg-card/50 backdrop-blur-sm bg-secondary/60 shadow-lg border-border/50 hover:bg-card/80 transition-colors">
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

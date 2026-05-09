/* ============================================================
   Brett White · shared data
   Lives on window.PORTFOLIO so every variation pulls from one source.
   ============================================================ */

window.PORTFOLIO = {
  name: "Brett White",
  title: "Solutions Developer",
  location: "Houston, TX",
  email: "hello@brettwhite.io",
  github: "https://github.com/brettwhite-git",
  linkedin: "https://www.linkedin.com/in/bwhite90/",

  tagline: "I help platform teams turn ERP into something a developer would actually want to build on.",

  about: {
    short: "Pre-sales engineer turned solutions developer. Seven years at Oracle NetSuite — $17M+ ARR influenced, President's Club, and the SC of the Year on a 175-person team. Now I spend most of my days writing SuiteScript, wiring up SuiteAgent and CustomTool MCP servers, and figuring out how generative AI fits into the actual pre-sales workflow rather than the demo of it.",
    long: [
      "I came to software the long way around — supply chain manager out of Texas A&M, then sourcing and procurement, then a left turn into NetSuite consulting in 2019.",
      "What stuck is the seam between the customer's actual problem and the platform's actual capabilities. Most ERP demos optimize for one of the two; the good ones honor both. I try to build for the second kind.",
      "These days I'm working on integrating generative AI into pre-sales, building enablement for solution consultants on agentic coding workflows, and shipping side projects that scratch real itches — a Twilio click-to-call SuiteApp, a kanban portlet, an NSAW schema explorer in D3."
    ]
  },

  /* Career-impact metrics */
  metrics: [
    { value: "17", suffix: "M+", label: "ARR influenced", note: "Cumulative across 6+ years at Oracle NetSuite" },
    { value: "43", suffix: "%",  label: "POC conversion rate", note: "Sustained over 175-person SC org" },
    { value: "250", suffix: "%", label: "Quota attainment", note: "Year SC of the Year was awarded" },
    { value: "22", suffix: "+",  label: "NetSuite modules mastered", note: "Analytics, Planning, e-commerce, +" }
  ],

  /* Performance over time — for the data-forward variation */
  arrSeries: [
    { year: "FY20", arr: 1.4, role: "Staff SC" },
    { year: "FY21", arr: 2.1, role: "Staff SC" },
    { year: "FY22", arr: 3.3, role: "Senior SC" },
    { year: "FY23", arr: 3.9, role: "Senior SC" },
    { year: "FY24", arr: 5.2, role: "Senior SC" },
    { year: "FY25", arr: 4.4, role: "Principal SC" }
  ],

  /* Job history */
  history: [
    {
      company: "Oracle NetSuite", location: "Houston, TX",
      role: "Principal Solution Consultant",
      start: "Jun 2025", end: "Present",
      blurb: "Drives product growth across retail, hospitality, e-commerce, and apparel verticals. Owns the technical sales process for NetSuite Analytics Warehouse and integrates generative AI into pre-sales workflows.",
      bullets: [
        "Standardized vertical-deal motions the entire pre-sales team now uses; continued direct ARR contribution.",
        "Owns NetSuite Analytics Warehouse technical sales — built the demo methodology and training that drove the highest NSAW sales on the team.",
        "Shipped automated dataset generation tooling, letting consultants build advanced demo scenarios 60% faster.",
        "Authored internal developer enablement on agentic coding for Solution Consultants — IDE/SDF, CustomTool (MCP), SuiteAgent with NetSuite Next."
      ],
      stack: ["NetSuite", "SuiteScript", "SuiteAgent", "MCP", "GenAI"]
    },
    {
      company: "Oracle NetSuite", location: "Austin, TX",
      role: "Senior Solution Consultant",
      start: "Dec 2021", end: "Jun 2025",
      blurb: "Top-requested consultant on a 20-person team; SC of the Year in an organization of 175.",
      bullets: [
        "Generated $10.6M+ ARR across the tenure.",
        "Hit 250%+ attainment with a 43% POC conversion rate the year SC of the Year was awarded.",
        "Reduced customer system bottlenecks up to 50% via architecture and resource-scaling recommendations.",
        "Mastered 22+ add-on applications — Analytics Warehouse, Planning & Budgeting, e-commerce — driving upsell and retention.",
        "Trained Account Management on value selling and product positioning."
      ],
      stack: ["NetSuite", "Analytics Warehouse", "Planning & Budgeting", "Pre-sales"]
    },
    {
      company: "Oracle NetSuite", location: "Austin, TX",
      role: "Staff Solution Consultant",
      start: "Jun 2019", end: "Dec 2021",
      blurb: "Drove NetSuite adoption across new and existing accounts; recurring MVP of the Quarter.",
      bullets: [
        "Generated $3.5M+ ARR through upsells, net-new ERP, and managed services.",
        "Maintained 36% conversion rate, repeat MVP of the Quarter awards.",
        "Scoped and delivered 10–15h Suite Pro Bono engagements for the non-profit segment.",
        "Built and maintained sales pipelines in lockstep with account managers."
      ],
      stack: ["NetSuite", "ERP", "Pre-sales", "Pipeline"]
    },
    {
      company: "Screen Innovations", location: "Austin, TX",
      role: "Sourcing & Procurement Manager",
      start: "Aug 2016", end: "Jan 2019",
      blurb: "Principal buyer and sourcing strategist for engineered materials at a projector-screen manufacturer.",
      bullets: [
        "Drove $2M+ in cost savings via negotiation and process optimization.",
        "Cut material costs 20% by establishing global supplier partnerships.",
        "Bridged GTM, engineering, and operations to keep BOMs in sync with launch timelines.",
        "Managed a 5-person inventory and fulfillment team; lean strategies improved replenishment metrics ~30%."
      ],
      stack: ["Sourcing", "Supplier mgmt", "BOM", "Lean"]
    },
    {
      company: "Benedettini Cabinetry", location: "Rosenberg, TX",
      role: "Supply Chain Manager",
      start: "Feb 2013", end: "Jun 2016",
      blurb: "Custom-cabinetry supply chain — top-tier homebuilder accounts (Toll Brothers, Perry, Highland).",
      bullets: [
        "Built a mobile inventory scanning app that cut delivery-discrepancy back-charges by 80%.",
        "Directed a 20-person inventory and logistics team servicing hundreds of cabinets daily.",
        "Engineered route optimization and capacity planning, reducing mileage and trip counts.",
        "Cultivated supplier partnerships through volatile lumber market cycles."
      ],
      stack: ["Supply chain", "Logistics", "Inventory", "Mobile app"]
    }
  ],

  /* Skills matrix */
  skills: [
    {
      group: "Languages",
      items: [
        { name: "SQL",        level: 5, note: "NSAW, schema design, perf" },
        { name: "SuiteScript",level: 5, note: "2.1, SuiteApps, CustomTool" },
        { name: "TypeScript", level: 4 },
        { name: "Python",     level: 4 },
        { name: "R",          level: 4, note: "Quarto, time series, classification" },
        { name: "JavaScript", level: 5 }
      ]
    },
    {
      group: "Frameworks",
      items: [
        { name: "React",   level: 4 },
        { name: "Next.js", level: 4 },
        { name: "Node.js", level: 4 },
        { name: "ReactFlow", level: 3 },
        { name: "Tailwind", level: 4 }
      ]
    },
    {
      group: "Platforms",
      items: [
        { name: "NetSuite (full stack)", level: 5 },
        { name: "Analytics Warehouse",   level: 5 },
        { name: "OCI",                   level: 4 },
        { name: "Supabase",              level: 3 }
      ]
    },
    {
      group: "AI & Tooling",
      items: [
        { name: "SuiteAgent",       level: 5 },
        { name: "CustomTool / MCP", level: 5 },
        { name: "N/llm",            level: 4 },
        { name: "Agentic IDE flows",level: 4 }
      ]
    }
  ],

  /* Certifications */
  certs: [
    { issuer: "NetSuite", name: "All 7 NetSuite Certifications",            note: "Technical + functional, complete suite" },
    { issuer: "Oracle",   name: "OCI Autonomous AI Database Professional" },
    { issuer: "Oracle",   name: "OCI Generative AI Professional" },
    { issuer: "Oracle",   name: "OCI Architect Associate" },
    { issuer: "Oracle",   name: "Oracle Analytics Professional" }
  ],

  /* Selected projects — for case-study-style sections */
  projects: [
    {
      name: "NetSuite Developer Starter Pack",
      kind: "Enablement series",
      summary: "Video and illustration series helping non-technical NetSuite users adopt agentic coding workflows to ship SuiteScript.",
      stack: ["Next.js", "TypeScript", "NetSuite", "SuiteScript"],
      outcome: "Turns IDE setup, SuiteCloud tooling, and AI-assisted build patterns into a practical path for first-time NetSuite builders."
    },
    {
      name: "Analytics Modeling From Scratch",
      kind: "Educational platform",
      summary: "Formula-centric R/Quarto site covering classification (SVM, KNN), time series (ARIMA, GARCH), and regression.",
      stack: ["R", "Quarto", "renv", "GitHub Actions"],
      outcome: "Pairs mathematical theory with practical R code and judgment calls. Reproducible builds via renv."
    },
    {
      name: "NetSuite Twilio Click-to-Call",
      kind: "SuiteApp",
      summary: "One-click browser-to-phone telephony inside CRM records, with automatic transcription and AI-generated summaries.",
      stack: ["SuiteScript 2.1", "Twilio Voice SDK", "Twilio CI", "N/llm"],
      outcome: "Eliminated external hosting; sentiment, summary, and task-list captured directly into Phone Call records."
    },
    {
      name: "NSAW Schema Explorer",
      kind: "Internal tool",
      summary: "Interactive force-directed graph mapping Analytics Warehouse schema relationships.",
      stack: ["D3", "ReactFlow", "TypeScript"],
      outcome: "Cut average schema-discovery time for new consultants from hours to minutes."
    },
    {
      name: "NetSuite Opportunity Kanban",
      kind: "Dashboard portlet",
      summary: "Kanban board portlet rendering opportunities by status column on the NetSuite dashboard.",
      stack: ["SuiteScript 2.1", "React"],
      outcome: "Sales reps gain a visual pipeline view inside the system they already work in."
    },
    {
      name: "BitBasis",
      kind: "Web app · in progress",
      summary: "Bitcoin cost-basis tracker — CSV upload, transaction recording, fee tracking, performance charts.",
      stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Chart.js", "CMC API"],
      outcome: "In active development."
    }
  ],

  reviews: [
    {
      text: "The quality of Brett's work is consistently outstanding. He approaches every task with integrity, diligence, and a positive attitude. His knowledge and work aptitude is highly respected by peers and supervisors alike for his professionalism and reliability.",
      author: "Dan",
      role: "Consulting Manager"
    },
    {
      text: "From the outset, Brett distinguished himself through keen analytical thinking and a deep curiosity about complex systems. He combined rigorous technical skills with innovative thinking and communicates findings effectively to both technical and non-technical audiences.",
      author: "Ray",
      role: "Senior Consulting Manager"
    },
    {
      text: "Brett taught me more about ERP than any corporate training. He is always available, never judges a bizarre or simple question, and carries customer conversations with poise, respect, and deep knowledge.",
      author: "Mel",
      role: "Senior Account Manager"
    },
    {
      text: "Brett brought tremendous NetSuite knowledge and credibility to my customer reviews. He answered every niche question, ran the show, and set me up for success as an Account Manager.",
      author: "Alexa",
      role: "Account Manager"
    },
    {
      text: "Brett is unbelievably knowledgeable about all things NetSuite and fantastic with customers. He shines when building rapport, advising on growth plans, and helping drive deals across the finish line.",
      author: "Alex",
      role: "Regional Director"
    },
    {
      text: "I could always rely on Brett to find the best vendor for anything I could dream up. Tell Brett what you need and you know it will be taken care of, with clear communication along the way.",
      author: "Johnathan",
      role: "Senior Engineer"
    },
    {
      text: "During a critical NetSuite Analytics Warehouse decision point, Brett was exceptional. He stayed cool, redirected the conversation to platform strengths, and balanced value with honesty in a way that builds long-term trust.",
      author: "Gary",
      role: "Corporate Account Manager"
    }
  ],

  /* Education */
  education: [
    { school: "Georgia Tech", degree: "M.S. Analytics", year: "Spring 2026", note: "Online" },
    { school: "Texas A&M",    degree: "B.S. Industrial Distribution", year: "Dec 2012" }
  ],

  /* Nav sections — used by every variation */
  nav: [
    { id: "intro",     label: "Intro" },
    { id: "about",     label: "About" },
    { id: "skills",    label: "Skills" },
    { id: "history",   label: "History" },
    { id: "projects",  label: "Projects" },
    { id: "reviews",   label: "Reviews" },
    { id: "contact",   label: "Contact" }
  ]
};

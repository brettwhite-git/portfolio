"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Sparkline data for KPI cards
const arrSparkData = [
  { year: "2020", value: 1753816 },
  { year: "2021", value: 1980109 },
  { year: "2022", value: 2589352 },
  { year: "2023", value: 4593328 },
  { year: "2024", value: 3801780 },
  { year: "2025", value: 2797962 },
]

const dealSizeSparkData = [
  { year: "2020", value: 30769 },
  { year: "2021", value: 15715 },
  { year: "2022", value: 17148 },
  { year: "2023", value: 33528 },
  { year: "2024", value: 39602 },
  { year: "2025", value: 37306 },
]

const daysSparkData = [
  { year: "2020", value: 32 },
  { year: "2021", value: 36 },
  { year: "2022", value: 31 },
  { year: "2023", value: 45 },
  { year: "2024", value: 53 },
  { year: "2025", value: 32 },
]

const oppsWonSparkData = [
  { year: "2020", value: 57 },
  { year: "2021", value: 126 },
  { year: "2022", value: 151 },
  { year: "2023", value: 137 },
  { year: "2024", value: 96 },
  { year: "2025", value: 75 },
]

// Real sales data from CSV analysis
const lineChartData = [
  { quarter: "Q1 '20", arr: 10329, pipeline: 575100 },
  { quarter: "Q2 '20", arr: 333707, pipeline: 525861 },
  { quarter: "Q3 '20", arr: 751278, pipeline: 967105 },
  { quarter: "Q4 '20", arr: 658503, pipeline: 1322004 },
  { quarter: "Q1 '21", arr: 417164, pipeline: 1228464 },
  { quarter: "Q2 '21", arr: 559202, pipeline: 711450 },
  { quarter: "Q3 '21", arr: 731227, pipeline: 1074970 },
  { quarter: "Q4 '21", arr: 272516, pipeline: 550415 },
  { quarter: "Q1 '22", arr: 556787, pipeline: 821700 },
  { quarter: "Q2 '22", arr: 357696, pipeline: 878000 },
  { quarter: "Q3 '22", arr: 625111, pipeline: 1290777 },
  { quarter: "Q4 '22", arr: 1049758, pipeline: 1769898 },
  { quarter: "Q1 '23", arr: 1039949, pipeline: 3169441 },
  { quarter: "Q2 '23", arr: 2430823, pipeline: 2307579 },
  { quarter: "Q3 '23", arr: 660729, pipeline: 816500 },
  { quarter: "Q4 '23", arr: 461827, pipeline: 1392943 },
  { quarter: "Q1 '24", arr: 786149, pipeline:  1551831},
  { quarter: "Q2 '24", arr: 1179414, pipeline: 1085914 },
  { quarter: "Q3 '24", arr: 1355264, pipeline: 2820500 },
  { quarter: "Q4 '24", arr: 480954, pipeline: 2042500 },
  { quarter: "Q1 '25", arr: 1119734, pipeline: 2272100 },
  { quarter: "Q2 '25", arr: 1326432, pipeline: 1741500 },
  { quarter: "Q3 '25", arr: 351796, pipeline: 1658600 },
]

const lineChartConfig = {
  arr: {
    label: "ARR\u00A0\u00A0",
    color: "hsl(24 95% 53%)",
  },
  pipeline: {
    label: "Pipeline\u00A0\u00A0",
    color: "var(--chart-pipeline)",
  },
} satisfies ChartConfig

const barChartData = [
  { module: "Email Marketing", count: 6 },
  { module: "Fixed Assets", count: 6 },
  { module: "FP&A", count: 13 },
  { module: "Ecommerce", count: 16 },
  { module: "Analytics Warehouse", count: 22 },
  { module: "OneWorld", count: 24 },
  { module: "Integration Services", count: 27 },
  { module: "Database Services", count: 66 },
  { module: "CRM", count: 84 },
  { module: "Ecommerce Connector", count: 84 },
]

const barChartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-modules)",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

// Custom tick component for wrapping text on mobile
interface CustomYAxisTickProps {
  x?: number
  y?: number
  payload?: { value: string }
  isMobile?: boolean
}

const CustomYAxisTick = ({ x, y, payload, isMobile }: CustomYAxisTickProps) => {
  if (!payload?.value) {
    return null
  }

  if (!isMobile) {
    return (
      <text x={x} y={y} dy={4} textAnchor="end" fill="currentColor" fontSize={12}>
        {payload.value}
      </text>
    )
  }

  // Split text into words for wrapping on mobile
  const words = payload.value.split(' ')
  
  if (words.length === 1) {
    return (
      <text x={x} y={y} dy={4} textAnchor="end" fill="currentColor" fontSize={10}>
        {payload.value}
      </text>
    )
  }

  // Wrap text on mobile - split into two lines
  return (
    <text x={x} y={y} textAnchor="end" fill="currentColor" fontSize={10}>
      <tspan x={x} dy="-0.6em">{words[0]}</tspan>
      <tspan x={x} dy="1.2em">{words.slice(1).join(' ')}</tspan>
    </text>
  )
}

export function AnalyticsSection() {
  const containerRef = React.useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("all")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("1y")
    }
  }, [isMobile])

  const filteredData = React.useMemo(() => {
    if (timeRange === "all") return lineChartData

    const now = lineChartData.length
    if (timeRange === "1y") {
      return lineChartData.slice(Math.max(0, now - 4)) // Last 4 quarters
    } else if (timeRange === "2y") {
      return lineChartData.slice(Math.max(0, now - 8)) // Last 8 quarters
    }
    return lineChartData
  }, [timeRange])

  return (
    <div ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2 mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Performance and insights as an IC Solutions Consultant
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="@container/card bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="overflow-hidden [&[data-slot=card-header]]:grid-cols-[1fr_minmax(80px,35%)] @[260px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(100px,38%)] @[320px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(120px,42%)] @[400px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(140px,48%)]">
            <CardDescription className="text-[10px] @[220px]/card:text-xs @[280px]/card:text-sm">Total ARR Influence</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums @[220px]/card:text-xl @[260px]/card:text-2xl @[320px]/card:text-2xl @[380px]/card:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
              $17.5M
            </CardTitle>
            <CardAction className="overflow-hidden w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "ARR",
                    color: "hsl(24 95% 53%)",
                  },
                }}
                className="h-[35px] w-full @[220px]/card:h-[40px] @[260px]/card:h-[45px] @[300px]/card:h-[50px] @[340px]/card:h-[55px] @[400px]/card:h-[60px]"
              >
                <AreaChart data={arrSparkData}>
                  <defs>
                    <linearGradient id="arrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(24 95% 53%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(24 95% 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="value"
                    type="natural"
                    fill="url(#arrGradient)"
                    stroke="hsl(24 95% 53%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(24 95% 53%)", r: 2 }}
                  />
                </AreaChart>
              </ChartContainer>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">This Year</div>
                <div className="text-base font-semibold">$2.8M</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last Year</div>
                <div className="text-base font-semibold">$3.8M</div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="overflow-hidden [&[data-slot=card-header]]:grid-cols-[1fr_minmax(80px,35%)] @[260px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(100px,38%)] @[320px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(120px,42%)] @[400px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(140px,48%)]">
            <CardDescription className="text-[10px] @[220px]/card:text-xs @[280px]/card:text-sm">Avg Deal Closed</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums @[220px]/card:text-xl @[260px]/card:text-2xl @[320px]/card:text-2xl @[380px]/card:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
              $27.3K
            </CardTitle>
            <CardAction className="overflow-hidden w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Deal Size",
                    color: "hsl(24 95% 53%)",
                  },
                }}
                className="h-[35px] w-full @[220px]/card:h-[40px] @[260px]/card:h-[45px] @[300px]/card:h-[50px] @[340px]/card:h-[55px] @[400px]/card:h-[60px]"
              >
                <AreaChart data={dealSizeSparkData}>
                  <defs>
                    <linearGradient id="dealSizeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(24 95% 53%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(24 95% 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="value"
                    type="natural"
                    fill="url(#dealSizeGradient)"
                    stroke="hsl(24 95% 53%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(24 95% 53%)", r: 2 }}
                  />
                </AreaChart>
              </ChartContainer>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">This Year</div>
                <div className="text-base font-semibold">$37.6K</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last Year</div>
                <div className="text-base font-semibold">$39.6K</div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="overflow-hidden [&[data-slot=card-header]]:grid-cols-[1fr_minmax(80px,35%)] @[260px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(100px,38%)] @[320px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(120px,42%)] @[400px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(140px,48%)]">
            <CardDescription className="text-[10px] @[220px]/card:text-xs @[280px]/card:text-sm">Avg Days to Close</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums @[220px]/card:text-xl @[260px]/card:text-2xl @[320px]/card:text-2xl @[380px]/card:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
              38 days
            </CardTitle>
            <CardAction className="overflow-hidden w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Days",
                    color: "hsl(24 95% 53%)",
                  },
                }}
                className="h-[35px] w-full @[220px]/card:h-[40px] @[260px]/card:h-[45px] @[300px]/card:h-[50px] @[340px]/card:h-[55px] @[400px]/card:h-[60px]"
              >
                <AreaChart data={daysSparkData}>
                  <defs>
                    <linearGradient id="daysGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(24 95% 53%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(24 95% 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="value"
                    type="natural"
                    fill="url(#daysGradient)"
                    stroke="hsl(24 95% 53%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(24 95% 53%)", r: 2 }}
                  />
                </AreaChart>
              </ChartContainer>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">This Year</div>
                <div className="text-base font-semibold">32 days</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last Year</div>
                <div className="text-base font-semibold">53 days</div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="overflow-hidden [&[data-slot=card-header]]:grid-cols-[1fr_minmax(80px,35%)] @[260px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(100px,38%)] @[320px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(120px,42%)] @[400px]/card:[&[data-slot=card-header]]:grid-cols-[1fr_minmax(140px,48%)]">
            <CardDescription className="text-[10px] @[220px]/card:text-xs @[280px]/card:text-sm">Opportunities Won</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums @[220px]/card:text-xl @[260px]/card:text-2xl @[320px]/card:text-2xl @[380px]/card:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
              642
            </CardTitle>
            <CardAction className="overflow-hidden w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Opps",
                    color: "hsl(24 95% 53%)",
                  },
                }}
                className="h-[35px] w-full @[220px]/card:h-[40px] @[260px]/card:h-[45px] @[300px]/card:h-[50px] @[340px]/card:h-[55px] @[400px]/card:h-[60px]"
              >
                <AreaChart data={oppsWonSparkData}>
                  <defs>
                    <linearGradient id="oppsWonGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(24 95% 53%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(24 95% 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="value"
                    type="natural"
                    fill="url(#oppsWonGradient)"
                    stroke="hsl(24 95% 53%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(24 95% 53%)", r: 2 }}
                  />
                </AreaChart>
              </ChartContainer>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Lead SC</div>
                <div className="text-base font-semibold">92%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Win Rate</div>
                <div className="text-base font-semibold">43%</div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
      <Card className="@container/card bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>ARR and Pipeline by Quarter</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Historical performance since Q1 2020
            </span>
            <span className="@[540px]/card:hidden">Since Q1 2020</span>
          </CardDescription>
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
              <ToggleGroupItem value="all">All Time</ToggleGroupItem>
              <ToggleGroupItem value="1y">Last Year</ToggleGroupItem>
              <ToggleGroupItem value="2y">Last 2 Years</ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select a value"
              >
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all" className="rounded-lg">
                  All Time
                </SelectItem>
                <SelectItem value="2y" className="rounded-lg">
                  Last 2 Years
                </SelectItem>
                <SelectItem value="1y" className="rounded-lg">
                  Last Year
                </SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={lineChartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
                top: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="quarter"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                dataKey="arr"
                type="natural"
                stroke="var(--color-arr)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-arr)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
              <Line
                dataKey="pipeline"
                type="natural"
                stroke="var(--color-pipeline)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-pipeline)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
      <Card className="bg-gradient-to-t from-primary/3 to-card rounded-[24px] border-border/30 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Top 10 Solutions</CardTitle>
          <CardDescription>Most frequently closed</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer config={barChartConfig} className="h-[400px] w-full">
            <BarChart
              accessibilityLayer
              data={barChartData}
              layout="vertical"
              margin={{
                left: -10,
                right: isMobile ? 8 : 60,
                top: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" dataKey="count" hide />
              <YAxis
                dataKey="module"
                type="category"
                tickLine={false}
                tickMargin={4}
                axisLine={false}
                width={isMobile ? 100 : 180}
                tick={<CustomYAxisTick isMobile={isMobile} />}
                reversed
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={5}
              >
                <LabelList
                  position="right"
                  offset={10}
                  className="fill-foreground"
                  fontSize={isMobile ? 10 : 12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      </motion.div>
    </div>
    </div>
  )
}

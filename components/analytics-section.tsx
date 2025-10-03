"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Bar, BarChart, CartesianGrid, Cell, Label, LabelList, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, Sector, XAxis, YAxis } from "recharts"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
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

// Sparkline data for KPI cards (using quarterly ARR data)
const arrSparklineData = [
  { quarter: "Q1 '25", value: 1119734 },
  { quarter: "Q2 '25", value: 1326432 },
  { quarter: "Q3 '25", value: 351796 },
]

const dealSizeSparklineData = [
  { quarter: "Q1 '25", value: 27000 },
  { quarter: "Q2 '25", value: 28000 },
  { quarter: "Q3 '25", value: 27284 },
]

const daysToCloseSparklineData = [
  { quarter: "Q1 '25", value: 32 },
  { quarter: "Q2 '25", value: 36 },
  { quarter: "Q3 '25", value: 18 },
]

const oppsWonSparklineData = [
  { quarter: "Q1 '25", value: 400 },
  { quarter: "Q2 '25", value: 500 },
  { quarter: "Q3 '25", value: 642 },
]

const winRateSparklineData = [
  { quarter: "Q1 '25", value: 45 },
  { quarter: "Q2 '25", value: 47 },
  { quarter: "Q3 '25", value: 49 },
]

const leadSCSparklineData = [
  { quarter: "Q1 '25", value: 88 },
  { quarter: "Q2 '25", value: 90 },
  { quarter: "Q3 '25", value: 92 },
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

const areaChartConfig = {
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
  { module: "Payroll", count: 5 },
  { module: "Planning & Budgeting", count: 9 },
  { module: "Sandbox", count: 16 },
  { module: "Ecommerce", count: 17 },
  { module: "Analytics Warehouse", count: 22 },
  { module: "OneWorld", count: 24 },
  { module: "Integration", count: 27 },
  { module: "Database", count: 40 },
  { module: "CRM", count: 84 },
  { module: "Connector", count: 93 },
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

const radarChartData = [
  { category: "Retention", arr: 6737776 },
  { category: "Infrastructure", arr: 3374950 },
  { category: "Platform", arr: 1782644 },
  { category: "Support", arr: 1700947 },
  { category: "Subscription", arr: 1360059 },
  { category: "Commerce", arr: 980249 },
  { category: "Analytics", arr: 936451 },
  { category: "Accounting", arr: 632130 },
]

const radarChartConfig = {
  arr: {
    label: "ARR",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

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
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Performance and insights as an IC Sales Engineer
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total ARR Influence</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $17.5M
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +277%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">This Year</div>
                <div className="text-base font-semibold">92%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last Year</div>
                <div className="text-base font-semibold">49%</div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Average Deal Size</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $27.3K
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingDown />
                -2.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">This Year</div>
                <div className="text-base font-semibold">92%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last Year</div>
                <div className="text-base font-semibold">49%</div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Avg Days to Close</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              38 days
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingDown />
                -18%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">This Year</div>
                <div className="text-base font-semibold">92%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last Year</div>
                <div className="text-base font-semibold">49%</div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Opportunities Won</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              642
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +28%
              </Badge>
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
      <Card className="@container/card">
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

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Modules</CardTitle>
          <CardDescription>Most frequently closed modules</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className="h-[400px] w-full">
            <BarChart
              accessibilityLayer
              data={barChartData}
              layout="vertical"
              margin={{
                left: 0,
                right: isMobile ? 16 : 60,
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
                tickMargin={8}
                axisLine={false}
                width={isMobile ? 140 : 180}
                tick={{ fontSize: isMobile ? 11 : 12 }}
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
    </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Page() {
  const [blockDevices, setBlockDevices] = useState([]);
  const [error, setError] = useState(null);
  const totalVisitors = chartData[0].desktop + chartData[0].mobile


  // Fetch data from the lsblk API
  useEffect(() => {
    async function fetchBlockDevices() {
      try {
        const response = await fetch("/api/lsblk");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setBlockDevices(data.blockdevices || []); // Safeguard in case the API doesn't return the expected structure
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBlockDevices();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Machine</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>System Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>Memory</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square w-full max-w-[250px]"
                >
                  <RadialBarChart
                    data={chartData}
                    endAngle={180}
                    innerRadius={80}
                    outerRadius={130}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) - 16}
                                  className="fill-foreground text-2xl font-bold"
                                >
                                  {totalVisitors.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 4}
                                  className="fill-muted-foreground"
                                >
                                  Visitors
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                    <RadialBar
                      dataKey="desktop"
                      stackId="a"
                      cornerRadius={5}
                      fill="var(--color-desktop)"
                      className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      stackId="a"
                      cornerRadius={5}
                      className="stroke-transparent stroke-2"
                    />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
              </Card>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>

          <Table>
            <TableCaption>Block devices information fetched from lsblk.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Mount Point</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-red-500">
                    Error: {error}
                  </TableCell>
                </TableRow>
              ) : blockDevices.length > 0 ? (
                blockDevices.map((device) => (
                  <TableRow key={device.name}>
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>{device.size}</TableCell>
                    <TableCell>{device.mountpoint || "N/A"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

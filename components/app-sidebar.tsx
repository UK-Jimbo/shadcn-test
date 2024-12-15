"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavMedia } from "@/components/nav-media"
import { NavMachine } from "@/components/nav-machine"
import { NavProjects } from "@/components/nav-projects"
import { NavStorage } from "@/components/nav-storage"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "James Griffin",
    email: "james_griffin@tiscali.co.uk",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Minisforum UM560 XT",
      logo: GalleryVerticalEnd,
      plan: "12 Threads, 32GB Memory",
    },
    {
      name: "Minisforum MS-01",
      logo: AudioWaveform,
      plan: "32 Cores, 64GB Memory",
    },
    {
      name: "Dell r720",
      logo: Command,
      plan: "96 Cores, 192GB Memory",
    },
  ],
  navMain: [
    {
      title: "Virtualization",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Virtual Machines",
          url: "#",
        },
        {
          title: "LCXs",
          url: "#",
        },
        {
          title: "Templates",
          url: "#",
        },
      ],
    },
    {
      title: "Storage",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Disks",
          url: "#",
        },
        {
          title: "Pools",
          url: "#",
        },
        {
          title: "Shares",
          url: "#",
        },
        {
          title: "ISO Images",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  machines: [
    {
      name: "System Overview",
      url: "#",
      icon: Frame,
    },
  ],
  projects: [
    {
      name: "Virtual Machines",
      url: "#",
      icon: Frame,
    },
    {
      name: "LXCs",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Docker",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Templates",
      url: "#",
      icon: Map,
    },
  ],
  storage: [
    {
      name: "Disks",
      url: "#",
      icon: Frame,
    },
    {
      name: "Pools",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Shares",
      url: "#",
      icon: Map,
    },
    {
      name: "Backups",
      url: "#",
      icon: Map,
    },
  ],
  media: [
    {
      name: "ISO Images",
      url: "#",
      icon: Frame,
    },
    {
      name: "Container Images",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Snippets",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMachine machine={data.machines} />
        <NavProjects projects={data.projects} />
        <NavStorage storage={data.storage} />
        <NavMedia media={data.media} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

"use client";

import * as React from "react";
import { BanknoteIcon, TractorIcon, User2Icon, VeganIcon } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "@/types/userType";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Farmer",
      logo: TractorIcon,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Farms",
      url: "#",
      icon: VeganIcon,
      isActive: true,
      items: [
        {
          title: "Market",
          url: "/admin-dashboard/market",
        },
        {
          title: "Farm Monitor",
          url: "/admin-dashboard/farm-monitor",
        },
        {
          title: "Farmers",
          url: "/admin-dashboard/farmers",
        },
      ],
    },
    {
      title: "Investments",
      url: "#",
      icon: BanknoteIcon,
      isActive: true,
      items: [
        {
          title: "Investment and transitions",
          url: "#",
        },
        {
          title: "See investors",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: User2Icon,
      isActive: true,
      items: [
        {
          title: "User management",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import { BanknoteIcon, TractorIcon, VeganIcon } from "lucide-react";

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
    name: "User",
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
      title: "Manage",
      url: "#",
      icon: VeganIcon,
      isActive: true,
      items: [
        {
          title: "Orders",
          url: "/admin-dashboard/market",
        },
        {
          title: "Farm Monitor",
          url: "/admin-dashboard/farm-monitor",
        },
        {
          title: "Products",
          url: "/admin-dashboard/farmers",
        },
      ],
    },
    {
      title: "Investors",
      url: "#",
      icon: BanknoteIcon,
      isActive: true,
      items: [
        {
          title: "Investment management",
          url: "#",
        },
        {
          title: "See invest offers",
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

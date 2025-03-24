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
          url: "/my-dashboard/orders",
        },
        {
          title: "Farm Monitor",
          url: "/my-dashboard",
        },
        {
          title: "Products",
          url: "/my-dashboard/products",
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
          url: "/my-dashboard/investment-manage",
        },
        {
          title: "See invest offers",
          url: "/my-dashboard/investment-offers",
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

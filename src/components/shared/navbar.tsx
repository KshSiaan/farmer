"use client";

import { Tractor } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navLinks = [
    {
      label: "Invest",
      key: "invest",
      children: [
        { label: "Opportunities", key: "investment-opportunities" },
        { label: "Insurance", key: "insurance" },
      ],
    },
    {
      label: "Farming",
      key: "farming",
      children: [
        { label: "Monitoring", key: "farm-monitoring" },
        { label: "Marketplace", key: "marketplace" },
      ],
    },
    {
      label: "Manage",
      key: "manage",
      children: [
        { label: "Logistics", key: "logistics" },
        { label: "Investor", key: "investor-dashboard" },
        { label: "Farmer", key: "farmer-dashboard" },
      ],
    },
    { label: "Contact Us", key: "contact-us" },
  ];

  return (
    <nav className="sticky top-0 z-40 h-16 border-b !px-6 flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-black flex items-center gap-0 text-green-600"
        >
          Farmer <Tractor size={18} />
        </Link>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-6 text-sm font-bold">
          {navLinks.map((item) =>
            item.children ? (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuTrigger className="cursor-pointer !px-4">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!p-0">
                  <ul className="grid w-[400px] gap-3 !p-4">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/${child.key}`}
                            className="block select-none !py-4 !space-y-1 rounded-md !p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {child.label}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.key}>
                <Link href={`/${item.key}`} legacyBehavior passHref>
                  <NavigationMenuLink className="font-semibold !px-4 !py-2">
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <Button className="!px-4 bg-green-600 hover:bg-green-700" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button className="!px-4" variant="outline" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </nav>
  );
}

import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  UserIcon,
  LayoutDashboard,
  Sprout,
  Package,
  ShieldCheck,
  Settings2,
  TractorIcon,
} from "lucide-react";
import Logout from "./sub/logout";
import { Button } from "../ui/button";
import { User } from "@/types/userType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

const NavLinks = [
  { label: "About", key: "about" },
  { label: "Team", key: "team" },
  { label: "Marketplace", key: "market" },
  { label: "Farms & Investors", key: "farms-investors" },
  { label: "Insurance", key: "insurance" },
  { label: "Impact", key: "impact" },
];

export default function Navbar({ user }: { user?: User }) {
  const profLinks = [
    {
      label: "Dashboard",
      key: "my-dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My account",
      key: "profile",
      icon: UserIcon,
    },

    {
      label: "My Farms",
      key: "my-farms",
      icon: Sprout,
    },
    {
      label: "Products",
      key: "my-products",
      icon: Package,
    },
    {
      label: "My insurances",
      key: "my-insurance",
      icon: ShieldCheck,
    },

    {
      label: "Settings",
      key: "settings",
      icon: Settings2,
    },
  ];

  const investorLinks = [
    {
      label: "Dashboard",
      key: "my-dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My account",
      key: "profile",
      icon: UserIcon,
    },
    {
      label: "My insurances",
      key: "my-insurance",
      icon: ShieldCheck,
    },

    {
      label: "Settings",
      key: "settings",
      icon: Settings2,
    },
  ];
  const adminLinks = [
    {
      label: "Admin Dashboard",
      key: "/admin-dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My account",
      key: "profile",
      icon: UserIcon,
    },

    {
      label: "Settings",
      key: "settings",
      icon: Settings2,
    },
  ];

  // const user = null;
  return (
    <nav className="h-[64px] w-dvw shadow-sm flex flex-row justify-between items-center !px-6">
      <div className="flex flex-row justify-start items-center gap-4 md:gap-12">
        <h1 className="font-bold text-sm text-green-700">
          <Link href={"/"} className="flex flex-row justify-start items-center">
            FARMER <TractorIcon />
          </Link>
        </h1>
        <ul className="flex flex-row justify-start items-center gap-4 font-semibold">
          {NavLinks.map((item, i) => (
            <li key={i} className="hover:underline">
              <Link href={`/` + item.key}>{item.label}</Link>
            </li>
          ))}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="font-semibold text-base hover:!bg-transparent !px-0"
              >
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-base font-semibold">
              <DropdownMenuItem asChild>
                <Link href="/terms">Terms and Conditions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/privacy">Privacy policy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about">About us</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </ul>
      </div>

      <div className="flex flex-row justify-end items-center gap-6 font-semibold">
        {user ? (
          <div className="flex justify-end items-center">
            <Sheet>
              <SheetTrigger asChild>
                <span className="flex flex-row justify-end items-center gap-3">
                  <span className="hover:underline cursor-pointer">
                    {user.name}
                  </span>
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </span>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>{user.name}</SheetTitle>
                  <div className="!py-4">
                    <ul className="text-sm font-semibold !space-y-4 text-zinc-600 list-inside">
                      {user?.role === "super_admin"
                        ? adminLinks.map((item, i) => (
                            <li
                              key={i}
                              className="flex flex-row justify-start items-center gap-2 hover:text-zinc-900"
                            >
                              <item.icon className="size-4" />
                              <Link href={item.key}>{item.label}</Link>
                            </li>
                          ))
                        : user?.role === "investor"
                        ? investorLinks.map((item, i) => (
                            <li
                              key={i}
                              className="flex flex-row justify-start items-center gap-2 hover:text-zinc-900"
                            >
                              <item.icon className="size-4" />
                              <Link href={item.key}>{item.label}</Link>
                            </li>
                          ))
                        : profLinks.map((item, i) => (
                            <li
                              key={i}
                              className="flex flex-row justify-start items-center gap-2 hover:text-zinc-900"
                            >
                              <item.icon className="size-4" />
                              <Link href={item.key}>{item.label}</Link>
                            </li>
                          ))}
                      <li className="flex flex-row justify-start items-center gap-2 hover:text-zinc-900">
                        <Logout />
                      </li>
                    </ul>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="farm" asChild>
              <Link href="/register">Sign in</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

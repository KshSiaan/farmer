import { Button } from "@/components/ui/button";
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
  User,
  LayoutDashboard,
  Sprout,
  Package,
  ShieldCheck,
  Settings2,
  TractorIcon,
  EllipsisIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavLinks = [
  { label: "Marketplace", key: "market" },
  { label: "Farms", key: "farms" },
  { label: "Investors", key: "investors" },
  { label: "Insurance", key: "insurance" },
];

const profLinks = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My account",
    key: "profile",
    icon: User,
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

export default function Navbar() {
  return (
    <nav className="h-[64px] w-dvw shadow-sm flex flex-row justify-between items-center !px-6">
      <div className="flex flex-row justify-start items-center gap-4 md:gap-12">
        <h1 className="font-bold text-sm text-green-700">
          <Link href={"/"} className="flex flex-row justify-start items-center">
            FARMER <TractorIcon />
          </Link>
        </h1>
        <ul className="flex flex-row justify-start items-center gap-4 text-sm font-bold">
          {NavLinks.map((item, i) => (
            <li key={i} className="hover:underline">
              <Link href={`/` + item.key}>{item.label}</Link>
            </li>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm font-bold hover:!bg-transparent !px-0"
              >
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
          </DropdownMenu>
        </ul>
      </div>

      <div className="flex flex-row justify-end items-center gap-6 text-sm font-bold">
        {/* <Button variant="farm">Login</Button>
        <Button>Sign in</Button> */}
        <div className="flex justify-end items-center gap-3">
          <Link href="/profile" className="hover:underline">
            Porter Robinson
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <div className="size-10 bg-zinc-300 rounded-full flex justify-center items-center text-zinc-500 cursor-pointer">
                PR
              </div>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Porter Robinson</SheetTitle>
                <div className="!py-4">
                  <ul className="text-sm font-semibold !space-y-4 text-zinc-600 list-inside">
                    {profLinks.map((item, i) => (
                      <li
                        key={i}
                        className="flex flex-row justify-start items-center gap-2 hover:text-zinc-900"
                      >
                        <item.icon className="size-4" />
                        <Link href={item.key}>{item.label}</Link>
                      </li>
                    ))}
                    <li className="flex flex-row justify-start items-center gap-2 hover:text-zinc-900">
                      <Button
                        className="w-full hover:bg-red-600/90 hover:text-background"
                        variant="outline"
                      >
                        Log out
                      </Button>
                    </li>
                  </ul>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

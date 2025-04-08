"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

export default function Logout() {
  const [, , removeCookie] = useCookies(["token"]);
  const navig = useRouter();
  const path = usePathname();

  return (
    <Button
      onClick={() => {
        removeCookie("token");

        if (path == "/") {
          navig.push("/login");
        } else {
          navig.push("/");
        }
      }}
      className="w-full hover:bg-red-600/90 hover:text-background"
      variant="outline"
    >
      Log out
    </Button>
  );
}

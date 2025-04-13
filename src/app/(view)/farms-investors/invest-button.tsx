"use client";
import { Button } from "@/components/ui/button";
import { getFetcher } from "@/lib/simplifier";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function InvestButton({ id }: { id: string }) {
  const [role, setRole] = useState<string | null>(null);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    async function getUser() {
      try {
        const call = await getFetcher({
          link: "/auth/profile",
          token: cookies.token,
        });
        if (!call.status) {
          console.error(call.message);
          return;
        }
        setRole(call.data.role);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);

  if (role === "investor") {
    return (
      <>
        <Button className="w-full" asChild>
          <Link href={`/farms-investors/invest?id=${id}`}>
            Invest in this farm
          </Link>
        </Button>
      </>
    );
  }
  return null;
}

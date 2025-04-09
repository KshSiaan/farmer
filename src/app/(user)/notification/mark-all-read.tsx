"use client";
import { Button } from "@/components/ui/button";
import { getFetcher } from "@/lib/simplifier";
import { CheckCheckIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function MarkAllRead() {
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const call = await getFetcher({
            link: "/read-all-notify",
            token: cookies.token,
          });
          if (!call.status) {
            console.error(call?.message);
            setLoading(false);
            return;
          }

          console.log(call?.message);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      }}
    >
      {loading ? (
        <>
          <Loader2Icon className="animate-spin" /> Loading
        </>
      ) : (
        <>
          <CheckCheckIcon /> Mark all as read
        </>
      )}
    </Button>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function OrderAccept({
  id,
  status,
}: {
  id: string;
  status?: string;
}) {
  return (
    <Button
      variant={status === "pending" ? "farm" : "secondary"}
      onClick={async () => {
        console.log(id, status);
      }}
    >
      {status === "pending" ? "Accept" : "Cancel"}
    </Button>
  );
}

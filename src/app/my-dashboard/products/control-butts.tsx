"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ControlButts({ id }: { id: string }) {
  return (
    <>
      <Button
        variant="destructive"
        onClick={async () => {
          console.log(id);
        }}
      >
        Delete
      </Button>
    </>
  );
}

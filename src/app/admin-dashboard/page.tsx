import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-center items-center">
          <CardTitle className="text-4xl">Total Users</CardTitle>
          <CardDescription className="text-2xl">01</CardDescription>
        </Card>
        <Card className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-center items-center">
          <CardTitle className="text-4xl">Total Farms</CardTitle>
          <CardDescription className="text-2xl">01</CardDescription>
        </Card>
        <Card className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-center items-center">
          <CardTitle className="text-4xl">Total Investors</CardTitle>
          <CardDescription className="text-2xl">01</CardDescription>
        </Card>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
    </>
  );
}

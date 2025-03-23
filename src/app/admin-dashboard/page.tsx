"use server";

import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    return (
      <div className="h-dvh w-full flex justify-center items-center font-bold">
        Please log in first
      </div>
    );
  }

  const call = await getFetcher({ link: "/auth/profile", token: token?.value });

  return (
    <SidebarProvider>
      <AppSidebar user={call.data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 !px-4">
            <SidebarTrigger className="!-ml-1" />
            <Separator
              orientation="vertical"
              className="!mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 !p-4 pt-0">
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
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { AppSidebar } from "@/components/app-sidebar";
import UrlGueser from "@/components/shared/sub/urlguesser";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  console.log("loko:");
  console.log();

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
            <UrlGueser />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 !p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

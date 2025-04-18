"use server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import { Users, Home, Briefcase, TrendingUp } from "lucide-react";
import AnalyticsChart from "./analytics-chart";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const call = await getFetcher({ link: "/analytics", token });
  console.log(call);

  const { total_users, total_farms, total_investors } = call;

  return (
    <div className="!space-y-8 !p-4">
      <h1 className="text-lg font-bold !mb-6">Dashboard Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between !pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total_users}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between !pb-2">
            <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total_farms}</div>
            <p className="text-xs text-muted-foreground">Active farms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between !pb-2">
            <CardTitle className="text-sm font-medium">
              Total Investors
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total_investors}</div>
            <p className="text-xs text-muted-foreground">Active investors</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="!mt-8">
        <Card className="!p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Growth Trends (Last 12 Months)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AnalyticsChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

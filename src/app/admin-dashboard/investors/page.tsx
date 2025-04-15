import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: "investor" | string;
  address: string;
  phone: string | null;
  image: string;
  otp: string | null;
  otp_expire_at: string | null;
  google_id: string | null;
  is_verified_investor: number;
  stripe_connect_id: string | null;
  completed_stripe_onboarding: number;
  status: "active" | "inactive" | string;
  balance: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const call = await getFetcher({ link: "/investor-list", token });

  if (!call.status) {
    return <>{call.message}</>;
  }
  console.log(call.data);

  return (
    <div className="overflow-y-auto overflow-x-hidden !p-4 h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Display photo</TableHead>
            <TableHead>Investor Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {call.data.map((i: User) => (
            <TableRow key={i.id}>
              <TableCell>
                <Avatar>
                  <AvatarFallback>
                    {i.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                  <AvatarImage src={i.image} />
                </Avatar>
              </TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.email}</TableCell>
              <TableCell>
                <Badge
                  variant={i.status === "active" ? "default" : "secondary"}
                >
                  {i.status}
                </Badge>
              </TableCell>
              <TableCell>{i.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

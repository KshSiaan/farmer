import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
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
import AddLogistic from "./add-logistic";

interface Order {
  id: number;
  transaction_id: null | string;
  total_price: string;
}

interface Logistics {
  id: number;
  order_id: number;
  transaction_id: null | string;
  tracking_number: string;
  vehicle_number: string;
  driver_name: string;
  estimated_delivery: string;
  shipping_cost: string;
  logistics_status: "in-transit" | string; // Add other possible statuses if known
  created_at: string;
  updated_at: string;
  order: Order;
}

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const call = await getFetcher({ link: "/get-logistics", token });

  const data: Logistics[] = call.data.data;

  return (
    <div className="overflow-y-auto overflow-x-hidden !p-4 h-full">
      {/* <div className="flex justify-end items-center !mb-8">
        <Button>Add Logistic</Button>
      </div> */}
      <h2 className="text-center text-xl !mb-8">Available Logistics</h2>
      <div className="flex justify-end items-center">
        <AddLogistic />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Driver Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tracking number</TableHead>
            <TableHead>Estimated Delivery</TableHead>
            <TableHead className="text-center border-l">
              Shipping Cost
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.id}</TableCell>
              <TableCell>{i.driver_name}</TableCell>
              <TableCell>
                <Badge>{i.logistics_status}</Badge>
              </TableCell>
              <TableCell>{i.tracking_number}</TableCell>
              <TableCell>{i.estimated_delivery}</TableCell>
              <TableCell className="flex justify-center items-center border-l">
                ${i.shipping_cost}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

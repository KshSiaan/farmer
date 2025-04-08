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
import OrderAccept from "./order-accept";
interface Order {
  id: string;
  buyer_id: number;
  farmer_id: number;
  product_id: number;
  transaction_id: number | null;
  quantity: string;
  total_price: string;
  order_status: string;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
  buyer: {
    id: number;
    name: string;
  };
  farmer: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
    price: string;
  };
}
export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const call = await getFetcher({ link: "/order-list", token });

  console.log(call.data.data);

  return (
    <div className="overflow-y-auto overflow-x-hidden !p-4 h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Purchased by</TableHead>
            <TableHead>Product name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {call.data.data.map((i: Order) => (
            <TableRow key={i.id}>
              <TableCell>{i.id}</TableCell>
              <TableCell>{i.buyer.name}</TableCell>
              <TableCell>{i.product.name}</TableCell>
              <TableCell>{i.quantity}kg</TableCell>
              <TableCell>
                <OrderAccept id={i.id} status={i.order_status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

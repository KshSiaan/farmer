import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
export default async function Page() {
  const token = (await cookies()).get("token")?.value;

  const call = await getFetcher({ link: "/order-list", token });

  if (!call.status) {
    return <>Something went wrong..</>;
  }

  const orders = call.data.data;

  return (
    <div className="">
      <div className="!my-12 w-4/5 !mx-auto">
        <Button asChild>
          <Link href="/">
            <ChevronLeftIcon /> Home
          </Link>
        </Button>
      </div>
      <div className="w-4/5 !my-12 !mx-auto">
        <Table className="bg-secondary">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Product name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              {/* <TableHead className="text-center">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(
              (item: {
                id: string;
                product: { name: string };
                total_price: string;
                quantity: string;
              }) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.total_price}</TableCell>
                  {/* <TableCell>
                  <Badge
                  variant={item.status == "Active" ? "default" : "outline"}
                >
                  {item.status}
                </Badge>
                </TableCell> */}
                  {/* <TableCell className="flex justify-center items-center gap-4">
                  <Button variant="farm" className="" asChild disabled>
                  <Link href="#">
                    <PenIcon />
                    Edit Farm
                  </Link>
                </Button>
                <Button variant="destructive" className="" asChild disabled>
                  <Link href="#">
                    <Trash2Icon />
                    Delete Farm
                  </Link>
                </Button>
                </TableCell> */}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

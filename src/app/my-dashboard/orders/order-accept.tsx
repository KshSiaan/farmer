"use client";
import { Button } from "@/components/ui/button";
import { postFetcher } from "@/lib/simplifier";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function OrderAccept({
  id,
  status,
}: {
  id: string;
  status?: string;
}) {
  const navig = useRouter();

  return (
    <Button
      variant={status === "pending" ? "farm" : "secondary"}
      onClick={async () => {
        // console.log(id, status);

        const call = await postFetcher({
          link: `/update-order-status/${id}`,
          meth: "POST",
          data: { _method: "PUT", order_status: "delivered" },
        });
        if (!call.status) {
          toast(call.message);
          return;
        }
        toast(call.message);
        navig.refresh();
      }}
    >
      {status === "pending" ? "Accept" : "Cancel"}
    </Button>
  );
}

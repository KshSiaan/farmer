"use client";

import { Button } from "@/components/ui/button";
import { deleteFetcher } from "@/lib/simplifier";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function DeleteInsurance({ id }: { id: string }) {
  const [cookies] = useCookies(["token"]);
  const [deleted, setDeleted] = useState(false);

  const deleteInsurance = async () => {
    try {
      const call = await deleteFetcher({
        link: `/delete-insurance/${id}`,
        token: cookies.token,
      });
      //   if (!call.status) {
      //     console.error(call.message);
      //     return;
      //   }
      console.log(call.message);

      setDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => {
          deleteInsurance();
        }}
        disabled={deleted}
      >
        <Trash2Icon />
        {deleted ? "Deleted" : "Delete Insurance"}
      </Button>
    </>
  );
}

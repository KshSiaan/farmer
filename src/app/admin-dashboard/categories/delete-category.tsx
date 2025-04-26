"use client";
import { Button } from "@/components/ui/button";
import { deleteFetcher } from "@/lib/simplifier";
import { TrashIcon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function DeleteCat({ id }: { id: string }) {
  const [cookies] = useCookies(["token"]);

  return (
    <>
      <Button
        variant="destructive"
        onClick={async () => {
          try {
            const call = await deleteFetcher({
              link: `/delete-categories/${id}`,
              token: cookies.token,
            });
            console.log(call);

            if (!call.status) {
              toast(call.message);
              // console.error(call);
              return;
            }

            toast(call.message);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <TrashIcon /> Delete
      </Button>
    </>
  );
}

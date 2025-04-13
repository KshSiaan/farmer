"use client";
import { Button } from "@/components/ui/button";
import { postFetcher } from "@/lib/simplifier";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function Approver({ id }: { id: string }) {
  const navig = useRouter();
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);

  return (
    <>
      <Button
        variant="farm"
        onClick={async () => {
          setLoading(true);
          try {
            const call = await postFetcher({
              link: `/investment-status/${id}`,
              token: cookies.token,
              meth: "PUT",
              data: { status: "approved" },
            });
            if (!call.status) {
              console.error(call.message);
              setLoading(false);
              return;
            }
            navig.push("/my-dashboard/investment-manage");
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error(error);
          }
        }}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin" /> Loading..
          </>
        ) : (
          "Approve"
        )}
      </Button>
    </>
  );
}

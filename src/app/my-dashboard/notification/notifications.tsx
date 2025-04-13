import { Button } from "@/components/ui/button";
import React from "react";
interface NotificationData {
  investment_id: number;
  status: "approved" | string; // Add other possible statuses if known
  amount: string;
}

interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationData;
  read_at: null | string | Date;
  created_at: string;
  updated_at: string;
}
export default function Notifications({ data }: { data: Notification[] }) {
  return data.map((i, index) => (
    <div
      key={index}
      className="!p-4 w-full border shadow rounded-sm"
      style={{ backgroundColor: "#f4f4f5" }}
    >
      <p className="text-sm font-light">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga totam
        veniam quis, unde corrupti perspiciatis est minima sapiente! Non quod
        fugit necessitatibus dolorem doloribus ea autem aliquid at amet
        aspernatur!
      </p>
      <div className="!mt-6 flex justify-between items-center">
        <p className="text-sm font-semibold">Amount: {i.data.amount} </p>
        {i.read_at ? (
          <>{i.read_at}</>
        ) : (
          <Button
            size="sm"
            variant="outline"
            // onClick={async () => {
            //   try {
            //     const call = getFetcher({link:"",token:cookies.token})
            //   } catch (error) {console.error(error);
            //   }
            // }}
          >
            Mark as read
          </Button>
        )}
      </div>
    </div>
  ));
}

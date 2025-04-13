import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotificationPanel() {
  return (
    <Button size="icon" variant="ghost" asChild>
      <Link href="/my-dashboard/notification">
        <BellIcon />
      </Link>
    </Button>
  );
}

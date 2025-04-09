import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import React from "react";
import Notifications from "./notifications";
import MarkAllRead from "./mark-all-read";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return (
      <div className="h-12 w-full flex justify-center items-center">
        Please log in to see this content
      </div>
    );
  }
  const call = await getFetcher({ link: "/get-notify", token });

  if (!call.status) {
    return (
      <div className="h-12 w-full flex justify-center items-center">
        {call.message}
      </div>
    );
  }

  return (
    <main className="!px-[7%] !py-12">
      <h1 className="text-5xl font-bold text-center border-b !pb-4">
        Notifications
      </h1>
      <div className="!my-8">
        <div className="flex justify-end items-center">
          <MarkAllRead />
        </div>
      </div>
      <div className="!space-y-8">
        <Notifications />
      </div>
    </main>
  );
}

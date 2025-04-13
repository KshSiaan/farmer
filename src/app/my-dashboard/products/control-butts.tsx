"use client";
import React from "react";
import Deleteprod from "./delete-prod";

export default function ControlButts({ id }: { id: string }) {
  return (
    <>
      <Deleteprod id={id} />
    </>
  );
}

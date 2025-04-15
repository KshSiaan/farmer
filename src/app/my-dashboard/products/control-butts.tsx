"use client";
import React from "react";
import Deleteprod from "./delete-prod";
import EditProd from "./edit-prod";

export default function ControlButts({ id }: { id: string }) {
  return (
    <>
      <EditProd id={id} />
      <Deleteprod id={id} />
    </>
  );
}

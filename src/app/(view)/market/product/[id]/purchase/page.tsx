import React from "react";
import PaymentForm from "./payment-form";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <PaymentForm id={params.id} />
    </div>
  );
}

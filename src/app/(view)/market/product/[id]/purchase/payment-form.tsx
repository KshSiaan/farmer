/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  "pk_test_51QVtZAK0hXSiOrOR1kS8PQLdvhwxR0STnbERnchZxiomzvIeaY9KwDLiUYQc1UJAK0FLZZj2HYNqxoIdEfr6PLp000vthuhyhb"
);
const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const [cookies] = useCookies(["token"]);
  const path = usePathname();
  const [preferedLink, setPreferedLink] = useState<string>("/");
  const navig = useRouter();

  const stripe = useStripe();
  const elements = useElements();
  const cart = localStorage.getItem("cart");
  if (!cart) {
    navig.back();
    return;
  }
  const prod = JSON.parse(cart);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Call elements.submit() to collect data
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(submitError.message);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
      try {
        const call = await postFetcher({
          link: "/create-order",
          token: cookies.token,
          meth: "POST",
          data: {
            product_id: prod.product_id,
            quantity: prod.quantity,
          },
        });

        if (!call.status) {
          return;
        } else {
          setPreferedLink(`${path}/order-summery?access=${call.data.id}`);
          navig.push("/orders");
        }
      } catch (error) {
        alert("Payment was successful but couldn't add to database");
      }
    }

    if (error) alert(error.message);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-2/3 !mx-auto !my-12">
        <PaymentElement />
        <Button
          className="w-full !mt-12"
          size="lg"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay ${prod.price}
        </Button>
      </form>
    </>
  );
};

export default function PaymentForm({ id }: { id: string }) {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies] = useCookies(["token"]);
  const navig = useRouter();

  useEffect(() => {
    console.log("Service ID:", id);
    console.log("Fetching Payment Intent...");

    async function getData() {
      try {
        const cart = localStorage.getItem("cart");
        if (!cart) {
          navig.back();
          return;
        }
        const prod = JSON.parse(cart);
        const call = await postFetcher({
          link: "/payment-intent",
          meth: "POST",
          token: cookies.token,
          data: { product_id: id, payment_method: "pm_card_visa" },
        });

        console.log("API Response:", call);

        if (call?.data?.client_secret) {
          setClientSecret(call.data.client_secret);
        } else {
          console.error("client_secret is missing from API response!");
        }
      } catch (error) {
        console.error("Payment Intent Fetch Error:", error);
      }
    }

    getData();
  }, []);

  return clientSecret ? (
    <>
      <br />
      <Elements
        stripe={stripePromise}
        options={{
          // mode: "payment",
          // amount: 123,
          // currency: "usd",
          clientSecret,
        }}
      >
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </>
  ) : (
    <div className="h-[100px] w-full flex justify-center items-center">
      <Loader2Icon className="animate-spin !mr-4" />
      Preparing your order
    </div>
  );
}

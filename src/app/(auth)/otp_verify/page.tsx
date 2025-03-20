"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// Define the form validation schema with Zod
const formSchema = z.object({
  otp: z.string(),
});

export default function LoginForm() {
  const [, setCookie] = useCookies(["token"]);
  const navig = useRouter();

  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const call = await postFetcher({
        link: "/auth/verify",
        meth: "POST",
        data: values,
      });
      console.log(call);

      if (call.access_token) {
        setCookie("token", call.access_token);
        navig.push("/");
      } else {
        console.log("Token not found");
      }
      if (call.status) {
        navig.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center !px-4 !py-12">
      <Card className="w-full max-w-md border-zinc-200 bg-white shadow-lg">
        <CardHeader className="!space-y-1">
          <CardTitle className="text-2xl font-bold text-zinc-900">
            OTP Verification
          </CardTitle>
          <CardDescription className="text-zinc-500">
            The OTP verification mail is sent to your email
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
            <CardContent className="!space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-full flex justify-center items-center">
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Send OTP code
              </Button>
              <Button
                className="w-full"
                variant="link"
                onClick={() => {
                  navig.back();
                }}
              >
                Go back
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

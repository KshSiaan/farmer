import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
export default function LoginForm() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center !px-4 !py-12">
      <Card className="w-full max-w-md border-zinc-200 bg-white shadow-lg">
        <CardHeader className="!space-y-1">
          <CardTitle className="text-2xl font-bold text-zinc-900 text-center">
            Registration Successfull
          </CardTitle>
        </CardHeader>
        <CardContent className="!space-y-6">
          <Button className="w-full" variant="farm" asChild>
            <Link href="/otp_verify">Verify OTP now</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link href="/">Later</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

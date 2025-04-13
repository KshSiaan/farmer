import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formPostFetcher } from "@/lib/simplifier";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";

export default function DPUp() {
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);
  const navig = useRouter();
  const submitter = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const dpInput = form.elements.namedItem("dp") as HTMLInputElement | null;

    if (dpInput && dpInput.files && dpInput.files.length > 0) {
      console.log(dpInput.files[0]); // Access the selected file

      try {
        const formData = new FormData();

        formData.append("image", dpInput.files[0]);

        const call = await formPostFetcher({
          link: "/auth/profile-update",
          token: cookies.token,
          meth: "POST",
          data: formData,
        });

        if (!call.status) {
          setLoading(false);
          console.error(call.message);
          return;
        }

        navig.push("/profile");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } else {
      setLoading(false);
      console.log("No file selected.");
    }
  };

  return (
    <div className="">
      <form onSubmit={submitter}>
        <Card>
          <CardContent className="!space-y-6">
            <Label>Choose your profile picture:</Label>
            <Input name="dp" type="file" />
            <Button type="submit" disabled={loading}>
              Confirm
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

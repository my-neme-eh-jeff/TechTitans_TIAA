"use client";
import Icons from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

export default function UserAuthForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col container place-items-center">
        <div className="flex flex-col gap-8">
          <Input
            type="email"
            label="Email"
            size="lg"
            isClearable
            labelPlacement="inside"
          />
          <Input
            labelPlacement="inside"
            size="lg"
            endContent={
              isPasswordVisible ? (
                <EyeOff
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer"
                />
              )
            }
            type={isPasswordVisible ? "text" : "password"}
            label="Password"
          />
        </div>
      </div>

      <div className="relative mx-16 mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button
          radius="full"
          className="w-[57%]"
          startContent={!isLoading && <Icons.Google />}
          onClick={handleLoginWithGoogle}
          isLoading={isLoading}
        >
          Google
        </Button>
      </div>
    </div>
  );
}

"use client";
import Icons from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

type UserAuthFormProps = {
  isSignup?: boolean;
};

export default function UserAuthForm({ isSignup }: UserAuthFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
      // toast.success("Logged in successfully");
    } catch (err) {
      // toast.error("Error logging in");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const hangleLoginWithCredentials = async () => {
    try {
      setIsLoading(true);
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
      toast.success("Logged in successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col place-items-center">
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            isClearable
            labelPlacement="inside"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            labelPlacement="inside"
            endContent={
              isPasswordVisible ? (
                <Eye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer animate-pulse text-danger"
                />
              ) : (
                <EyeOff
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer"
                />
              )
            }
            type={isPasswordVisible ? "text" : "password"}
            label="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {isSignup && (
            <Input
              labelPlacement="inside"
              endContent={
                isConfirmPasswordVisible ? (
                  <Eye
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className="cursor-pointer animate-pulse text-danger"
                  />
                ) : (
                  <EyeOff
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className="cursor-pointer"
                  />
                )
              }
              type={isConfirmPasswordVisible ? "text" : "password"}
              label="Confirm password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
          )}
          <Button
            type="submit"
            color="success"
            variant="solid"
            onClick={hangleLoginWithCredentials}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* <div className="flex justify-between px-4 mt-4">
        <p className="text-center text-sm ">New here?</p>
        <Link
          color="foreground"
          href="/signup"
          className="text-sm underline underline-offset-4"
        >
          Sign in
        </Link>
      </div> */}

      <div className="relative mx-24 md:mx-20 lg:mx-1 mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-stone-300 dark:bg-stone-900 px-2 ">
            continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button
          radius="full"
          className="w-[62%] bg-[#E4E4E7] dark:bg-[#3F3F46]"
          variant="flat"
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

//Third party
import { type Metadata } from "next";
import Image from "next/image";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/link";

import { cn } from "@/lib/utils/ui";
import Logo from "@/assets/images/worlsGlobe.png";
import UserAuthForm from "../_components/UserAuthForm";
import { Divider } from "@nextui-org/divider";

export const metadata: Metadata = {
  title: "Signup",
  description: "Authentication Aapna Adhikar, Create an account",
};

export default function Signup() {
  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src={Logo}
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src={Logo}
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[600px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonStyles({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Aapna Aadhikar
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-md">
                Enter your email below to create your account
              </p>
            </div>
            <p className="px-8 text-center text-md">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                color="foreground"
                className="underline underline-offset-4"
              >
                Terms of Service&nbsp;
              </Link>
              and&nbsp;
              <Link
                href="/privacy"
                color="foreground"
                className="underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div> */}

      <div className="container h-[100vh] items-center justify-center md:grid lg:grid-cols-2">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonStyles({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="sm:hidden md:block h-full relative">
          <div>
            <Image src={Logo} fill alt="logo" />
          </div>
          <div className="absolute z-20 mt-auto bottom-0 pb-3">
            <blockquote className="space-y-2 pl-6">
              <p className="text-lg ">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle mt-12">
          <div className="flex flex-col space-y-2 mb-10 text-center">
            <h1 className="text-4xl font-semibold tracking-tight">
              Create an account
            </h1>
            <span className="text-lg max-w-prose dark:text-zinc-400 text-zinc-500">
              We promise not to spam your email with marketing but keep it safe!
            </span>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </>
  );
}

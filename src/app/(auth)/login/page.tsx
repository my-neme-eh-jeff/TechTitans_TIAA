import UserAuthForm from "../_components/UserAuthForm";

import { Link } from "@nextui-org/link";
import { BadgeIndianRupee } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] ">
        <div className="flex flex-col space-y-2 text-center">
          <BadgeIndianRupee className="mx-auto h-10 w-10" />
          <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
          <p className="text-sm max-w-xs mx-auto">
            By continuing, you are setting up a Breadit account and agree to our
            User Agreement and Privacy Policy.
          </p>
        </div>
        <UserAuthForm />
        <div className="flex justify-between px-4">
          <p className="text-center text-sm text-muted-foreground">
            Here for the first time?
          </p>
          <Link
            href="/sign-in"
            className="hover:text-brand text-sm underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}

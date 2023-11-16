import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { BadgeIndianRupee } from "lucide-react";
import { button as buttonStyles } from "@nextui-org/theme";

import { navLinksForAuth } from "@/components/NavLinks";
import ColorModeSwitchButton from "@/components/ColorModeSwitchButton";
import UserDropdown from "@/components/UserDropdown";
import { getAuthSession } from "@/lib/auth";

export default async function Navbar() {
  const session = await getAuthSession();
  return (
    <NextUINavbar maxWidth="full" position="sticky" aria-selected isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit md:mr-7 lg:mr-10">
          <NextLink className="flex justify-start items-center" href="/">
            <BadgeIndianRupee className="mr-2" />
            <p className="font-bold text-inherit text-lg uppercase">Retiral</p>
          </NextLink>
        </NavbarBrand>

        {navLinksForAuth.map((navbarLink, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              key={navbarLink.title}
              href={navbarLink.href}
            >
              {navbarLink.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          {session?.user ? (
            <UserDropdown />
          ) : (
            <Link href="/login" className={buttonStyles({ variant: "faded" })}>
              Login
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}

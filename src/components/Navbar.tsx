import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { BadgeIndianRupee } from "lucide-react";
import type { Session } from "next-auth";

import UserDropdown from "./UserDropdown";
import ColorModeSwitchButton from "./ColorModeSwitchButton";
import { getAuthSession } from "@/lib/auth";
import {
  navbarLinksForDashboardAdmin,
  navbarLinksForDashboardEmployee,
} from "./NavLinks";

export default async function Navbar() {
  const auth = (await getAuthSession()) as Session;
  return (
    <NextUINavbar maxWidth="full" position="sticky" aria-selected isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit mr-6">
          <NextLink className="flex justify-start items-center" href="/">
            <BadgeIndianRupee className="mr-2" />
            <p className="font-bold text-inherit text-lg uppercase">Retiral</p>
          </NextLink>
        </NavbarBrand>

        {auth.user.role === "companyAdmin" &&
          navbarLinksForDashboardAdmin.map((navbarLink, index) => (
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
        {auth.user.role === "employee" ||
          (auth.user.role === "siteAdmin" &&
            navbarLinksForDashboardEmployee.map((navbarLink, index) => (
              <NavbarItem key={index}>
                <Link
                  color="foreground"
                  key={navbarLink.title}
                  href={navbarLink.href}
                >
                  {navbarLink.title}
                </Link>
              </NavbarItem>
            )))}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem>
          <NavbarMenuToggle />
        </NavbarItem>
        <NavbarItem>
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ColorModeSwitchButton />
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {auth.user.role === "companyAdmin" &&
          navbarLinksForDashboardAdmin.map((navbarLink, index) => (
            <NavbarMenuItem key={`${index}`}>
              <Link href={navbarLink.href} size="lg">
                {navbarLink.title}
              </Link>
            </NavbarMenuItem>
          ))}
        {auth.user.role === "employee" ||
          (auth.user.role === "siteAdmin" &&
            navbarLinksForDashboardEmployee.map((navbarLink, index) => (
              <NavbarMenuItem key={`${index}`}>
                <Link href={navbarLink.href} size="lg">
                  {navbarLink.title}
                </Link>
              </NavbarMenuItem>
            )))}
      </NavbarMenu>
    </NextUINavbar>
  );
}

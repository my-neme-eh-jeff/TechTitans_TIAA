export type NavLinksDisplayedOnHomePage =
  (typeof navbarLinksForHome)[number]["title"];
export const navbarLinksForHome = [
  {
    title: "Home",
    href: "#",
    key: "home",
  },
  {
    title: "About",
    href: "#about",
    key: "about",
  },
  {
    title: "FAQ",
    href: "#faq",
    key: "faq",
  },
  {
    title: "Pricing",
    href: "#pricing",
    key: "pricing",
  },
] as const;

export const navLinksForAuth = [
  {
    title: "About us",
    href: "/about",
  },
];
export type NavbarLinksForAuthType = (typeof navLinksForAuth)[number]["title"];

export const navbarLinksForDashboardAdmin = [
  {
    title: "Case History",
    href: "history",
  },
] as const;
export type NavbarLinksForDashboardAdminType =
  (typeof navbarLinksForDashboardAdmin)[number]["title"];

export const navbarLinksForDashboardEmployee = [
  {
    title: "Case files",
    href: "case-files",
  },
  {
    title: "Documents",
    href: "case-files",
  },
] as const;
export type NavbarLinksForDashboardEmployeeType =
  (typeof navbarLinksForDashboardEmployee)[number]["title"];

export const navLinksForTimepassPages = [
  {
    title: "Retirement Calculator",
    href: "/calculator",
  },
] as const;
export type NavLinksForTimepassPagesType =
  (typeof navLinksForTimepassPages)[number]["title"];

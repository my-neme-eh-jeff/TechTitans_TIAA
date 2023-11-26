//third party
import { Instagram, Twitter, Calculator, Bot, Scale, BarChart3 } from "lucide-react";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";

//components

export default function Footer() {
  const developers = [
    {
      name: "Aman Nambisan",
      linkedin: "https://www.linkedin.com/in/amannambisan/",
    },
    {
      name: "Chaitya Shah",
      linkedin: "https://www.linkedin.com/in/chaitya-shah-381b5421b/",
    },
    {
      name: "Mann Bhanushali",
      linkedin: "https://www.linkedin.com/in/innomer/",
    },
    {
      name: "Paarshva Chitaliya",
      linkedin: "https://www.linkedin.com/in/paarshva-chitaliya/",
    },
  ];
  const pagesForFooter = [
    {
      title: "Retirement Calculator",
      description: "Calculate your retirement corpus",
      icon: <Calculator />,
      href: "/retirement-calculator",
    },
    {
      title: "Financial advice chatbot",
      description: "Get financial advice from our chatbot",
      icon: <Bot />,
      href: "/chatbot",
    },
    {
      title:"Analysics",
      description:"Get insights about how our AI models helped grow various companies",
      icon :<BarChart3 />,
      href:"/analytics"
    }
  ] as const;

  return (
    <footer className="bottom-0 ">
      <div className="relative mt-16 bg-[#797b47] dark:bg-[#292a17]">
        <svg
          className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-[#797b47] dark:text-[#292a17]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            fill="currentColor"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          />
        </svg>
        <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-16 row-gap-10 mb-7 lg:grid-cols-5">
            <div className="md:max-w-md lg:col-span-2">
              <Link
                href="/"
                color="foreground"
                aria-label="Retiral"
                title="home"
                className="inline-flex items-center"
              >
                <Scale />
                <span className="ml-2 text-lg font-bold tracking-tight uppercase">
                  Retiral
                </span>
              </Link>
              <div className="mt-4 lg:max-w-sm">
                <p className="my-4 text-sm">
                  Retiral is a catalyst for financial empowerment, utilizing
                  advanced AI to offer personalized guidance, event
                  affordability analysis, and community-building through user
                  clustering. We champion a future where financial security
                  knows no bounds, extending our commitment to individuals and
                  businesses.
                </p>
                <p className="text-sm ">
                  With Retiral, experience a transformative approach to
                  financial planning that transcends boundaries, fostering a
                  broad societal impact and paving the way for enduring
                  financial well-being.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-3 md:grid-cols-3">
              <div>
                <p className="font-semibold tracking-wide text-teal-accent-400">
                  Development Team
                </p>
                <ul className="mt-2 space-y-2">
                  {developers.map((developer, index) => {
                    return (
                      <li key={index}>
                        <Link
                          key={index}
                          color="foreground"
                          aria-label={developer.name}
                          isExternal
                          href={developer.linkedin}
                          underline="hover"
                        >
                          {developer.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="font-semibold tracking-wide">Pages</p>
                <ul className="mt-2 space-y-2">
                  {pagesForFooter.map((Page, index) => {
                    return (
                      <li className="flex gap-x-3" key={index}>
                        <span>{Page.icon}</span>
                        <Link
                          key={index}
                          color="foreground"
                          href={Page.href}
                          className="transition-colors duration-300 "
                        >
                          {Page.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="font-semibold tracking-wide text-teal-accent-400">
                  Go to
                </p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      href="#hero"
                      color="foreground"
                      className="transition-colors duration-300 "
                    >
                      TOP
                    </Link>
                  </li>
                  <li>
                    <Link
                      color="foreground"
                      href="#about"
                      className="transition-colors duration-300 "
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#faq"
                      color="foreground"
                      className="transition-colors duration-300 "
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      color="foreground"
                      className="transition-colors duration-300 "
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Divider className="mb-4 " />
          <div className="flex flex-col px-3 justify-between sm:flex-row pb-5">
            <p className="text-sm ">
              © Copyright 2023 | Privacy Policy | Terms of Use
            </p>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              <Link
                isExternal
                href=""
                aria-label="Check out our instagram page"
              >
                <Instagram className="dark:text-default-500 text-black hover:text-pink-500 transition-colors " />
              </Link>
              <Link isExternal href="" aria-label="Check out our twitter page">
                <Twitter className="dark:text-default-500 text-black hover:text-blue-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

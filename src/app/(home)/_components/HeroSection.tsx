"use client";

import NextLink from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Divider } from "@nextui-org/divider";

import { cn } from "@/lib/utils/ui";
import GandhiImageLight from "@/assets/images/MahatmaGandhiLight.webp";
import GandhiImageDark from "@/assets/images/MahatmaGandhiDark.webp";
import ActiveSectionWrapper from "./hoc";
import { subtitleVariants, titleVariants } from "@/components/Variants";

function HeroSection() {
  return (
    <>
      <div className="bg-[#fee8c977] absolute -z-10 right-[11rem] transform-gpu -top-4 md:-top-0 h-[20rem] md:h-[31.25rem]  rounded-full blur-[15rem] md:blur-[20rem] lg:blur-[15rem] w-[31.25rem] xl:w-[68.75rem] md:w-[30rem] dark:bg-[#484239]"></div>
      <div className="absolute overflow-hidden md:h-[500px] lg:h-[743px] xl:h-screen -z-10 inset-0  w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_2px),linear-gradient(to_bottom,#80808012_1px,transparent_2px)] bg-[size:24px_24px]"></div>
      <Divider className="hidden md:block md:absolute top-full" />

      <div className="flex flex-col md:flex-row mt-5">
        <div className="lg:max-w-xl my-auto lg:pb-10 md:max-w-sm ml-10 select-none hidden md:flex dark:hidden light:block">
          <Image alt="Gandhi Aesthetic Image" src={GandhiImageLight} priority />
        </div>

        <div className="hidden dark:block">
          <div className="lg:max-w-xl my-auto lg:pb-10 md:max-w-sm ml-10 select-none hidden md:flex ">
            <Image
              alt="Gandhi Aesthetic Image"
              src={GandhiImageDark}
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
            }}
            className="inline-block md:max-w-3xl lg:max-w-6xl text-center justify-center"
          >
            <h1 className={cn(titleVariants(), "block")}>
              Unlocking a potential&nbsp;
            </h1>
            <h1 className={titleVariants({})}>for a&nbsp;</h1>
            <h1 className={titleVariants({ color: "golden" })}>
              Golden retirement&nbsp;
            </h1>
            <br />
            <h1 className={titleVariants()}>using artificial intelligence</h1>
            <motion.h2
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.2,
                delay: 0.1,
              }}
              className={subtitleVariants({ class: "mt-4" })}
            >
              Charting Your Financial Future Using Resilient Retirement Plans &
              Empowering Smart Spending
            </motion.h2>
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.25,
              duration: 0.7,
            }}
          >
            <Link
              as={NextLink}
              about="Find out why you should care about us"
              href={"/analytics"}
              className={buttonStyles({
                color: "success",
                radius: "full",
                variant: "shadow",
              })}
            >
              Get started
            </Link>
            <Link
              as={NextLink}
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href="/about"
            >
              Learn More →
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ActiveSectionWrapper(HeroSection, "Home", 0.6);

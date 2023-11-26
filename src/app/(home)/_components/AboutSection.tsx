"use client";

import ActiveSectionWrapper from "./hoc";
import HowWeWorkSection from "./howWeWorkSection/HowWeWorkSection";

import { Typewriter } from "react-simple-typewriter";
import { motion, useInView, useAnimation, type Variant } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DotLottiePlayer, PlayerEvents } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { Divider, Spinner } from "@nextui-org/react";
import Aos from "aos";

function AboutSection() {
  const [loadingForPiggyBankLottie, setLoadingForPiggyBankLottie] =
    useState(true);
  const [
    loadingForSunflowerMoneyGrowingLottie,
    setLoadingForSunflowerMoneyGrowingLottie,
  ] = useState(true);
  const typeWriterSentaces = [
    "Stressed about your income?",
    "Thinking about saving money?",
  ];
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease", offset: 60 });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-40">
        <div className="flex flex-col md:flex-row align-middle justify-evenly">
          <div
            className="flex place-items-center justify-center align-middle md:mr-16 max-w-md mx-auto md:mx-0 md:max-w-none mb-4 md:mb-0"
            data-aos="zoom-in-right"
            data-aos-delay="300"
          >
            {loadingForPiggyBankLottie && (
              <div>
                <Spinner color="primary" />
              </div>
            )}
            <DotLottiePlayer
              src="/savingMoneyIntoPiggyBank.lottie"
              onEvent={(event: PlayerEvents) => {
                if (event === PlayerEvents.Ready) {
                  setLoadingForPiggyBankLottie(false);
                }
              }}
              autoplay
              loop
            ></DotLottiePlayer>
          </div>

          <div className="flex flex-col my-auto md:w-[750px]">
            <h1
              className="text-3xl md:text-5xl text-center md:text-left"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              Are you ever constantly
              <br />
              <div className="h-[100px] lg:h-[50px]">
                <span className="w-[200px] lg:h-[50px] text-transparent bg-gradient-to-b from-[#712424] to-[#ed0505] bg-clip-text">
                  <Typewriter
                    words={typeWriterSentaces}
                    loop={true}
                    cursor={false}
                    typeSpeed={70}
                    deleteSpeed={40}
                    delaySpeed={1500}
                  />
                </span>
              </div>
            </h1>

            <h2
              data-aos="fade-left"
              data-aos-delay="1200"
              className="text-xl md:text-2xl text-zinc-500 text-center md:text-left"
            >
              We use state of the art AI models to leverage this.
            </h2>
          </div>
        </div>

        <HowWeWorkSection />

        <div className="flex flex-col-reverse md:flex-row justify-evenly align-middle">
          <div className="flex justify-evenly  my-auto text-center md:text-left">
            <AnimatedText
              el="h1"
              text={[
                "We help suggest",
                "the best investment",
                "and money growing options",
              ]}
              className="text-3xl md:text-5xl"
              once
            />
          </div>
          <div className="sm:order-1 md:order-2">
            {loadingForSunflowerMoneyGrowingLottie && (
              <div>
                <Spinner color="primary" />
              </div>
            )}
            <DotLottiePlayer
              src="/sunflowerGrowingMoneyAnimation.lottie"
              onEvent={(event: PlayerEvents) => {
                if (event === PlayerEvents.Ready) {
                  setLoadingForSunflowerMoneyGrowingLottie(false);
                }
              }}
              autoplay
              loop
            ></DotLottiePlayer>
          </div>
        </div>
      </div>

      <div
        className="absolute mt-[28rem] inset-x-0 top-[calc(100%-13rem)] -z-30 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr dark:from-[#432619] from-[#632a2a] dark:to-[#F7921E] to-[#965000] opacity-50 dark:opacity-[0.45] sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <Divider className="mb-24 mt-32" />
    </>
  );
}

type AnimatedTextProps = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once,
  repeatDelay,
  animation = defaultAnimations,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      controls.start("visible");
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default ActiveSectionWrapper(AboutSection, "About", 0.3);

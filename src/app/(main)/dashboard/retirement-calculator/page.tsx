import { Input } from "@nextui-org/input";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Retirement Calculator",
};

export default function ReitrementCalculator() {
  const [salary, setSalary] = useState(0);
  

  return (
    <>
      <div className="w-full flex overflow-hidden">
        <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl sm:px-16 md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center bg-stone-300 dark:bg-stone-900 mx-auto text-left align-bottom transition-all transform group rounded-xl sm:align-middle ">
            <div className="grid grid-cols-2">
              <Input />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

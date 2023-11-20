"use client";
import { ButtonGroup, Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { BarChart } from "./Charts";

export default function CompanyStats() {
  const typesOfRevenue = [
    {
      title: "Total Revenue",
      value: "totalRevenue",
    },
    {
      title: "Revenue From Us",
      value: "revenueFromUs",
    },
    {
      title: "Previous Revenue",
      value: "previousRevenue",
    },
  ] as const;
  const [typeOfRevenue, setTypeOfRevenue] = useState<
    (typeof typesOfRevenue)[number]
  >(typesOfRevenue[0]);

  useEffect(() => {
    console.log(typeOfRevenue);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row">
        <h1 className="text-xl sm:text-2xl md:text-3xl my-auto">
          Heres how our AI models helped grow various companies
        </h1>
        <div className="flex flex-col min-w-[50%]">
          <ButtonGroup>
            {typesOfRevenue.map((type) => (
              <Button
                key={type.value}
                onClick={() => setTypeOfRevenue(type)}
                color={typeOfRevenue === type ? "success" : "default"}
              >
                {type.title}
              </Button>
            ))}
          </ButtonGroup>
          <div className="w-full">
            <BarChart  />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row"></div>
    </div>
  );
}

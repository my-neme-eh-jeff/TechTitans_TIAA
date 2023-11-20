"use client";
import { ButtonGroup, Button } from "@nextui-org/button";
import { Select } from "@nextui-org/react";
import { useState } from "react";
import { BarChart } from "./Charts";

export default function CompanyStats() {
  const typesOfRevenue = ["totalRevenue", "revenueFromUs"] as const;
  const [typeOfRevenue, setTypeOfRevenue] =
    useState<(typeof typesOfRevenue)[number]>("revenueFromUs");

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row">
        <h1 className="text-xl sm:text-2xl md:text-3xl">
          Heres how our AI models helped grow various companies
        </h1>
        <div className="flex flex-col ">
          <ButtonGroup>
            {typesOfRevenue.map((type) => (
              <Button
                key={type}
                onClick={() => setTypeOfRevenue(type)}
                color={typeOfRevenue === type ? "success" : "primary"}
              >
                {type}
              </Button>
            ))}
          </ButtonGroup>
          <div>
            <BarChart />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row"></div>
    </div>
  );
}

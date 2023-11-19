"use client";
import {
  safetyInRetirementOptionsArray,
  typeOfRetirementOptionsArray,
} from "@/lib/db/schema/roleBased";
import { CalculatorSchema } from "@/lib/validators/calculator";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { safeParse } from "valibot";

export default function ReitrementCalculator() {
  const initialData = {
    salary: "",
    workExperience: "",
    age: "",
    goalRetirementAge: "",
    safetyInRetirement: safetyInRetirementOptionsArray,
    typeOfRetirement: typeOfRetirementOptionsArray,
    phone: "",
    totalValuationOfCurrentAssets: "",
    numberOfDependantPeople: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [saveDataOrNot, setSaveDataOrNot] = useState(false);
  const [
    loadingForRetirementFormSubmission,
    setloadingForRetirementFormSubmission,
  ] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    investment: "",
    return: "",
    time: "",
    plan: "",
  });

  const handleChange = (field: keyof typeof initialData, newValue: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: newValue }));
  };

  const handlingCalculatorFormSubmission = async (
    saveDataOrNot: boolean = false
  ) => {
    const isFormDataValid = safeParse(CalculatorSchema, formData);
    if (!isFormDataValid.success) {
      toast.error("Please enter valid data");
      return;
    }

    try {
      setloadingForRetirementFormSubmission(true);
      const SavingToDbPromise = axios.post("/api/retirement-calculator", {
        ...formData,
        saveToProfile: saveDataOrNot,
      });
      const MLPromise = axios.get(
        "https://tiaa.innomer.repl.co/retirement-calculator",
        {
          params: {
            ...formData,
            inflation_rate: 4.7,
            current_age: formData.age,
            currentNetWorth: formData.totalValuationOfCurrentAssets,
            noOfDependents: formData.numberOfDependantPeople,
          },
        }
      );

      console.log(saveDataOrNot);
      if (saveDataOrNot) {
        const LoadingToastForSavingToDbPromise = toast.loading(
          "Please wait saving your data..."
        );
        SavingToDbPromise.then((SavingToDbResponse) => {
          if (SavingToDbResponse.data.success) {
            toast.success("Data submitted successfully");
          } else {
            toast.error("Error saving data");
          }
        })
          .catch((error) => {
            toast.error("Unexpected error saving data");
          })
          .finally(() => {
            toast.dismiss(LoadingToastForSavingToDbPromise);
          });

        const loadingToastForMLPromise = toast.loading(
          "Please wait calculating your plan..."
        );
        MLPromise.then((MLResponse) => {
          if (MLResponse.status === 200) {
            setApiResponse(MLResponse.data);
            toast.success("Ideal retirement plan calculated");
          }
        })
          .catch((error) => {
            toast.error("Unexpected error calculating plan");
          })
          .finally(() => {
            toast.dismiss(loadingToastForMLPromise);
          });
      }

      if (!saveDataOrNot) {
        const loadingToastForMLPromise = toast.loading(
          "Please wait calculating your plan..."
        );
        try {
          const MLResponse = await MLPromise;
          setApiResponse(MLResponse.data);
          toast.success("Ideal retirement plan calculated");
        } catch (err) {
          toast.error("Unexpected error calculating plan");
        } finally {
          toast.dismiss(loadingToastForMLPromise);
        }
      }

      const MLResponseDataContainer = document.getElementById("MLResponseData");
      if (MLResponseDataContainer) {
        MLResponseDataContainer.scrollTo({
          top: MLResponseDataContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch (err) {
      toast.error("Error submitting data");
    } finally {
      setloadingForRetirementFormSubmission(false);
      setSaveDataOrNot(false);
    }
  };

  return (
    <>
      <div className="w-full flex overflow-hidden">
        <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl sm:px-16 md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center p-14 pt-10 bg-stone-300 dark:bg-stone-900 mx-auto text-left align-bottom transition-all transform group rounded-xl sm:align-middle ">
            <h1 className="text-5xl text-center mb-6 dark:from-[#00b7fa] dark:to-[#01cfea] from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
              Enter your data
            </h1>
            <p className="text-lg text-zinc-500">
              Dont worry! Your data is safe with us!
            </p>
            <div className="grid grid-cols-2 gap-5 mb-8">
              <Input
                type="number"
                label="Salary"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
              />
              <Input
                type="number"
                label="Work Experience"
                value={formData.workExperience}
                onChange={(e) => handleChange("workExperience", e.target.value)}
              />
              <Input
                type="number"
                label="Age"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
              <Input
                type="number"
                label="Goal Retirement Age"
                value={formData.goalRetirementAge}
                onChange={(e) =>
                  handleChange("goalRetirementAge", e.target.value)
                }
              />
              <Select
                label="Safety in Retirement"
                value={formData.safetyInRetirement}
                onChange={(e) =>
                  handleChange("safetyInRetirement", e.target.value)
                }
              >
                {safetyInRetirementOptionsArray &&
                  safetyInRetirementOptionsArray.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </Select>
              <Select
                label="Type of Retirement"
                value={formData.typeOfRetirement}
                onChange={(e) =>
                  handleChange("typeOfRetirement", e.target.value)
                }
              >
                {typeOfRetirementOptionsArray.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="number"
                label="Number of Dependant People"
                value={formData.numberOfDependantPeople}
                onChange={(e) =>
                  handleChange("numberOfDependantPeople", e.target.value)
                }
              />
              <Input
                type="number"
                label="Total Asset Valuation"
                value={formData.totalValuationOfCurrentAssets}
                onChange={(e) =>
                  handleChange("totalValuationOfCurrentAssets", e.target.value)
                }
              />
            </div>
            <ButtonGroup radius="full" fullWidth color="success">
              <Button
                type="submit"
                title="This will help group you into forums with like minded people."
                className="border-r-1"
                isLoading={saveDataOrNot && loadingForRetirementFormSubmission}
                onClick={() => {
                  setSaveDataOrNot((prev) => true);
                  handlingCalculatorFormSubmission(true);
                }}
              >
                Save and get results
              </Button>
              <Button
                isLoading={!saveDataOrNot && loadingForRetirementFormSubmission}
                type="submit"
                onClick={() => handlingCalculatorFormSubmission()}
              >
                Get results without saving
              </Button>
            </ButtonGroup>
          </div>
          {apiResponse.plan && (
            <div
              id="MLResponseData"
              className="w-full flex flex-col text-center overflow-hidden mt-32"
            >
              <h1 className="mb-4 w-full text-3xl md:text-4xl lg:text-5xl leading-7 xl:text-7xl font-mono">
                {apiResponse.investment && `Here is your customised plan!`}
              </h1>
              <h1 className="text-2xl md:text-3xl lg:text-4xl leading-7 xl:text-5xl">
                {apiResponse.investment &&
                  "Investment needed" + apiResponse.investment + "₹"}
              </h1>
              <h1 className="text-2xl md:text-3xl lg:text-4xl leading-7 xl:text-5xl">
                {apiResponse.return &&
                  "Return expected" + apiResponse.return + "₹"}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl leading-7 xl:text-5xl">
                {apiResponse.time && "Years:" + apiResponse.time}
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl leading-7 xl:text-5xl">
                {apiResponse.plan && "Detailed Plan:" + apiResponse.plan}
              </h3>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

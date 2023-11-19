"use client";
import { InsertEmployeeSchema } from "@/lib/validators/employee";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { safeParse } from "valibot";

export default function EmployeeForm() {
  const initialData = {
    position: "",
    department: "",
    phoneNumber: "",
    location: "",
    companyName: "",
  };
  const [autoCompleteData, setAutoCompleteData] = useState<Array<string>>([]);
  const [employeeFormLoading, setEmployeeFormLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const handleChange = (field: keyof typeof initialData, newValue: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: newValue }));
  };
  const handlingEmployeeFormSubmission = async () => {
    const isFormDataValid = safeParse(InsertEmployeeSchema, {
      formData,
    });
    if (!isFormDataValid) {
      toast.error("Please fill all the fields");
      return;
    }
    const resp = await axios.post("/api/employee-verification", formData);
    if (resp.data.success) {
      toast.success("Employee data saved successfully");
    } else {
      toast.error("Employee data not saved");
    }
  };

  useEffect(() => {
    async function getCompanyData() {
      try {
        const resp = await axios.get("/api/get-company-data");
        setAutoCompleteData(resp.data.data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
    getCompanyData();
  }, []);

  return (
    <>
      <div className="w-full mb-8">
        <Autocomplete
          fullWidth
          required
          className="mx-auto"
          labelPlacement="outside"
          label="Compnay name"
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        >
          {autoCompleteData.map((item) => (
            <AutocompleteItem key={item} value={item}>
              {item}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <Input
          label="Department"
          value={formData.department}
          onChange={(e) => handleChange("department", e.target.value)}
        />
        <Input
          label="Position"
          required
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
        />
        <Input
          label="PhoneNumber"
          value={formData.department}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
        <Input
          label="Location"
          required
          value={formData.department}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="flex justify-center mt-5">
        <Button
          type="submit"
          color="success"
          className="w-[75%] flex"
          isLoading={employeeFormLoading}
          onClick={handlingEmployeeFormSubmission}
        >
          Save and get results
        </Button>
      </div>
    </>
  );
}

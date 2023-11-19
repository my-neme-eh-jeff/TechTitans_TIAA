//lazy load the components
//firstly check is company is associated with the person
//seconds if not then ask them to associate it.
//then wait till the compan admin accepts it for the person
//then show stats

import dynamic from "next/dynamic";
import { getAuthSession } from "@/lib/auth";
import { Spinner } from "@nextui-org/react";
import type { Session } from "next-auth";
const CompanyAdminDashboard = dynamic(
  () => import("./_components/companyAdmin"),
  {
    loading: () => (
      <div className="flex justify-center align-middle ">
        <Spinner color="primary" />
      </div>
    ),
    ssr: false,
  }
);
const EmployeeDashboard = dynamic(
  () => import("./_components/employee/Employee"),
  {
    loading: () => (
      <div className="flex justify-center align-middle ">
        <Spinner color="primary" />
      </div>
    ),
  }
);

export default async function Dashboard() {
  const session = (await getAuthSession()) as Session;
  console.log(session.user.role);

  return session.user.role === "employee" ? (
    <EmployeeDashboard />
  ) : (
    <CompanyAdminDashboard />
  );
}

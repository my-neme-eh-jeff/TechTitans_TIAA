// import dynamic from "next/dynamic";
import { getAuthSession } from "@/lib/auth";
// import { Spinner } from "@nextui-org/react";
import type { Session } from "next-auth";
import CompanyAdminDashboard from "./_components/companyAdmin";
import EmployeeDashboard from "./_components/employee";
import SiteAdminDashboard from "./_components/siteAdmin";

// const CompanyAdminDashboard = dynamic(
//   () => import("./_components/companyAdmin"),
//   {
//     loading: () => (
//       <div className="flex justify-center align-middle ">
//         <Spinner color="primary" />
//       </div>
//     ),
//     ssr: false,
//   }
// );
// const EmployeeDashboard = dynamic(
//   () => import("./_components/employee/Employee"),
//   {
//     loading: () => (
//       <div className="flex justify-center align-middle ">
//         <Spinner color="primary" />
//       </div>
//     ),
//   }
// );

export default async function Dashboard() {
  const session = (await getAuthSession()) as Session;

  return session.user.role === "employee" ? (
    <EmployeeDashboard />
  ) : session.user.role === "companyAdmin" ? (
    <div className="p-12 mt-4">
      <CompanyAdminDashboard />
    </div>
  ) : (
    <SiteAdminDashboard />
  );
}

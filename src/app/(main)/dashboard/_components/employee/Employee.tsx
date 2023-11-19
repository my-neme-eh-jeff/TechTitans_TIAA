import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/roleBased";
import { employee } from "@/lib/db/schema/roleBased/employees";
import { eq } from "drizzle-orm";
import type { Session } from "next-auth";
import EmployeeForm from "./EmployeeForm";
import CompanyStats from "../charts";

export default async function EmployeeDashboard() {
  const session = (await getAuthSession()) as Session;
  const Currentemployee = (
    await db.select().from(employee).where(eq(employee.userId, session.user.id))
  )[0];

  return !Currentemployee?.id ? (
    <div className="w-full flex overflow-hidden">
      <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl sm:px-16 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center p-14 pt-10 bg-stone-300 dark:bg-stone-900 mx-auto text-left align-bottom transition-all transform group rounded-xl sm:align-middle ">
          <h1 className="text-5xl text-center mb-6 dark:from-[#00b7fa] dark:to-[#01cfea] from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
            Lets connect you with your company!
          </h1>
          <EmployeeForm />
        </div>
      </section>
    </div>
  ) : (
    <CompanyStats />
  );
}

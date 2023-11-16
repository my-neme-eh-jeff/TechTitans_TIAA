import { Navbar } from "./_components/navbar/Navbar";
import Footer from "@/app/(home)/_components/footer";
import ActiveSectionProvider from "@/providers/ActiveSectionProvider";
import "aos/dist/aos.css";
import { Cmdk } from "./_components/navbar/cmdk";
import { GeistSans } from "geist/font/sans";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={GeistSans.className}>
        <ActiveSectionProvider>
          <Navbar />
          <Cmdk />
          <main className="mt-16">{children}</main>
        </ActiveSectionProvider>
        <Footer />
      </div>
    </>
  );
}

import Footer from "@/components/Footer";
import Footerr from "@/components/Footerr";

import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // const loggedIn = {firstName  : 'Shivam' , lastName : 'Kalani'};
    // making hereader relative now should change later if code breaks
  return (
    <div className="flex flex-col font-inter container-whole ">
      {/* min-h-screen...might include later in the div */}
      <header className="">
        <Navbar />
      </header>

        {children}
        <Toaster  />
        <Footerr />
    </div>
  );
}

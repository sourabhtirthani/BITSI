import Footer from "@/components/Footer";
import Footerr from "@/components/Footerr";

import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import AiChatButton from "@/components/AiChatButton";
import SignupPopup from "@/components/SignupPopup";
// import Hero from "@/components/Hero";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return (
    <div className="flex flex-col font-inter">
    <div className="flex flex-col font-inter container-whole ">
      <header className="">
        <Navbar />
        {/* <Hero /> */}
      </header>
      {/* min-h-screen...might include later in the div */}
      <SignupPopup />
        {children}
        <Toaster  />
        <AiChatButton />
    </div>
        <Footerr />
    </div>
  );
}

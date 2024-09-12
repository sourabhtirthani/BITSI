
import FooterAdmin from "@/components/FooterAdmin";
import Footerr from "@/components/Footerr";
import Sidebar from "@/components/Sidebar";
import SidebarAdminMob from "@/components/SidebarAdminMob";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex flex-col overflow-hidden container-whole">
      <div className="flex bg-success-503 ">
        <Sidebar />
        <div className="sm:hidden absolute">
          <SidebarAdminMob />
        </div>
        {/* <div className=" w-full "> */}
          {children}
          {/* </div> */}
      </div>
      <Toaster  />
      <FooterAdmin />
      </div>
      
    //   <div className="flex flex-col min-h-screen">
    //   <div className="flex flex-1 bg-success-503">
    //     <Sidebar  />
    //     <div className="flex-1 overflow-auto">
    //       {children}
    //     </div>
    //   </div>
    //   <Footer  />
    // </div>
    );
  }
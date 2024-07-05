
import FooterAdmin from "@/components/FooterAdmin";
import Footerr from "@/components/Footerr";
import Sidebar from "@/components/Sidebar";
import SidebarAdminMob from "@/components/SidebarAdminMob";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex flex-col overflow-hidden ">
      <div className="flex bg-success-503 ">
        <Sidebar />
        <div className="md:hidden absolute">
          <SidebarAdminMob />
        </div>
          {children}
      </div>
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
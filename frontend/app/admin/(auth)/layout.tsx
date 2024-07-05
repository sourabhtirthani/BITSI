
import FooterAdmin from "@/components/FooterAdmin";
import Footerr from "@/components/Footerr";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col items-center  overflow-hidden h-screen w-screen bg-success-503">
            <div className="mt-4 max-md:mt-2">
                <Image src='icons/bitsi.svg' height={209} width={212} alt='bitsi' /></div>
            {children}
        </div>


    );
}
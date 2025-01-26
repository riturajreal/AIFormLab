import { SignedIn} from "@clerk/nextjs";    
import React from "react";
import SideNav from "./_components/SideNav";

const DashboardLayout = ({ children }) => {
    return (
        <SignedIn>
            <div className="flex pt-20 bg-black min-h-screen">
                <div className="md:w-64 fixed">
                    <SideNav />
                </div>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </SignedIn>
    );
};

export default DashboardLayout;
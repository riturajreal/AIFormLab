"use client";
import { SignedIn } from "@clerk/nextjs";
import SideNav from "./_components/SideNav";
import React, { useState } from "react";
import Header from "../_components/Header";

const DashboardLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <SignedIn>
      <div className="min-h-screen pt-[70px]">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {/* Sidebar with overlay for mobile */}
        <div
          className={`
          fixed inset-0 bg-black/50 z-40 md:hidden
          ${showSidebar ? "block" : "hidden"}
        `}
          onClick={() => setShowSidebar(false)}
        />

        <div
          className={`
          fixed z-40 w-full md:w-64 h-full transition-transform duration-200 ease-in-out
          md:translate-x-0 md:z-0
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <SideNav />
        </div>

        <div className="md:ml-64 p-4">{children}</div>
      </div>
    </SignedIn>
  );
};

export default DashboardLayout;

"use client";
import React from "react";
import SideNav from "@/components/SideNav";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between md:justify-start h-screen">
      <SideNav />
      {children}
    </div>
  );
}

export default MainLayout;

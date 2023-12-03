"use client";
import React from "react";
import Image from "next/image";

function PublicLaypout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">{children}</div>
      <img
        src="/assets/images/side-img.svg"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </div>
  );
}

export default PublicLaypout;

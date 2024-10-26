import Link from "next/link";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
const Header = ({children, className}: HeaderProps ) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="flex">
      
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 "
        />
        <p className="text-lg mt-1 text-gray-300">NovaDocs</p>
      </Link>
      {children}
    </div>
  );
};

export default Header;

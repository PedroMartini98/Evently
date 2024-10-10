"use client";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavMenu = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-row md:flex-between flex flex-col gap-5  w-full items-start">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap `}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavMenu;

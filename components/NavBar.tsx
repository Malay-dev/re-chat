"use client";
import React from "react";
import { useState } from "react";
import useRoutes from "@/hooks/useRoutes";
import NavItem from "./NavItem";
const NavBar = () => {
  const routes = useRoutes();
  console.log(routes);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <>
        <nav className=" hidden md:flex gap-2 text-lg font-medium">
          {routes.map((item) => (
            <NavItem
              key={item.label}
              href={item.href}
              active={item.active}
              label={item.label}
              icon={item.icon}
              onClick={item?.onClick}></NavItem>
          ))}
        </nav>
        <div className="mt-auto"></div>
      </>
    </header>
  );
};

export default NavBar;

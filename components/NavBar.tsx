"use client";
import React from "react";
import { useState } from "react";
import useRoutes from "@/hooks/useRoutes";
import NavItem from "./NavItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

interface NavBarProps {
  currentUser: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  console.log(routes);
  console.log(currentUser);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="hidden md:flex justify-between h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
      </>
      <Avatar className="hidden md:block">
        <AvatarImage src={currentUser?.image as string} alt="@shadcn" />
        <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default NavBar;

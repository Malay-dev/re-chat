"use client";

import { useState } from "react";
import useRoutes from "@/hooks/useRoutes";
import MobileNavItem from "./MobileNavItem";
export default function Component() {
  const [activeTab, setActiveTab] = useState("home");
  const routes = useRoutes();
  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full bg-background shadow-lg md:hidden">
      <div className="grid grid-cols-3 h-14 w-full  items-center  place-content-center ">
        {routes.map((item) => (
          <MobileNavItem
            key={item.label}
            href={item.href}
            label={item.label}
            onClick={item.onClick}
            active={item.active}
            icon={item.icon}
          />
        ))}
      </div>
    </nav>
  );
}

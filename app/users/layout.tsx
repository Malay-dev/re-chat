import React from "react";

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import MobileNav from "@/components/MobileNav";
import getCurrentUser from "../actions/getCurrentUser";

interface UsersChildren {
  children: React.ReactNode;
}

const UsersLayout = async ({ children }: UsersChildren) => {
  const user = await getCurrentUser();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar></SideBar>
      <div className="flex flex-col">
        <NavBar currentUser={user!}></NavBar>
        {children}
        <MobileNav currentUser={user!}></MobileNav>
      </div>
    </div>
  );
};

export default UsersLayout;

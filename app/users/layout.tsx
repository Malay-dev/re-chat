import React from "react";

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import MobileNav from "@/components/MobileNav";
import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";

interface UsersChildren {
  children: React.ReactNode;
}

const UsersLayout = async ({ children }: UsersChildren) => {
  const user = await getCurrentUser();
  const users = await getUsers();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar users={users}></SideBar>
      <div className="hidden md:flex flex-col">
        <NavBar currentUser={user!}></NavBar>
        {children}
      </div>
      <MobileNav currentUser={user!}></MobileNav>
    </div>
  );
};

export default UsersLayout;

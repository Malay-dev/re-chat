import React from "react";

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import MobileNav from "@/components/MobileNav";
import getCurrentUser from "../actions/getCurrentUser";
import getConversations from "../actions/getConversations";

interface ConversationChildren {
  children: React.ReactNode;
}

const ConversationLayout = async ({ children }: ConversationChildren) => {
  const conversations = await getConversations();
  const user = await getCurrentUser();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar listType="conversations" data={conversations} className={""} />
      <div className="hidden md:flex flex-col">
        <NavBar currentUser={user!}></NavBar>
        {children}
      </div>
      <MobileNav currentUser={user!}></MobileNav>
    </div>
  );
};

export default ConversationLayout;

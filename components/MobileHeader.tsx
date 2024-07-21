"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import ProfileDrawer from "./ProfileDrawer";

interface MobileHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}></ProfileDrawer>
      <header className=" md:hidden flex h-14 items-center justify-between gap-2 shadow-sm border-b bg-inherit ">
        <div className=" md:hidden flex items-center gap-2 ">
          <Button variant={"ghost"} size={"icon"}>
            <Link href={"/conversations"}>
              <Icons.chevronLeft></Icons.chevronLeft>
            </Link>
          </Button>
          <Avatar className="block">
            <AvatarImage
              src={otherUser?.image || "https://avatar.iran.liara.run/public"}
              alt={conversation?.name || otherUser?.name || "User"}
            />
            <AvatarFallback>
              {conversation?.name || otherUser?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {conversation?.name || otherUser?.name}
            </span>
            <div className="text-sm text-muted-foreground md:inline">
              {statusText}
            </div>
          </div>
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setDrawerOpen(true)}>
          <Icons.ellipsis></Icons.ellipsis>
        </Button>
      </header>
    </>
  );
};

export default MobileHeader;

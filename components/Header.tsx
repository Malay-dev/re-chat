"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import React, { useMemo } from "react";
import Link from "next/link";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <header className=" hidden md:flex  justify-between h-14 items-center gap-4 shadow-sm border-b bg-inherit px-4 lg:h-[60px] lg:px-6">
      <div className=" hidden md:flex items-center gap-2 ">
        <Button variant={"ghost"}>
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
          <div className="hidden text-sm text-muted-foreground md:inline">
            {statusText}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

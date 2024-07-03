import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Conversation, User } from "@prisma/client";
import UserList from "./UserList";
import ConversationList from "./ConversationList";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";

interface SideBarProps {
  className: string;
  listType: "users" | "conversations";
  data: User[] | FullConversationType[] | [];
}

const SideBar: React.FC<SideBarProps> = ({ listType, data, className }) => {
  return (
    <div className={clsx("border-r bg-muted/40", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              alt="re-chat-logo"
              height={24}
              width={24}
              src={"/images/logo_short.png"}></Image>
            <span className="">Re-Chat</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        {listType === "users" ? (
          <UserList users={data as User[]} />
        ) : (
          <ConversationList initalItems={data as FullConversationType[]} />
        )}
        <div className="mt-auto p-4"></div>
      </div>
    </div>
  );
};

export default SideBar;

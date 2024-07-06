import React from "react";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, User, Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/hooks/useOtherUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { TableCell, TableRow } from "./ui/table";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick1 = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data?.id, router]);
  const handleClick2 = useCallback(() => {
    router.push(`/conversation/${data.id}`);
  }, [data?.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <>
      <TableRow
        onClick={handleClick1}
        className={clsx("cursor-pointer hidden sm:block", selected && `bg-gray-200`)}>
        <TableCell>
          <div className="flex items-center justify-between gap-2">
            <Avatar className="block">
              <AvatarImage
                src={otherUser?.image || "https://avatar.iran.liara.run/public"}
                alt={otherUser?.name || "User"}
              />
              <AvatarFallback> {otherUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center justify-between w-full gap-10">
                <span className="font-medium">
                  {data?.name || otherUser?.name}
                </span>
                {lastMessage?.createdAt && (
                  <span className="text-xs text-muted-foreground md:inline">
                    {format(new Date(lastMessage?.createdAt), "p")}
                  </span>
                )}
              </div>
              <div
                className={clsx(
                  `text-sm font-normal truncate md:inline`,
                  hasSeen ? "text-muted-foreground" : "text-primary"
                )}>
                {lastMessageText}
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow
        onClick={handleClick2}
        className={clsx("cursor-pointer md:hidden block", selected && `bg-gray-200`)}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Avatar className="block">
              <AvatarImage
                src={otherUser?.image || "https://avatar.iran.liara.run/public"}
                alt={otherUser?.name || "User"}
              />
              <AvatarFallback> {otherUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-10">
                <span className="font-medium">
                  {data?.name || otherUser?.name}
                </span>
                {lastMessage?.createdAt && (
                  <span className="text-xs text-muted-foreground md:inline">
                    {format(new Date(lastMessage?.createdAt), "p")}
                  </span>
                )}
              </div>
              <div
                className={clsx(
                  `text-sm font-normal truncate md:inline`,
                  hasSeen ? "text-muted-foreground" : "text-primary"
                )}>
                {lastMessageText}
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ConversationBox;

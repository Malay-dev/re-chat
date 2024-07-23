"use client";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Icons } from "./Icons";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find, remove } from "lodash";

interface ConversationListProps {
  initalItems: FullConversationType[];
  users: User[];
}
const ConversationList: React.FC<ConversationListProps> = ({
  initalItems,
  users,
}) => {
  const session = useSession();
  const [items, setItems] = useState(initalItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    pusherClient.subscribe(pusherKey);
    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };
    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey]);

  const { conversationId, isOpen } = useConversation();
  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}></GroupChatModal>
      <div className="flex-1">
        <div className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead className="flex items-center justify-between">
                  <span>Messages</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setIsModalOpen(true)}>
                          <Icons.userPlus></Icons.userPlus>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create Group</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items &&
                items.map((item) => (
                  <ConversationBox
                    key={item.id}
                    data={item}
                    selected={conversationId === item.id}></ConversationBox>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ConversationList;

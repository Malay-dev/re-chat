"use client";
import React from "react";
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

interface ConversationListProps {
  initalItems: FullConversationType[];
  users: User[];
}
const ConversationList: React.FC<ConversationListProps> = ({
  initalItems,
  users,
}) => {
  const [items, setItems] = useState(initalItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
              {initalItems &&
                initalItems.map((item) => (
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

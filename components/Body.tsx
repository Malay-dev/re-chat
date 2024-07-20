"use client";

import { FullMessageType } from "@/app/types";
import useConversation from "@/hooks/useConversation";
import React, { useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  return (
    <div className="flex-1 ">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          data={message}
          key={message.id}></MessageBox>
      ))}
      <div ref={bottomRef} className="pt-24"></div>
    </div>
  );
};

export default Body;

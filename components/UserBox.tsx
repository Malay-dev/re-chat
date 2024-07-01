"use client";

import React, { useCallback } from "react";
import { useState } from "react";
import { User } from "@prisma/client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserBoxProps {
  data: User;
}
const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversation/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div onClick={handleClick} className="flex items-center gap-2">
      <Avatar className="block">
        <AvatarImage
          src={data?.image || "https://avatar.iran.liara.run/public"}
          alt={data?.name || "User"}
        />
        <AvatarFallback> {data?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{data?.name}</span>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {data?.email}
        </div>
      </div>
    </div>
  );
};

export default UserBox;

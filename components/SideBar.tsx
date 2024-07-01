import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface SideBarProps {
  users: User[];
}

const SideBar: React.FC<SideBarProps> = ({ users }) => {
  console.log(users);
  return (
    <div className="border-r bg-muted/40 md:block">
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
        <div className="flex-1">
          <div className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>People</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <UserBox data={item}></UserBox>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-auto p-4"></div>
      </div>
    </div>
  );
};

export default SideBar;

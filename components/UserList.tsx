import { User } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import UserBox from "./UserBox";

interface UserListProps {
  users?: User[];
}
const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="flex-1">
      <div className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>People</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((item) => (
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
  );
};

export default UserList;

"use client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import Modal from "./Modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge"; // Assumes you have a Badge component for displaying chips

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  members: z.array(z.string()).min(1, "At least one member is required"),
});

const GroupChatModal: React.FC<ModalProps> = ({ isOpen, onClose, users }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { ...values, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2
                className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              ">
                Create a group chat
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Create a chat with more than 2 people.
              </p>
              <div className="mt-10 flex flex-col gap-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          id="name"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="members">Members</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const newMembers = [...field.value];
                          if (!newMembers.includes(value)) {
                            newMembers.push(value);
                          }
                          form.setValue("members", newMembers, {
                            shouldValidate: true,
                          });
                        }}
                        value="">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select members" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((memberId: string) => {
                          const member = users.find(
                            (user) => user.id === memberId
                          );
                          return (
                            <Badge
                              key={memberId}
                              onClose={() => {
                                const newMembers = field.value.filter(
                                  (id: string) => id !== memberId
                                );
                                form.setValue("members", newMembers, {
                                  shouldValidate: true,
                                });
                              }}>
                              {member?.name}
                            </Badge>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              disabled={isLoading}
              onClick={onClose}
              type="button"
              variant={"secondary"}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default GroupChatModal;

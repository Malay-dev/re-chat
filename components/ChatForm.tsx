"use client";
import useConversation from "@/hooks/useConversation";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Icons } from "./Icons";

import { CldUploadButton } from "next-cloudinary";

const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(100, "Message is too long"),
});

const ChatForm = () => {
  const { conversationId } = useConversation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios
      .post("/api/messages", { ...values, conversationId })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
    console.log(values);
  };

  const handleUpload = (result: any) => {
    console.log(result);
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId,
    });
  };
  return (
    <div className="bottom-0">
      <TooltipProvider>
        <Form {...form}>
          <form
            className="relative overflow-hidden  border-t bg-background focus-within:ring-1 focus-within:ring-ring"
            x-chunk="dashboard-03-chunk-1"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }: any) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="message" className="sr-only">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="message"
                      placeholder="Type your message here..."
                      className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="px-2"></FormMessage>
                </FormItem>
              )}></FormField>
            <div className="flex items-center p-3 pt-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="re-chat-image-upload">
                    <Icons.imagePlus className="size-4" />
                    <span className="sr-only">Attach Image</span>
                  </CldUploadButton>
                </TooltipTrigger>
                <TooltipContent side="top">Attach Image</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Mic className="size-4" />
                    <span className="sr-only">Use Microphone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
              </Tooltip>
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </Form>
      </TooltipProvider>
    </div>
  );
};

export default ChatForm;

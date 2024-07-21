import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@prisma/client";

import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { Input } from "./ui/input";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

interface SettingsModalProps {
  children?: React.ReactNode;
  currentUser: User;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string().url().optional(),
});

const SettingsModal: React.FC<SettingsModalProps> = ({
  children,
  currentUser,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(currentUser, "&TEST_CURRENT_USER");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name || " ",
      email: currentUser?.email || undefined,
      image: currentUser?.image || undefined,
    },
  });
  const image = form.watch("image");

  const handleUpload = (result: any) => {
    form.setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    axios
      .post("/api/settings", values)
      .then(() => {
        router.refresh();
        // onClose();
      })
      .catch(() =>
        toast({ variant: "destructive", title: "Something went wrong!" })
      )
      .finally(() => setIsLoading(false));
  };
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger className="cursor-pointer" asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Profile</DrawerTitle>
            <DrawerDescription>Edit your public profile</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }: any) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Max"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}></FormField>

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }: any) => (
                      <FormItem className="mt-2 grid gap-2">
                        <FormLabel htmlFor="image">Profile Picture</FormLabel>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Image
                              src={
                                image ||
                                currentUser?.image ||
                                "/images/placeholder.jpg"
                              }
                              alt="Avatar"
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                            <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full w-4 h-4 bg-primary text-primary-foreground">
                              <PlusIcon className="w-3 h-3" />
                            </div>
                          </div>
                          <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onUpload={handleUpload}
                            uploadPreset="re-chat-image-upload">
                            <Button variant="secondary" disabled={isLoading}>
                              Change
                            </Button>
                          </CldUploadButton>
                        </div>
                      </FormItem>
                    )}></FormField>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsModal;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/Icons";

const formSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password must have 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(values);
  };
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-nowrap text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }: any) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="first-name">First name</FormLabel>
                      <FormControl>
                        <Input
                          id="first-name"
                          placeholder="Max"
                          required
                          {...field}
                          disabled={isLoading || isGithubLoading}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}></FormField>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }: any) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="last-name">Last name</FormLabel>
                      <FormControl>
                        <Input
                          id="last-name"
                          placeholder="Robinson"
                          required
                          {...field}
                          disabled={isLoading || isGithubLoading}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}></FormField>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }: any) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        disabled={isLoading || isGithubLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }: any) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        required
                        disabled={isLoading || isGithubLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}></FormField>
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }: any) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="confirm_password">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="confirm_password"
                        type="password"
                        required
                        disabled={isLoading || isGithubLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}></FormField>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create an account
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading || isGithubLoading}>
                {isGithubLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up with GitHub
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

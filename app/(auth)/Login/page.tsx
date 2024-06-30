"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
import { Icons } from "@/components/Icons";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must have 8 characters"),
});

export default function Login() {
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("Authenticated");
      router.push("/users");
    }
  }, [session?.status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Invalid Credentials",
          });
        }
        if (callback?.ok && !callback?.error) {
          toast({
            description: "Logged in!",
          });
          router.push("/users");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(values);
  };

  const onGithub = () => {
    setIsGithubLoading(true);
    signIn("github", { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Invalid Credentials",
          });
        }
        if (callback?.ok && !callback?.error) {
          toast({
            description: "Logged in!",
          });
          router.push("/users");
        }
      })
      .finally(() => {
        setIsGithubLoading(false);
      });
  };

  const onGoogle = () => {
    setIsGoogleLoading(true);
    signIn("google", { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Invalid Credentials",
          });
        }
        if (callback?.ok && !callback?.error) {
          toast({
            description: "Logged in!",
          });
          router.push("/users");
        }
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-nowrap text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
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
                        disabled={
                          isLoading || isGithubLoading || isGoogleLoading
                        }
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
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        disabled={
                          isLoading || isGithubLoading || isGoogleLoading
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}></FormField>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || isGithubLoading || isGoogleLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading || isGithubLoading || isGoogleLoading}
                onClick={() => onGithub()}>
                {isGithubLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Icons.gitHub
                  className="mr-2 h-4 w-4 "
                  size={"sm"}></Icons.gitHub>
                Login with Github
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={isLoading || isGithubLoading || isGoogleLoading}
                onClick={() => onGoogle()}>
                {isGoogleLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Icons.google
                  className="mr-2 h-4 w-4 "
                  size={"sm"}></Icons.google>
                Login with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

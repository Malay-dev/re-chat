"use client";

import clsx from "clsx";

import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/EmptyState";

import React from "react";

export default function Home() {
  return (
    <main className="hidden md:flex md:flex-1 md:flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <EmptyState></EmptyState>
    </main>
  );
}

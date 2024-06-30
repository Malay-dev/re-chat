"use client";
import React from "react";
import { signOut } from "next-auth/react";
const page = () => {
  return (
    <div>
      page
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default page;

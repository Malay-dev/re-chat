import React from "react";

const EmptyState = () => {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">Your Chats</h3>
        <p className="text-sm text-muted-foreground">
          Select a chat or start a new conversation
        </p>
      </div>
    </div>
  );
};

export default EmptyState;

"use client";
import useConversation from "@/hooks/useConversation";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import axios from "axios";
import { useToast } from "./ui/use-toast";
import Modal from "./Modal";
import { Icons } from "./Icons";
import { DialogTitle } from "@headlessui/react";
import { Button } from "./ui/button";

interface ConfirmModelOpen {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ConfirmModel: React.FC<ConfirmModelOpen> = ({
  isOpen,
  onClose,
  children,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() =>
        toast({ variant: "destructive", title: "Something went wrong" })
      )
      .finally(() => setIsLoading(false));
  }, [onClose, router, conversationId, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <Icons.warning className="h-6 w-6 text-red-600"></Icons.warning>
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900">
            Delete Chat
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button variant={"ghost"} disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModel;

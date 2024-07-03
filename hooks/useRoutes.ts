import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/Icons";
import useConversation from "./useConversation";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: Icons.messageSquareMore,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: Icons.users,
        active: pathname === "/users",
      },
      {
        label: "Log Out",
        href: "#",
        icon: Icons.logOut,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;

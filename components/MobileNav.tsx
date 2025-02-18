"use client";

import useRoutes from "@/hooks/useRoutes";
import MobileNavItem from "./MobileNavItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import SettingsModal from "./SettingsModal";

interface NavBarProps {
  currentUser: User;
}
const Component: React.FC<NavBarProps> = ({ currentUser }) => {
  const routes = useRoutes();

  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full bg-background shadow-lg md:hidden">
      <div className="flex items-center">
        <div className="grid grid-cols-4 h-14 w-full place-content-center ">
          <SettingsModal currentUser={currentUser}>
            <Avatar className="place-self-center cursor-pointer">
              <AvatarImage src={currentUser?.image as string} alt="@shadcn" />
              <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </SettingsModal>
          {routes.map((item) => (
            <MobileNavItem
              key={item.label}
              href={item.href}
              label={item.label}
              onClick={item.onClick}
              active={item.active}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Component;

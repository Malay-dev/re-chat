import React from "react";
import Link from "next/link";
import clsx from "clsx";
interface NavItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileNavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `${
          active
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`,
        active && `bg-gray-200 text-primary rounded-sm `
      )}>
      <Link
        href={href}
        className={`grid grid-rows-2 place-items-center justify-center transition-colors `}>
        <Icon className="h-6 w-6" />
        <span className="text-xs font-medium">{label}</span>
      </Link>
    </div>
  );
};

export default MobileNavItem;

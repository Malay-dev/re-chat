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
      className={clsx(active && `bg-gray-200 text-black rounded-sm py-1`)}>
      <Link
        href={href}
        className={`flex flex-col items-center justify-center gap-1 transition-colors ${
          active
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}>
        <Icon className="h-6 w-6" />
        <span className="text-xs font-medium">{label}</span>
      </Link>
    </div>
  );
};

export default MobileNavItem;

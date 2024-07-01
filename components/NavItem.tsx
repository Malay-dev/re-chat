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

const NavItem: React.FC<NavItemProps> = ({
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
      className="text-sm font-medium  text-muted-foreground "
      onClick={handleClick}>
      <div className={clsx(active && `bg-gray-200 text-black rounded-md`)}>
        <Link
          href={href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
          <Icon />
          <span className="">{label}</span>
        </Link>
      </div>
    </div>
  );
};

export default NavItem;

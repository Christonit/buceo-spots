"use client";
import { signOut, useSession } from "next-auth/react";
import cx from "classnames";
import { usePathname } from "next/navigation";
import { MdOutlineAttachMoney, MdOutlineTrendingUp } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa6";
import { FiHelpCircle, FiUser, FiLogOut } from "react-icons/fi";
import { GlobalContext } from "@/context";
import { useContext } from "react";
const nav_links: { title: string; href: string; icon?: React.ReactElement }[] =
  [
    {
      title: "Contributions",
      href: "/",
      icon: <MdOutlineTrendingUp size={20} />,
    },
    {
      title: "Funding Sources",
      href: "/#",
      icon: <MdOutlineAttachMoney size={20} />,
    },
    {
      title: "Rollovers",
      href: "/#",
      icon: <FaRegCircle size={16} />,
    },
  ];
const settings_links: {
  title: string;
  href: string;
  icon?: React.ReactElement;
}[] = [
  {
    title: "Profile",
    href: "/#",
    icon: <FiUser size={20} />,
  },
  {
    title: "Help",
    href: "/#",
    icon: <FiHelpCircle size={20} />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useContext(GlobalContext) || {};

  if (["/signin", "/signup", "/contributions/checkout"].includes(pathname!))
    return <></>;

  if (!user) return <></>;

  return (
    <header className="px-[16px]">
      <div className="container mx-auto py-[16px] flex justify-between">
        <span className="text-lg font-bold">BuceoSpots</span>
      </div>
    </header>
  );
}

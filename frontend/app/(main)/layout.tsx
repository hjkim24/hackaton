//하단배너
// app/(client)/layout.tsx

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiUserCircle } from "react-icons/hi2";
import { cn } from "../libs/utils";
import { CiChat1 } from "react-icons/ci";


export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCurrentTab = (tab: string) => {
    if (tab === "") {
      return pathname === "/";
    }
    return pathname.startsWith(`/${tab}`);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <main className="flex-grow mb-16">{children}</main>

      {/* 하단 네비게이션 */}
      <nav className="fixed left-0 h-16 bottom-0 w-full bg-white flex justify-around items-center shadow-2xl">
        <Link href="/">
          <GrHomeRounded
            className={cn("h-10 w-10 p-1", isCurrentTab("") && "fill-black")}
          />
        </Link>
        <Link href="/chat">
          <CiChat1
            className={cn(
              "h-10 w-10 stroke-1",
              isCurrentTab("chat") && "stroke-3"
            )}
          />
        </Link>
        <Link href="/search">
        <HiOutlineSearch
            className={cn(
              "h-10 w-10 stroke-1",
              isCurrentTab("search") && "stroke-3"
            )}
          />
        </Link>
        <Link href="/mypage">
          {isCurrentTab("mypage") ? (
            <HiUserCircle className="h-10 w-10" />
          ) : (
            <HiOutlineUserCircle className="h-10 w-10" />
          )}
        </Link>
      </nav>
    </div>
  );
}

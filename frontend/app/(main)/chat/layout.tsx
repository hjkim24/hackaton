// app/chat/layout.tsx

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function ChatLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentTab = pathname.split('/').pop() || 'recommendedpeople';

  return (
    <div className="w-full flex flex-col h-full">
      {/* 탭 UI */}
      <Tabs defaultValue={currentTab} className="w-full">
        {/* 탭 리스트 스타일 수정 */}
        <TabsList className="grid w-full grid-cols-2 rounded-none p-0 bg-background text-foreground">
          <Link href="/chat/recommendedpeople" passHref>
            <TabsTrigger
              value="recommendedpeople"
              className={cn(
                "w-full",
                "rounded-none rounded-t-lg transition-colors duration-200",
                "text-base",
                "data-[state=active]:bg-primary",
                "data-[state=active]:text-primary-foreground",
                "data-[state=active]:font-bold",
                "data-[state=active]:shadow-sm"
              )}
            >
              추천된 사람
            </TabsTrigger>
          </Link>
          <Link href="/chat/chatting" passHref>
            <TabsTrigger
              value="chatting"
              className={cn(
                "w-full",
                "rounded-none rounded-t-lg transition-colors duration-200",
                "text-base",
                "data-[state=active]:bg-primary",
                "data-[state=active]:text-primary-foreground",
                "data-[state=active]:font-bold",
                "data-[state=active]:shadow-sm"
              )}
            >
              채팅
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
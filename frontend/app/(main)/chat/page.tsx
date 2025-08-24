// app/chat/page.tsx

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecommendedPeopleCard from "@/components/RecommendedPeopleCard";
import ChatListItem from "@/components/ChatListItem";

// 예시 데이터
const recommendedUsers = [
  { photo: "...", name: "이가영", age: 24 },
  { photo: "...", name: "이나영", age: 23 },
  { photo: "...", name: "이다영", age: 27 },
  { photo: "...", name: "이라영", age: 25 },
];

const chatList = [
  { avatar: "...", name: "성대송중기막재", lastMessage: "자기야 밥 먹자" },
  { avatar: "...", name: "차은 우유 도현", lastMessage: "안녕하세용!" },
];

export default function ChatPage() {
  return (
    <div className="w-full flex flex-col h-full">
      {/* 탭 헤더 */}
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recommended">추천된 사람</TabsTrigger>
          <TabsTrigger value="chatting">채팅</TabsTrigger>
        </TabsList>

        {/* Recommended People 화면 */}
        <TabsContent value="recommended" className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {recommendedUsers.map((user, index) => (
              <RecommendedPeopleCard key={index} user={user} />
            ))}
          </div>
        </TabsContent>

        {/* Chatting 화면 */}
        <TabsContent value="chatting" className="p-4 flex-1 overflow-auto">
          <ScrollArea className="h-[calc(100vh-200px)] w-full">
            {chatList.map((chat, index) => (
              <ChatListItem key={index} chat={chat} />
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
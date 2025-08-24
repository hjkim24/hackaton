// app/chat/page.tsx

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecommendedPeopleCard from "@/components/RecommendedPeopleCard";
import ChatListItem from "@/components/ChatListItem";

// 예시 데이터 (나중에 백엔드 API에서 가져올 부분)
const recommendedUsers = [
  { photo: "...", name: "김민준", age: 24 },
  { photo: "...", name: "박서윤", age: 23 },
  { photo: "...", name: "이하준", age: 27 },
  { photo: "...", name: "정다은", age: 25 },
];

const chatList = [
  { avatar: "...", name: "성대중기마", lastMessage: "자기야 밥 먹자" },
  { avatar: "...", name: "김동준", lastMessage: "안녕하세용!" },
  { avatar: "...", name: "최수정", lastMessage: "네, 좋아요!" },
  // ...더 많은 채팅 목록
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
          <ScrollArea className="h-[calc(100vh-200px)] w-full"> {/* 적절한 높이로 설정 */}
            {chatList.map((chat, index) => (
              <ChatListItem key={index} chat={chat} />
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      {/* 하단 탭 바는 레이아웃에 포함되어 있다고 가정 */}
    </div>
  );
}
// app/chat/chatting/page.tsx

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListItem from "@/components/ChatListItem";

// 예시 데이터
const chatList = [
  { id: 1, avatar: "...", name: "성대송중기막재", lastMessage: "자기야 밥 먹자" },
  { id: 2, avatar: "...", name: "차은 우유 도현", lastMessage: "안녕하세용!" },
];

export default function ChattingPage() {
  return (
    <div className="p-4 flex-1 overflow-auto">
      <ScrollArea className="h-[calc(100vh-200px)] w-full">
        {chatList.map((chat, index) => (
          <ChatListItem key={index} chat={chat} />
        ))}
      </ScrollArea>
    </div>
  );
}
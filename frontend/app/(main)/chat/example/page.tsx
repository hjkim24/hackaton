// app/chat/example/page.tsx

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Paperclip, Mic, SendHorizonal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 백엔드 API 대신 사용할 가짜 메시지 데이터
const initialMessages = [
  { id: 1, sender: "other", text: "안녕하세요! 혹시 내일 점심 시간 괜찮으세요?" },
  { id: 2, sender: "me", text: "네! 좋아요! 몇 시쯤 생각하세요?" },
  { id: 3, sender: "other", text: "12시 반 어떠세요? 명륜이나 율전 중에 어디가 편하세요?" },
  { id: 4, sender: "me", text: "저는 율전이 편해요! 그럼 내일 12시 반에 율전에서 뵐게요! :)" },
  { id: 5, sender: "other", text: "네 좋습니다! 내일 봬요! 😄" },
];

export default function ChatRoomPage() {
  const opponent = {
    name: "성대송중기막재",
    avatarUrl: "/src/alice.png", 
  };
  
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 상단 헤더 */}
      <header className="flex items-center p-4 border-b sticky top-0 bg-background z-10">
        <Link href="/chat/chatting" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <Avatar>
          <AvatarImage src={opponent.avatarUrl} />
          <AvatarFallback>{opponent.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <h2 className="font-bold ml-3 text-lg">{opponent.name}</h2>
      </header>

      {/* 메시지 목록 (스크롤 가능) */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* 하단 메시지 입력창 */}
      <footer className="flex items-center p-4 border-t gap-2 sticky bottom-0 bg-background">
        <button className="p-2 hover:bg-muted rounded-full">
          <Paperclip className="h-6 w-6 text-gray-500" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="메시지를 입력하세요..."
          className="flex-1 bg-muted border-none rounded-full px-4 py-3 focus:outline-none"
        />
        <button 
          onClick={handleSendMessage}
          className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}
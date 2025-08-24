// app/chat/[id]/page.tsx

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Paperclip, Mic, SendHorizonal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useWebSocketStore } from "@/stores/webSocketStore"; // 스토어 import

export default function ChatRoomPage() {
  const { id } = useParams();
  const chatRoomId = Number(id);

  const { socket, messages, currentRoomId, setCurrentRoom, sendMessage } = useWebSocketStore();
  
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatRoomId) {
      setCurrentRoom(chatRoomId);
    }
  }, [chatRoomId, setCurrentRoom]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    if (chatRoomId) {
      sendMessage(chatRoomId, newMessage);
      setNewMessage("");
    }
  };
  
  // 이 부분은 임시 데이터입니다. 실제로는 채팅방 정보도 API로 가져와야 합니다.
  const opponent = {
    name: "상대방 닉네임", 
    avatarUrl: "/src/bob.png",
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
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.senderId === 1 ? "justify-end" : "justify-start" // TODO: 현재 로그인된 유저 ID로 변경
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.senderId === 1 // TODO: 현재 로그인된 유저 ID로 변경
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted rounded-bl-none"
                }`}
              >
                <p>{msg.content}</p>
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
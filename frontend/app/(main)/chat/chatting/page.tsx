// app/chat/chatting/page.tsx

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListItem from "@/components/ChatListItem";
import { useWebSocketStore } from "@/stores/webSocketStore"; // 스토어 import
import { useEffect } from "react";

export default function ChattingPage() {
  const { chatRooms, connect } = useWebSocketStore();
  
  // 컴포넌트 마운트 시 소켓 연결 및 채팅방 목록 불러오기
  useEffect(() => {
    // TODO: 로그인된 유저 ID 가져와서 넣기
    // const userId = useAuthStore(state => state.user?.id);
    // if (userId) connect(userId);
    // 현재는 임시로 1번 유저로 연결
    connect(1);
    
    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 해제
      // disconnect();
    };
  }, [connect]);

  return (
    <div className="p-4 flex-1 overflow-auto">
      <ScrollArea className="h-[calc(100vh-200px)] w-full">
        {chatRooms.length > 0 ? (
          chatRooms.map((room) => (
            <ChatListItem
              key={room.id}
              chat={{
                id: room.id,
                avatar: "...", // 참여자의 아바타 가져오는 로직 필요
                name: room.participants.map(p => p.nickname).filter(name => name !== 'user1').join(', '), // 본인 제외 닉네임 표시
                lastMessage: room.messages.length > 0 ? room.messages[0].content : "새 채팅방입니다.",
              }}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>참여 중인 채팅방이 없습니다.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
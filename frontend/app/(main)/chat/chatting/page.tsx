// app/chat/chatting/page.tsx

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListItem from "@/components/ChatListItem";
import { useWebSocketStore } from "@/stores/webSocketStore";
import { useEffect } from "react";

// 데모 시연을 위한 가짜 채팅방 데이터
const dummyChatList = [
  { id: 1, avatar: "/src/alice.png", name: "성대송중기막재", lastMessage: "자기야 밥 먹자" },
  { id: 2, avatar: "/src/bob.png", name: "차은 우유 도현", lastMessage: "안녕하세용!" },
];

export default function ChattingPage() {
  const { chatRooms, connect } = useWebSocketStore();
  
  useEffect(() => {
    connect(1);
  }, [connect]);


  const displayList = chatRooms.length > 0 ? chatRooms.map(room => ({
      id: room.id,
      avatar: "...",
      name: room.participants.map(p => p.nickname).join(', '),
      lastMessage: room.messages.length > 0 ? room.messages[0].content : "새 채팅방입니다.",
  })) : dummyChatList;

  return (
    <div className="p-4 flex-1 overflow-auto">
      <ScrollArea className="h-[calc(100vh-200px)] w-full">
        {displayList.length > 0 ? (
          displayList.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
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


/*
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListItem from "@/components/ChatListItem";
import { useWebSocketStore } from "@/stores/webSocketStore";
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
                name: room.participants.map(p => p.nickname).filter(name => name !== 'user1').join(', '),
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
*/
// app/chat/[id]/page.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ChevronLeftIcon, Paperclip, Mic, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// 백엔드 API에서 가져올 가짜 메시지 데이터
const mockMessages = [
  { id: 1, sender: 'other', text: '자기야 밥 먹자' },
  { id: 2, sender: 'me', text: '안녕하세요! 좋아요' },
  { id: 3, sender: 'other', text: '언제 시간이 되시나요?' },
];

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const chatUserId = params.id; // URL에서 ID를 가져옵니다.
  const chatUserName = "성대송중기막재"; // 이 부분은 나중에 API로 가져와야 합니다.
  const chatUserAvatar = "..."; // 이 부분도 나중에 API로 가져와야 합니다.

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 채팅방 헤더 */}
      <div className="flex items-center space-x-4 p-4 border-b-2">
        <Link href="/chat">
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <Avatar className="w-10 h-10">
          <AvatarImage src={chatUserAvatar} alt={chatUserName} />
          <AvatarFallback>{chatUserName[0]}</AvatarFallback>
        </Avatar>
        <p className="font-bold">{chatUserName}</p>
      </div>

      {/* 메시지 목록 */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {mockMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-gray-200'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* 메시지 입력창 */}
      <div className="p-4 flex items-center space-x-2 border-t-2">
        <Paperclip className="h-6 w-6 text-gray-500" />
        <input 
          type="text"
          placeholder="메시지 입력..."
          className="flex-1 p-3 rounded-full bg-gray-100 focus:outline-none focus:bg-gray-200"
        />
        <Mic className="h-6 w-6 text-gray-500" />
        <Send className="h-6 w-6 text-primary" />
      </div>
    </div>
  );
}
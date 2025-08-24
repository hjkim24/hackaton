// components/ChatListItem.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ChatItem {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
}

// 성대송중기막재 예시로 보여주기
export default function ChatListItem({ chat }: { chat: ChatItem }) {
  const href = chat.name === "성대송중기막재" ? "/chat/example" : `/chat/${chat.id}`;

  return (
    <Link href={href} passHref>
      <div className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer">
        <Avatar className="w-12 h-12">
          <AvatarImage src={chat.avatar} alt={`${chat.name}의 프로필`} />
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-base">{chat.name}</p>
          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
        </div>
      </div>
    </Link>
  );
}
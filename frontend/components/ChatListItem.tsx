// components/ChatListItem.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatItem {
  avatar: string;
  name: string;
  lastMessage: string;
}

export default function ChatListItem({ chat }: { chat: ChatItem }) {
  return (
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
  );
}
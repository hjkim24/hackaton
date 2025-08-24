// components/RecommendedPeopleCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  photo: string;
  name: string;
  age: number;
}

export default function RecommendedPeopleCard({ user }: { user: User }) {
  return (
    <Card className="flex-1 w-full rounded-2xl overflow-hidden shadow-md">
      {/* Avatar 컴포넌트를 사용해 프로필 사진 표시 */}
      <div className="relative w-full h-40">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage src={user.photo} alt={`${user.name}의 프로필 사진`} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </div>
      {/* 카드 하단 정보 */}
      <CardContent className="p-3">
        <div className="flex items-center space-x-2">
          <p className="font-bold text-lg">{user.name}</p>
          <p className="text-gray-500">{user.age}</p>
        </div>
      </CardContent>
    </Card>
  );
}
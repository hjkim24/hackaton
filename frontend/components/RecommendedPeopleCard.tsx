// frontend/components/RecommendedPeopleCard.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  photo?: string;
  nickname: string;
  age: number;
  preferences: string[];
}

export default function RecommendedPeopleCard({ user }: { user: UserProfile }) {
  if (!user) {
    return null;
  }

  return (
    <Card className="flex-1 w-full rounded-2xl overflow-hidden shadow-md">
      <div className="relative w-full h-40 bg-secondary">
        {user.photo && (
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage src={user.photo} alt={`${user.nickname}의 프로필 사진`} />
            <AvatarFallback>{user.nickname[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
      <CardContent className="p-3">
        <div className="flex items-center space-x-2">
          {user.nickname && (
            <div className="flex flex-col">
              <div>
                <p className="font-bold text-lg">{user.nickname}</p>
                <p className="text-gray-500">{user.age}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
            {user.preferences.map((pref, index) => (
              <span 
                key={index} 
                className="bg-black/20 text-black text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
              >
                {pref}
              </span>
            ))}
          </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
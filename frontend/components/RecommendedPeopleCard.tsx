// frontend/components/RecommendedPeopleCard.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  photo?: string;
  nickname: string;
  admissionYear: number;
}

const calculateAge = (admissionYear: number) => {
  const currentYear = new Date().getFullYear();
  // 25학번 -> 2025년 입학, 19세라고 가정
  const age = currentYear - admissionYear + 19;
  return age;
};

export default function RecommendedPeopleCard({ user }: { user: UserProfile }) {
  if (!user) {
    return null;
  }
  
  const age = calculateAge(user.admissionYear);

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
            <>
              <p className="font-bold text-lg">{user.nickname}</p>
              <p className="text-gray-500">{age}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
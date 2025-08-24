// frontend/components/RecommendedPeopleCard.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Preference = {
  id: number
  preference: string
  userId: number
}

type SpareTime = {
  id: number
  spareTime: string
  day: string
  userId: number
}

interface UserProfile {
  id: number
  nickname: string
  gender: 'male' | 'female'
  college: string
  major: string
  age: number
  admissionYear: number
  Preference: Preference[]
  SpareTime: SpareTime[]
}

export default function RecommendedPeopleCard({ user }: { user: UserProfile }) {
  if (!user) {
    return null;
  }

  return (
    <Card className="flex-1 w-full rounded-2xl overflow-hidden shadow-md gap-0">
      <div className="relative w-full h-40 bg-gradient-to-br from-blue-400 to-purple-600">
        {/* 이미지가 없는 경우 기본 배경색과 닉네임 첫 글자 사용 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl font-bold">
            {user.nickname.charAt(0)}
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex items-center space-x-2">
          {user.nickname && (
            <div className="flex flex-col w-full">
              <div className="flex gap-1 items-center">
                <p className="font-bold text-lg">{user.nickname}</p>
                <p className="text-gray-500 text-sm">{user.age}세</p>
              </div>
              <p className="text-gray-600 text-sm mt-1">{user.college} {user.major}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {user.Preference && user.Preference.length > 0 ? (
                  user.Preference.slice(0, 3).map((pref, index) => (
                    <span 
                      key={pref.id || `pref-${index}`} 
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {pref.preference}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs px-2 py-1">
                    선호사항 없음
                  </span>
                )}
                {user.Preference && user.Preference.length > 3 && (
                  <span className="text-gray-500 text-xs px-2 py-1">
                    +{user.Preference.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
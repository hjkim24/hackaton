"use client";

import Image from "next/image";

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
  id: number;
  nickname: string;
  age: number;
  college: string;
  major: string;
  Preference: Preference[];
  SpareTime: SpareTime[];
}

interface LikedProfilesProps {
  likedUsers: UserProfile[];
}

export default function LikedProfiles({ likedUsers }: LikedProfilesProps) {
  if (likedUsers.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        좋아한 프로필
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {likedUsers.map((profile) => (
          <div key={profile.id} className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-green-400 flex items-center justify-center">
              <div className="text-white text-xl font-bold">
                {profile.nickname.charAt(0)}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700">{profile.nickname}</p>
            <p className="text-xs text-gray-500">{profile.college}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
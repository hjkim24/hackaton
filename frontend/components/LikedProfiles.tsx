"use client";

import Image from "next/image";

interface UserProfile {
  id: number;
  nickname: string;
  age: number;
  image: string;
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
            <div className="relative w-16 h-16 mx-auto mb-2">
              <Image
                src={profile.image || "/src/placeholder.png"}
                alt={profile.nickname}
                fill
                className="rounded-full object-cover border-2 border-green-400"
              />
            </div>
            <p className="text-sm font-medium text-gray-700">{profile.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
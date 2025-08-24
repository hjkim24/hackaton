// frontend/app/(main)/page.tsx

"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "@/components/SwipeCard";

interface UserProfile {
  id: number;
  nickname: string;
  age: number;
  photo?: string;
}

// 가짜 데이터
const profilesData: UserProfile[] = [
  { id: 1, nickname: "Alice", age: 22, photo: "/src/alice.png" },
  { id: 2, nickname: "Bob", age: 25, photo: "/src/bob.png" },
  { id: 3, nickname: "Charlie", age: 23, photo: "/src/charlie.png" },
  { id: 4, nickname: "John", age: 27, photo: "/src/john.png" },
  { id: 5, nickname: "Anni", age: 24, photo: "/src/anni.png" },
];

export default function SwipePage() {
  const [profiles, setProfiles] = useState(profilesData);
  const [liked, setLiked] = useState<UserProfile[]>([]);

  const handleSwipe = (profile: UserProfile, direction: "left" | "right") => {
    if (direction === "right") {
      setLiked((prev) => [...prev, profile]);
    }
    setProfiles((prev) => prev.filter((p) => p.id !== profile.id));
  };

  const resetProfiles = () => {
    setProfiles(profilesData);
    setLiked([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">런챗 매칭</h1>

      <div className="relative w-80 h-96 mb-8">
        <AnimatePresence>
          {profiles.length > 0 ? (
            profiles.slice(0, 1).map((profile) => (
              <SwipeCard
                key={profile.id}
                user={profile}
                onSwipe={(direction) => handleSwipe(profile, direction)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                모든 프로필을 확인했습니다!
              </p>
              <button
                onClick={resetProfiles}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                다시 시작하기
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {profiles.length > 0 && (
        <div className="flex gap-4">
          <button
            onClick={() => handleSwipe(profiles[0], "left")}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            ❌
          </button>
          <button
            onClick={() => handleSwipe(profiles[0], "right")}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            ❤️
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "@/components/SwipeCard";
import LikedProfiles from "@/components/LikedProfiles";

interface UserProfile {
  id: number;
  nickname: string;
  age: number;
  photo?: string;
}

interface SwipeContainerProps {
  initialProfiles: UserProfile[];
}

export default function SwipeContainer({ initialProfiles }: SwipeContainerProps) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [liked, setLiked] = useState<UserProfile[]>([]);

  const handleSwipe = (profile: UserProfile, direction: "left" | "right") => {
    if (direction === "right") {
      setLiked((prev) => [...prev, profile]);
    }
    setProfiles((prev) => prev.filter((p) => p.id !== profile.id));
  };

  const resetProfiles = () => {
    setProfiles(initialProfiles);
    setLiked([]);
  };

  return (
    <>
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

      {/* 좋아한 프로필 목록 컴포넌트 호출 */}
      <LikedProfiles likedUsers={liked} />

      {/* 수동 스와이프 버튼 */}
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
    </>
  );
}
// app/(main)/search/[preference]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SwipeCard from "@/components/SwipeCard"; // SwipeCard 컴포넌트를 import 합니다.
import { AnimatePresence } from "framer-motion";

// Prisma User 모델에 맞춘 타입 정의 (age 필드 사용)
interface UserProfile {
  id: number;
  photo?: string;
  nickname: string;
  age: number; // admissionYear 대신 age 사용
}

// 가짜 데이터 (age 필드 포함)
const mockUsers: UserProfile[] = [
  { id: 1, nickname: "성균관선배", age: 25, photo: "/src/bob.png" },
  { id: 2, nickname: "율전다람쥐", age: 23, photo: "/src/charlie.png" },
  { id: 3, nickname: "명륜학우", age: 24, photo: "/src/john.png" },
  { id: 4, nickname: "킹고킹고", age: 22, photo: "/src/alice.png" },
];

export default function PreferenceDetailPage() {
  const { preference } = useParams();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [liked, setLiked] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const decodedPreference = Array.isArray(preference)
    ? decodeURIComponent(preference[0] || "")
    : typeof preference === 'string'
      ? decodeURIComponent(preference)
      : undefined;

  const handleSwipe = (user: UserProfile, direction: "left" | "right") => {
    if (direction === "right") {
      setLiked((prev) => [...prev, user]);
    }
    setProfiles((prev) => prev.filter((p) => p.id !== user.id));
  };
  
  const resetProfiles = () => {
    setProfiles(mockUsers);
    setLiked([]);
  };

  useEffect(() => {
    if (!decodedPreference) {
      setIsLoading(false);
      return;
    }
    
    setProfiles(mockUsers);
    setIsLoading(false);
  }, [decodedPreference]);

  if (!decodedPreference || isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="p-4 space-y-6 flex flex-col items-center justify-center min-h-screen">
      <header className="flex items-center space-x-2 w-full max-w-md">
        <Link href="/search">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">
          '{decodedPreference}' 관심사를 가진 사람
        </h1>
      </header>

      <div className="relative w-80 h-96 mb-8">
        <AnimatePresence>
          {profiles.length > 0 ? (
            profiles.slice(0, 1).map((user) => (
              <SwipeCard
                key={user.id}
                user={user}
                onSwipe={(direction) => handleSwipe(user, direction)}
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
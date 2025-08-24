"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "@/components/SwipeCard";
import LikedProfiles from "@/components/LikedProfiles";
import { useUserStore } from "@/stores/userStore";

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

type UserProfile = {
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

interface SwipeContainerProps {
  initialProfiles: UserProfile[];
}

export default function SwipeContainer({ initialProfiles }: SwipeContainerProps) {
  const [profiles, setProfiles] = useState<UserProfile[]>(initialProfiles || []);
  const { likedUsers, addLikedUser, clearLikedUsers } = useUserStore();

  // initialProfiles가 변경될 때 profiles 상태 업데이트
  useEffect(() => {
    if (initialProfiles && initialProfiles.length > 0) {
      setProfiles(initialProfiles);
    }
  }, [initialProfiles]);

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log('SwipeContainer profiles:', profiles);
    console.log('SwipeContainer initialProfiles:', initialProfiles);
  }, [profiles, initialProfiles]);

  const handleSwipe = (profile: UserProfile, direction: "left" | "right") => {
    if (direction === "right") {
      // 오른쪽으로 스와이프한 경우에만 전역 스토어에 추가
      addLikedUser(profile);
    }
    setProfiles((prev) => prev.filter((p) => p.id !== profile.id));
  };

  const resetProfiles = () => {
    if (initialProfiles && initialProfiles.length > 0) {
      setProfiles(initialProfiles);
    }
    clearLikedUsers(); // 전역 스토어도 초기화
  };

  return (
    <>
      <div className="relative w-80 h-96 mt-20 mb-8">
        <AnimatePresence>
          {profiles && profiles.length > 0 ? (
            (() => {
              console.log('Rendering profiles, count:', profiles.length);
              const firstProfile = profiles[0];
              console.log('First profile:', firstProfile);
              return (
                <SwipeCard
                  key={firstProfile.id}
                  user={firstProfile}
                  onSwipe={(direction) => handleSwipe(firstProfile, direction)}
                />
              );
            })()
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {profiles ? '모든 프로필을 확인했습니다!' : '프로필을 불러오는 중...'}
              </p>
              {profiles && profiles.length === 0 && (
                <button
                  onClick={resetProfiles}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  다시 시작하기
                </button>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 좋아한 프로필 목록 컴포넌트 호출 */}
      <LikedProfiles likedUsers={likedUsers} />
    </>
  );
}
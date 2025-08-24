// frontend/components/SwipeCard.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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

interface SwipeCardProps {
  user: UserProfile;
  onSwipe: (direction: "left" | "right") => void;
}

export default function SwipeCard({ user, onSwipe }: SwipeCardProps) {
  const [exitX, setExitX] = useState(0);

  return (
    <motion.div
      key={user.id}
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) {
          setExitX(300); 
          onSwipe("right");
        } else if (info.offset.x < -100) {
          setExitX(-300); 
          onSwipe("left");
        }
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        x: exitX,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      whileDrag={{ 
        scale: 1.05,
        zIndex: 1000
      }}
    >
      <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600">
        {/* 이미지가 없는 경우 기본 배경색 사용 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl font-bold">
            {user.nickname.charAt(0)}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{user.nickname}</h3>
          <p className="text-white/90 text-sm mb-2">{user.college} {user.major}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.Preference && user.Preference.length > 0 ? (
              (() => {
                console.log('User preferences:', user.Preference);
                return user.Preference.slice(0, 3).map((pref, index) => (
                  <span 
                    key={pref.id || `pref-${index}`} 
                    className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
                  >
                    {pref.preference}
                  </span>
                ));
              })()
            ) : (
              <span className="text-white/60 text-xs px-2 py-1">
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
      </div>
    </motion.div>
  );
}
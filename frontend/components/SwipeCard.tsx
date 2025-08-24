// frontend/components/SwipeCard.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type UserProfile = {
  id: number
  age: number
  sex: "male" | "female"
  college: string
  major: string
  username: string
  nickname: string
  name: string
  admissionYear: number
  image: string
  preferences: string[]
  spareTime: { id: number, spareTime: string, user: string, day: string }[]
  likeBy: string[]
  likeTo: string[]
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
      <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden">
        <Image
          src={user.image || "/src/placeholder.png"}
          alt={user.nickname}
          fill
          className="object-cover"
          draggable={false}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{user.nickname}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.preferences.map((pref, index) => (
              <span 
                key={index} 
                className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
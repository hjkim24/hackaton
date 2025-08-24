// frontend/components/SwipeCard.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface UserProfile {
  id: number;
  photo?: string;
  nickname: string;
  age: number;
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
          src={user.photo || "/src/placeholder.png"}
          alt={user.nickname}
          fill
          className="object-cover"
          draggable={false}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{user.nickname}</h3>
          <p className="text-white/90 text-sm">{user.age}살</p>
        </div>
      </div>
    </motion.div>
  );
}
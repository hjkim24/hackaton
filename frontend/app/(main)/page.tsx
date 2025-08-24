// frontend/app/(main)/page.tsx

"use client";

import SwipeContainer from "@/components/SwipeContainer";

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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">런챗 매칭</h1>
      
      <SwipeContainer initialProfiles={profilesData} />
    </div>
  );
}
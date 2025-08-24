// app/chat/recommendedpeople/page.tsx

"use client";

import RecommendedPeopleCard from "@/components/RecommendedPeopleCard";

// 예시 데이터
const recommendedUsers = [
  { photo: "...", name: "이가영", age: 24 },
  { photo: "...", name: "이나영", age: 23 },
  { photo: "...", name: "이다영", age: 27 },
  { photo: "...", name: "이라영", age: 25 },
];

export default function RecommendedPeoplePage() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {recommendedUsers.map((user, index) => (
          <RecommendedPeopleCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
}
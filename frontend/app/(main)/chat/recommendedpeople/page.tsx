// app/(main)/chat/recommendedpeople/page.tsx

"use client";

import RecommendedPeopleCard from "@/components/RecommendedPeopleCard";

const recommendedUsers = [
  { photo: "/src/alice.png", nickname: "이가영", admissionYear: 24 },
  { photo: "/src/anni.png", nickname: "이나영", admissionYear: 23 },
  { photo: "/src/charlie.png", nickname: "이다영", admissionYear: 27 },
  { photo: "/src/john.png", nickname: "이라영", admissionYear: 25 },
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
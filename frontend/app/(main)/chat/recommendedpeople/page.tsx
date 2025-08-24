// app/(main)/chat/recommendedpeople/page.tsx

"use client";

import { useEffect, useState } from "react";
import RecommendedPeopleCard from "@/components/RecommendedPeopleCard";
import { useUserStore } from "@/stores/userStore";

export default function RecommendedPeoplePage() {
  const { likedUsers } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 로딩 상태 해제
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="text-center text-lg">로딩 중...</div>
      </div>
    );
  }

  if (likedUsers.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center">
          <div className="text-4xl mb-4">💔</div>
          <p className="text-lg text-gray-600 mb-2">아직 좋아요한 사용자가 없습니다</p>
          <p className="text-sm text-gray-500">메인 페이지에서 사용자들을 스와이프해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">추천받은 사용자</h1>
        <p className="text-sm text-gray-600">총 {likedUsers.length}명의 사용자를 좋아요했습니다</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {likedUsers.map((user) => (
          <RecommendedPeopleCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
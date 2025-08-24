// frontend/app/(main)/search/[preference]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SwipeContainer from "@/components/SwipeContainer";

interface UserProfile {
  id: number;
  photo?: string;
  nickname: string;
  age: number;
}

// 가짜 데이터
const mockUsers: UserProfile[] = [
  { id: 1, nickname: "성균관선배", age: 25, photo: "/src/bob.png" },
  { id: 2, nickname: "율전다람쥐", age: 23, photo: "/src/charlie.png" },
  { id: 3, nickname: "명륜학우", age: 24, photo: "/src/john.png" },
  { id: 4, nickname: "킹고킹고", age: 22, photo: "/src/alice.png" },
];

export default function PreferenceDetailPage() {
  const { preference } = useParams();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const decodedPreference = Array.isArray(preference)
    ? decodeURIComponent(preference[0] || "")
    : typeof preference === 'string'
      ? decodeURIComponent(preference)
      : undefined;

  useEffect(() => {
    if (decodedPreference) {
      // 나중에 이 부분에서 API를 호출하여 profiles 상태를 설정합니다.
      setProfiles(mockUsers);
    }
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
      <SwipeContainer initialProfiles={profiles} />
    </div>
  );
}
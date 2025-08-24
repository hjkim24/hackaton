// app/(main)/search/[preference]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import RecommendedPeopleCard from "@/components/RecommendedPeopleCard";

// Prisma User 모델에 맞춘 타입 정의
interface UserProfile {
  id: number;
  photo?: string;
  nickname: string;
  admissionYear: number;
}

// 백엔드 API 대신 사용할 가짜 데이터
const mockUsers: UserProfile[] = [
  { id: 1, nickname: "성균관선배", admissionYear: 21, photo: "/src/bob.png" },
  { id: 2, nickname: "율전다람쥐", admissionYear: 23, photo: "/src/charlie.png" },
  { id: 3, nickname: "명륜학우", admissionYear: 24, photo: "/src/john.png" },
  { id: 4, nickname: "킹고킹고", admissionYear: 22, photo: "/src/alice.png" },
];

export default function PreferenceDetailPage() {
  const { preference } = useParams();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // preference 값이 존재하는지 확인하고 디코딩합니다.
  const decodedPreference = Array.isArray(preference)
    ? decodeURIComponent(preference[0] || "") // 배열인 경우 첫번째 요소를 디코딩
    : typeof preference === 'string' 
      ? decodeURIComponent(preference) // 문자열인 경우 디코딩
      : undefined; // 그 외의 경우 (undefined) undefined로 설정

  // useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 불러옵니다.
  useEffect(() => {
    // decodedPreference 값이 있을 때만 데이터를 불러오도록 조건 추가
    if (!decodedPreference) {
      setIsLoading(false);
      return;
    }
    
    // --- 추후 이 부분에 백엔드 API 호출 코드를 추가합니다 ---
    // 예시:
    // const fetchUsers = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(`/api/users?preference=${decodedPreference}`);
    //     const data = await response.json();
    //     setUsers(data);
    //   } catch (error) {
    //     console.error("Failed to fetch users:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchUsers();
    
    // 현재는 가짜 데이터를 사용합니다.
    setUsers(mockUsers);
    setIsLoading(false);
  }, [decodedPreference]);

  // decodedPreference가 undefined인 경우 로딩 상태 표시
  if (!decodedPreference || isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center space-x-2">
        <Link href="/search">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">
          '{decodedPreference}' 관심사를 가진 사람
        </h1>
      </header>

      {users.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => (
            <RecommendedPeopleCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>해당 관심사를 가진 사용자가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
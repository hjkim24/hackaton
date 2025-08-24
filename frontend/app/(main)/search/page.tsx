// app/(main)/search/page.tsx

'use client'

import { Card } from '@/components/ui/card'
import {
  Briefcase,
  Gamepad,
  Coffee,
  Utensils,
  Star,
  Book,
  Plane
} from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// app/(main)/search/page.tsx

// 1. 노션 내용을 바탕으로 관심사를 카테고리별로 그룹화합니다.
const interestCategories = [
  {
    title: '커리어 & 성장',
    items: [
      { name: '진로취업', icon: <Briefcase /> },
      { name: '창업', icon: <Plane /> },
      { name: '스터디', icon: <Book /> }
    ]
  },
  {
    title: '취미 & 여가',
    items: [
      { name: '게임', icon: <Gamepad /> },
      { name: '맛집탐방', icon: <Utensils /> },
      { name: '카페투어', icon: <Coffee /> }
    ]
  },
  {
    title: '친목 & 라이프스타일',
    items: [
      { name: '동네친구', icon: <Star /> },
      { name: '여행', icon: <Plane /> }
    ]
  }
]

// 2. 사용자가 설정한 관심사 (백엔드 연동 전 가짜 데이터)
//    - 나중에 이 부분만 useAuthStore나 API 호출로 가져온 데이터로 교체하면 됩니다.
const myPreferences = ['게임', '맛집탐방']

// 카드 UI를 위한 재사용 컴포넌트
function InterestCard({ name, icon }: { name: string; icon: ReactNode }) {
  return (
    <Link href={`/search/${encodeURIComponent(name)}`}>
      <Card className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl p-4 transition-transform hover:scale-105">
        <div className="text-primary">{icon}</div>
        <p className="text-md mt-2 text-center font-semibold">{name}</p>
      </Card>
    </Link>
  )
}

export default function SearchPage() {
  return (
    <div className="space-y-8 p-4">
      {/* 3. 내가 설정한 관심사 렌더링 */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">나의 관심사 ✨</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {interestCategories
            .flatMap((category) => category.items) // 모든 아이템을 하나의 배열로 만듦
            .filter((item) => myPreferences.includes(item.name)) // 내가 설정한 관심사만 필터링
            .map((item) => (
              <InterestCard key={item.name} name={item.name} icon={item.icon} />
            ))}
        </div>
      </div>

      {/* 4. 카테고리별로 다른 관심사 렌더링 */}
      {interestCategories.map((category) => {
        const otherInterests = category.items.filter(
          (item) => !myPreferences.includes(item.name)
        )

        if (otherInterests.length === 0) return null // 해당 카테고리에 다른 관심사가 없으면 렌더링하지 않음

        return (
          <div key={category.title}>
            <h2 className="mb-4 text-2xl font-bold">{category.title}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {otherInterests.map((item) => (
                <InterestCard
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

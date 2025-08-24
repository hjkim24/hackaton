'use client'

import SwipeContainer from '@/components/SwipeContainer'
import MainPageHeader from './_components/MainPageHeader'

type UserProfile = {
  id: number
  age: number
  sex: 'male' | 'female'
  college: string
  major: string
  username: string
  nickname: string
  name: string
  admissionYear: number
  image: string
  preferences: string[]
  spareTime: { id: number; spareTime: string; user: string; day: string }[]
  likeBy: string[]
  likeTo: string[]
}

const profilesData: UserProfile[] = [
  {
    id: 1,
    age: 22,
    sex: 'female',
    college: '공과대학',
    major: '컴퓨터공학과',
    username: 'alice_dev',
    nickname: '앨리스',
    name: '김앨리스',
    admissionYear: 2021,
    image: '/src/alice.png',
    preferences: ['커피', '코딩', '게임', '여행', '음악'],
    spareTime: [
      { id: 1, spareTime: '18:00', user: '김앨리스', day: 'MONDAY' },
      { id: 2, spareTime: '19:00', user: '김앨리스', day: 'TUESDAY' },
      { id: 3, spareTime: '20:00', user: '김앨리스', day: 'WEDNESDAY' },
      { id: 4, spareTime: '17:00', user: '김앨리스', day: 'THURSDAY' },
      { id: 5, spareTime: '21:00', user: '김앨리스', day: 'FRIDAY' }
    ],
    likeBy: ['이밥', '박찰리'],
    likeTo: ['최존']
  },
  {
    id: 2,
    age: 23,
    sex: 'male',
    college: '자연과학대학',
    major: '수학과',
    username: 'bob_math',
    nickname: '밥',
    name: '이밥',
    admissionYear: 2020,
    image: '/src/bob.png',
    preferences: ['수학', '독서', '카페', '영화', '운동'],
    spareTime: [
      { id: 6, spareTime: '16:00', user: '이밥', day: 'MONDAY' },
      { id: 7, spareTime: '18:00', user: '이밥', day: 'TUESDAY' },
      { id: 8, spareTime: '19:00', user: '이밥', day: 'WEDNESDAY' },
      { id: 9, spareTime: '14:00', user: '이밥', day: 'SATURDAY' },
      { id: 10, spareTime: '15:00', user: '이밥', day: 'SUNDAY' }
    ],
    likeBy: ['김앨리스', '정애니'],
    likeTo: ['박찰리', '최존']
  },
  {
    id: 3,
    age: 21,
    sex: 'male',
    college: '경영대학',
    major: '경영학과',
    username: 'charlie_biz',
    nickname: '찰리',
    name: '박찰리',
    admissionYear: 2022,
    image: '/src/charlie.png',
    preferences: ['경영', '투자', '골프', '와인', '네트워킹'],
    spareTime: [
      { id: 11, spareTime: '17:00', user: '박찰리', day: 'TUESDAY' },
      { id: 12, spareTime: '19:00', user: '박찰리', day: 'THURSDAY' },
      { id: 13, spareTime: '18:00', user: '박찰리', day: 'FRIDAY' },
      { id: 14, spareTime: '16:00', user: '박찰리', day: 'SATURDAY' }
    ],
    likeBy: ['김앨리스', '이밥'],
    likeTo: ['최존', '정애니']
  },
  {
    id: 4,
    age: 24,
    sex: 'male',
    college: '의과대학',
    major: '의학과',
    username: 'john_med',
    nickname: '존',
    name: '최존',
    admissionYear: 2019,
    image: '/src/john.png',
    preferences: ['의학', '연구', '독서', '클래식', '등산'],
    spareTime: [
      { id: 15, spareTime: '20:00', user: '최존', day: 'MONDAY' },
      { id: 16, spareTime: '21:00', user: '최존', day: 'WEDNESDAY' },
      { id: 17, spareTime: '22:00', user: '최존', day: 'FRIDAY' },
      { id: 18, spareTime: '16:00', user: '최존', day: 'SUNDAY' }
    ],
    likeBy: ['김앨리스', '이밥', '박찰리'],
    likeTo: ['정애니']
  },
  {
    id: 5,
    age: 20,
    sex: 'female',
    college: '예술대학',
    major: '디자인학과',
    username: 'anni_art',
    nickname: '애니',
    name: '정애니',
    admissionYear: 2023,
    image: '/src/anni.png',
    preferences: ['디자인', '그림', '전시회', '카페', '패션'],
    spareTime: [
      { id: 19, spareTime: '16:00', user: '정애니', day: 'TUESDAY' },
      { id: 20, spareTime: '18:00', user: '정애니', day: 'THURSDAY' },
      { id: 21, spareTime: '15:00', user: '정애니', day: 'SATURDAY' },
      { id: 22, spareTime: '14:00', user: '정애니', day: 'SUNDAY' }
    ],
    likeBy: ['이밥', '박찰리', '최존'],
    likeTo: ['김앨리스']
  }
]

export default function SwipePage() {
  return (
    <div>
      <MainPageHeader />
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <SwipeContainer initialProfiles={profilesData} />
      </div>
    </div>
  )
}

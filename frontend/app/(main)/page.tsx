"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MainPageHeader from "./_components/MainPageHeader"

type Profile = {
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

const profilesData: Profile[] = [
  { 
    id: 1, 
    age: 22, 
    sex: "female", 
    college: "공과대학", 
    major: "컴퓨터공학과", 
    username: "alice_dev", 
    nickname: "앨리스", 
    name: "김앨리스", 
    admissionYear: 2021, 
    image: "/src/alice.png",
    preferences: ["커피", "코딩", "게임", "여행", "음악"],
    spareTime: [
      { id: 1, spareTime: "18:00", user: "김앨리스", day: "MONDAY" },
      { id: 2, spareTime: "19:00", user: "김앨리스", day: "TUESDAY" },
      { id: 3, spareTime: "20:00", user: "김앨리스", day: "WEDNESDAY" },
      { id: 4, spareTime: "17:00", user: "김앨리스", day: "THURSDAY" },
      { id: 5, spareTime: "21:00", user: "김앨리스", day: "FRIDAY" }
    ],
    likeBy: ["이밥", "박찰리"],
    likeTo: ["최존"]
  },
  { 
    id: 2, 
    age: 23, 
    sex: "male", 
    college: "자연과학대학", 
    major: "수학과", 
    username: "bob_math", 
    nickname: "밥", 
    name: "이밥", 
    admissionYear: 2020, 
    image: "/src/bob.png",
    preferences: ["수학", "독서", "카페", "영화", "운동"],
    spareTime: [
      { id: 6, spareTime: "16:00", user: "이밥", day: "MONDAY" },
      { id: 7, spareTime: "18:00", user: "이밥", day: "TUESDAY" },
      { id: 8, spareTime: "19:00", user: "이밥", day: "WEDNESDAY" },
      { id: 9, spareTime: "14:00", user: "이밥", day: "SATURDAY" },
      { id: 10, spareTime: "15:00", user: "이밥", day: "SUNDAY" }
    ],
    likeBy: ["김앨리스", "정애니"],
    likeTo: ["박찰리", "최존"]
  },
  { 
    id: 3, 
    age: 21, 
    sex: "male", 
    college: "경영대학", 
    major: "경영학과", 
    username: "charlie_biz", 
    nickname: "찰리", 
    name: "박찰리", 
    admissionYear: 2022, 
    image: "/src/charlie.png",
    preferences: ["경영", "투자", "골프", "와인", "네트워킹"],
    spareTime: [
      { id: 11, spareTime: "17:00", user: "박찰리", day: "TUESDAY" },
      { id: 12, spareTime: "19:00", user: "박찰리", day: "THURSDAY" },
      { id: 13, spareTime: "18:00", user: "박찰리", day: "FRIDAY" },
      { id: 14, spareTime: "16:00", user: "박찰리", day: "SATURDAY" }
    ],
    likeBy: ["김앨리스", "이밥"],
    likeTo: ["최존", "정애니"]
  },
  { 
    id: 4, 
    age: 24, 
    sex: "male", 
    college: "의과대학", 
    major: "의학과", 
    username: "john_med", 
    nickname: "존", 
    name: "최존", 
    admissionYear: 2019, 
    image: "/src/john.png",
    preferences: ["의학", "연구", "독서", "클래식", "등산"],
    spareTime: [
      { id: 15, spareTime: "20:00", user: "최존", day: "MONDAY" },
      { id: 16, spareTime: "21:00", user: "최존", day: "WEDNESDAY" },
      { id: 17, spareTime: "22:00", user: "최존", day: "FRIDAY" },
      { id: 18, spareTime: "16:00", user: "최존", day: "SUNDAY" }
    ],
    likeBy: ["김앨리스", "이밥", "박찰리"],
    likeTo: ["정애니"]
  },
  { 
    id: 5, 
    age: 20, 
    sex: "female", 
    college: "예술대학", 
    major: "디자인학과", 
    username: "anni_art", 
    nickname: "애니", 
    name: "정애니", 
    admissionYear: 2023, 
    image: "/src/anni.png",
    preferences: ["디자인", "그림", "전시회", "카페", "패션"],
    spareTime: [
      { id: 19, spareTime: "16:00", user: "정애니", day: "TUESDAY" },
      { id: 20, spareTime: "18:00", user: "정애니", day: "THURSDAY" },
      { id: 21, spareTime: "15:00", user: "정애니", day: "SATURDAY" },
      { id: 22, spareTime: "14:00", user: "정애니", day: "SUNDAY" }
    ],
    likeBy: ["이밥", "박찰리", "최존"],
    likeTo: ["김앨리스"]
  }
]


export default function SwipeCards() {
  const [profiles, setProfiles] = useState(profilesData)
  const [liked, setLiked] = useState<Profile[]>([])

  const handleSwipe = (profile: Profile, direction: "left" | "right") => {
    if (direction === "right") {
      setLiked((prev) => [...prev, profile])
    }
    setProfiles((prev) => prev.filter((p) => p.id !== profile.id))
  }

  const resetProfiles = () => {
    setProfiles(profilesData)
    setLiked([])
  }

  return (
    <div>
        <MainPageHeader />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="relative w-80 h-96 mb-8 mt-20">
          <AnimatePresence>
            {profiles.length > 0 ? (
              profiles
                .slice(0, 1) // 맨 위 카드만 보여줌
                .map((profile) => (
                  <motion.div
                    key={profile.id}
                    data-profile-id={profile.id}
                    className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.8}
                    onDrag={(_, info) => {
                      // 드래그 중에 회전 효과 적용
                      const rotate = info.offset.x / 20
                      const element = document.querySelector(`[data-profile-id="${profile.id}"]`) as HTMLElement
                      if (element) {
                        element.style.transform = `rotate(${rotate}deg)`
                      }
                    }}
                    onDragEnd={(_, info) => {
                      // 회전 효과 초기화
                      const element = document.querySelector(`[data-profile-id="${profile.id}"]`) as HTMLElement
                      if (element) {
                        element.style.transform = ''
                      }
                      
                      if (info.offset.x > 100) {
                        handleSwipe(profile, "right")
                      } else if (info.offset.x < -100) {
                        handleSwipe(profile, "left")
                      }
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      x: liked.some((p) => p.id === profile.id) ? 300 : -300,
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }}
                    whileDrag={{ 
                      scale: 1.05,
                      zIndex: 1000
                    }}
                  >
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      draggable={false}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl">
                      <h3 className="text-white font-bold text-xl">{profile.name}</h3>
                      <p className="text-white/90 text-sm">새로운 친구를 만나보세요!</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile.preferences.map((pref, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* 스와이프 힌트 */}
                    <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                      👈 👉 드래그해서 스와이프
                    </div>
                  </motion.div>
                ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-xl font-semibold text-gray-700 mb-2">모든 프로필을 확인했습니다!</p>
                <p className="text-gray-500 mb-4">좋아한 프로필: {liked.length}개</p>
                <button
                  onClick={resetProfiles}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  다시 시작하기
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 좋아한 프로필 목록 */}
        {liked.length > 0 && (
          <div className="w-full max-w-md mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">좋아한 프로필</h2>
            <div className="grid grid-cols-3 gap-3">
              {liked.map((profile) => (
                <div key={profile.id} className="text-center">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-green-400"
                  />
                  <p className="text-sm font-medium text-gray-700">{profile.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

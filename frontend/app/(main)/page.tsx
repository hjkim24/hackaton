"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Profile = {
  id: number
  name: string
  image: string
}

const profilesData: Profile[] = [
  { id: 1, name: "Alice", image: "/src/alice.png" },
  { id: 2, name: "Bob", image: "/src/bob.png" },
  { id: 3, name: "Charlie", image: "/src/charlie.png" },
  { id: 4, name: "John", image: "/src/john.png" },
  { id: 5, name: "Anni", image: "/src/anni.png" }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">런챗 매칭</h1>
      
      <div className="relative w-80 h-96 mb-8">
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

      {/* 수동 스와이프 버튼 */}
      {profiles.length > 0 && (
        <div className="flex gap-4">
          <button
            onClick={() => handleSwipe(profiles[0], "left")}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            ❌
          </button>
          <button
            onClick={() => handleSwipe(profiles[0], "right")}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            ❤️
          </button>
        </div>
      )}
    </div>
  )
}

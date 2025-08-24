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
  { id: 3, name: "Charlie", image: "/src/charlie.png" }
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-72 h-96">
        <AnimatePresence>
          {profiles.length > 0 ? (
            profiles
              .slice(0, 1) // 맨 위 카드만 보여줌
              .map((profile) => (
                <motion.div
                  key={profile.id}
                  className="absolute w-full h-full"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) {
                      handleSwipe(profile, "right")
                    } else if (info.offset.x < -100) {
                      handleSwipe(profile, "left")
                    }
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    x: infoDirection(profiles[0].id, liked) === "right" ? 300 : -300,
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                  whileDrag={{ rotate: 15, scale: 1.05 }}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow-lg">
                    {profile.name}
                  </div>
                </motion.div>
              ))
          ) : (
            <p className="text-center">No more profiles</p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6">
        <h2 className="font-bold">Liked Profiles:</h2>
        <ul>
          {liked.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// 보조 함수들
function infoRotate(_: number, drag: number) {
  return drag / 50 // 드래그할 때 회전 효과
}

function infoDirection(profileId: number, liked: Profile[]) {
  return liked.some((p) => p.id === profileId) ? "right" : "left"
}

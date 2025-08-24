import { create } from 'zustand'

type Preference = {
  id: number
  preference: string
  userId: number
}

type SpareTime = {
  id: number
  spareTime: string
  day: string
  userId: number
}

type LikedUser = {
  id: number
  nickname: string
  gender: 'male' | 'female'
  college: string
  major: string
  age: number
  admissionYear: number
  Preference: Preference[]
  SpareTime: SpareTime[]
}

interface UserStore {
  likedUsers: LikedUser[]
  setLikedUsers: (users: LikedUser[]) => void
  addLikedUser: (user: LikedUser) => void
  removeLikedUser: (userId: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  likedUsers: [],
  setLikedUsers: (users) => set({ likedUsers: users }),
  addLikedUser: (user) => set((state) => ({ 
    likedUsers: [...state.likedUsers, user] 
  })),
  removeLikedUser: (userId) => set((state) => ({ 
    likedUsers: state.likedUsers.filter(user => user.id !== userId) 
  })),
})) 
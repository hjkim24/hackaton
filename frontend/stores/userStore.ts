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

type SelectedTime = {
  day: string
  startTime: string
  endTime: string
}

interface UserStore {
  likedUsers: LikedUser[]
  selectedTime: SelectedTime
  setLikedUsers: (users: LikedUser[]) => void
  addLikedUser: (user: LikedUser) => void
  removeLikedUser: (userId: number) => void
  clearLikedUsers: () => void
  setSelectedTime: (time: SelectedTime) => void
}

export const useUserStore = create<UserStore>((set) => ({
  likedUsers: [],
  selectedTime: {
    day: 'TUE',
    startTime: '09:00',
    endTime: '23:00'
  },
  setLikedUsers: (users) => set({ likedUsers: users }),
  addLikedUser: (user) => set((state) => ({ 
    likedUsers: [...state.likedUsers, user] 
  })),
  removeLikedUser: (userId) => set((state) => ({ 
    likedUsers: state.likedUsers.filter(user => user.id !== userId) 
  })),
  clearLikedUsers: () => set({ likedUsers: [] }),
  setSelectedTime: (time) => set({ selectedTime: time }),
})) 
export interface Message {
  id: number
  content: string
  createdAt: Date
  senderId: number
  chatRoomId: number
  sender?: {
    id: number
    nickname: string
  }
}

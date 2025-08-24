import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  // 사용자 ID와 소켓 매핑
  private userSocketMap = new Map<number, string>()

  constructor(private chatService: ChatService) {}

  // Socket의 data 타입을 명확히 지정
  private getUserId(client: Socket): number | undefined {
    return (client.data as { userId?: number })?.userId
  }

  handleConnection(client: Socket) {
    console.log(`클라이언트 연결됨: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`클라이언트 연결 해제: ${client.id}`)

    // 연결이 끊긴 사용자 제거
    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === client.id) {
        this.userSocketMap.delete(userId)
        break
      }
    }
  }

  @SubscribeMessage('login')
  async handleLogin(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: number
  ) {
    try {
      // 사용자 ID와 소켓 ID 매핑
      this.userSocketMap.set(userId, client.id)
      ;(client.data as { userId?: number }).userId = userId

      console.log(`사용자 ${userId} 로그인됨, 소켓 ID: ${client.id}`)

      // 채팅방 목록 가져오기
      const chatRooms = await this.chatService.getUserChatRooms(userId)
      client.emit('chatRooms', chatRooms)

      // 각 채팅방에 소켓 조인
      chatRooms.forEach((room: any) => {
        void client.join(`room-${room.id}`)
      })

      return { success: true }
    } catch (error) {
      console.error('로그인 오류:', error)
      client.emit('error', '로그인에 실패했습니다.')
      return { success: false, error: '로그인에 실패했습니다.' }
    }
  }

  @SubscribeMessage('createOneToOneChat')
  async handleCreateOneToOneChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() otherUserId: number
  ) {
    const userId = this.getUserId(client)
    if (!userId) {
      client.emit('error', '로그인이 필요합니다.')
      return { success: false, error: '로그인이 필요합니다.' }
    }

    try {
      // 두 사용자 간의 채팅방 조회 또는 생성
      const chatRoom = (await this.chatService.getOrCreateOneToOneChat(
        userId,
        otherUserId
      )) as { id: number; [key: string]: any } | null

      if (!chatRoom || typeof chatRoom.id !== 'number') {
        throw new Error('채팅방 생성 결과가 올바르지 않습니다.')
      }

      // 이전 메시지 가져오기
      const messages = (await this.chatService.getChatMessages(
        chatRoom.id
      )) as any[]
      void client.join(`room-${chatRoom.id}`)
      client.emit('chatRoomJoined', { chatRoom, messages })

      // 상대방도 온라인이면 채팅방에 추가
      const otherSocketId = this.userSocketMap.get(otherUserId)
      if (otherSocketId) {
        const otherSocket = this.server.sockets.sockets.get(otherSocketId)
        if (otherSocket) {
          void otherSocket.join(`room-${chatRoom.id}`)
          otherSocket.emit('newChatRoom', chatRoom)
        }
      }

      return { success: true, chatRoom }
    } catch (error) {
      console.error('채팅방 생성 오류:', error)
      client.emit('error', '채팅방 생성에 실패했습니다.')
      return { success: false, error: '채팅방 생성에 실패했습니다.' }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatRoomId: number; content: string }
  ) {
    const userId = this.getUserId(client)
    if (!userId) {
      client.emit('error', '로그인이 필요합니다.')
      return { success: false, error: '로그인이 필요합니다.' }
    }

    try {
      // 사용자가 채팅방에 속해 있는지 확인
      const isUserInRoom = await this.chatService.isUserInChatRoom(
        userId,
        data.chatRoomId
      )

      if (!isUserInRoom) {
        client.emit('error', '접근 권한이 없습니다.')
        return { success: false, error: '접근 권한이 없습니다.' }
      }

      // 메시지 저장
      const message = await this.chatService.createMessage(
        userId,
        data.chatRoomId,
        data.content
      )

      // 채팅방의 모든 참가자에게 메시지 전송
      this.server.to(`room-${data.chatRoomId}`).emit('newMessage', message)

      return { success: true, message }
    } catch (error) {
      console.error('메시지 전송 오류:', error)
      client.emit('error', '메시지 전송에 실패했습니다.')
      return { success: false, error: '메시지 전송에 실패했습니다.' }
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatRoomId: number
  ) {
    const userId = this.getUserId(client)
    if (!userId) {
      client.emit('error', '로그인이 필요합니다.')
      return { success: false, error: '로그인이 필요합니다.' }
    }

    try {
      // 사용자가 채팅방에 속해 있는지 확인
      const isUserInRoom = await this.chatService.isUserInChatRoom(
        userId,
        chatRoomId
      )

      if (!isUserInRoom) {
        client.emit('error', '접근 권한이 없습니다.')
        return { success: false, error: '접근 권한이 없습니다.' }
      }

      const messages = (await this.chatService.getChatMessages(
        chatRoomId
      )) as any[]
      client.emit('messages', { chatRoomId, messages })

      return { success: true, messages }
    } catch (error) {
      console.error('메시지 조회 오류:', error)
      client.emit('error', '메시지 조회에 실패했습니다.')
      return { success: false, error: '메시지 조회에 실패했습니다.' }
    }
  }
}

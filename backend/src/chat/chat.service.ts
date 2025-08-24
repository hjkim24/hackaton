import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../libs/prisma/src'

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  // 사용자의 채팅방 목록 조회
  async getUserChatRooms(userId: number) {
    return await this.prisma.chatRoom.findMany({
      where: {
        participants: {
          some: { id: userId }
        }
      },
      include: {
        participants: {
          select: { id: true, nickname: true }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }

  // 1대1 채팅방 조회 또는 생성
  async getOrCreateOneToOneChat(userId1: number, userId2: number) {
    // 두 사용자 간의 기존 채팅방 찾기
    const existingChatRoom = await this.prisma.chatRoom.findFirst({
      where: {
        AND: [
          { participants: { some: { id: userId1 } } },
          { participants: { some: { id: userId2 } } }
        ],
        participants: {
          every: {
            id: { in: [userId1, userId2] }
          }
        }
      },
      include: {
        participants: {
          select: { id: true, nickname: true }
        }
      }
    })

    if (existingChatRoom) {
      return existingChatRoom
    }

    // 채팅방이 없으면 새로 생성
    return await this.prisma.chatRoom.create({
      data: {
        participants: {
          connect: [{ id: userId1 }, { id: userId2 }]
        }
      },
      include: {
        participants: {
          select: { id: true, nickname: true }
        }
      }
    })
  }

  // 채팅방의 메시지 목록 조회
  async getChatMessages(chatRoomId: number) {
    return await this.prisma.message.findMany({
      where: {
        chatRoomId
      },
      include: {
        sender: {
          select: { id: true, nickname: true }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
  }

  // 메시지 생성
  async createMessage(senderId: number, chatRoomId: number, content: string) {
    // 메시지 생성하고 채팅방 updatedAt 업데이트
    const message = await this.prisma.message.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        chatRoom: { connect: { id: chatRoomId } }
      },
      include: {
        sender: {
          select: { id: true, nickname: true }
        }
      }
    })

    // 채팅방 업데이트 시간 갱신
    await this.prisma.chatRoom.update({
      where: { id: chatRoomId },
      data: { updatedAt: new Date() }
    })

    return message
  }

  // 사용자가 채팅방에 속해 있는지 확인
  async isUserInChatRoom(userId: number, chatRoomId: number) {
    const count = await this.prisma.chatRoom.count({
      where: {
        id: chatRoomId,
        participants: {
          some: { id: userId }
        }
      }
    })

    return count > 0
  }
}

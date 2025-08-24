// frontend/stores/webSocketStore.ts

import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../backend/src/chat/interfaces/message.interface';

interface ChatRoom {
  id: number;
  participants: Array<{ id: number; nickname: string }>;
  messages: Message[];
}

interface WebSocketState {
  socket: Socket | null;
  chatRooms: ChatRoom[];
  messages: Message[];
  currentRoomId: number | null;
  error: string | null;
  
  connect: (userId: number, onConnect?: () => void) => void;
  disconnect: () => void;
  setCurrentRoom: (roomId: number) => void;
  sendMessage: (chatRoomId: number, content: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  chatRooms: [],
  messages: [],
  currentRoomId: null,
  error: null,

  connect: (userId, onConnect) => {
    const socket = io('http://localhost:3000');
    set({ socket });

    socket.on('connect', () => {
      console.log('서버에 연결됨');
      socket.emit('login', userId);
      onConnect?.();
    });

    socket.on('chatRooms', (rooms: ChatRoom[]) => {
      console.log('채팅방 목록:', rooms);
      set({ chatRooms: rooms });
    });

    socket.on('chatRoomJoined', ({ chatRoom, messages }: { chatRoom: ChatRoom; messages: Message[] }) => {
      console.log('채팅방 입장:', chatRoom);
      set({ messages, currentRoomId: chatRoom.id });
    });

    socket.on('newMessage', (message: Message) => {
      console.log('새 메시지:', message);
      set((state) => ({ messages: [...state.messages, message] }));
    });

    socket.on('error', (error: string) => {
      console.error('서버 에러:', error);
      set({ error });
    });
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, chatRooms: [], messages: [], currentRoomId: null });
  },
  
  setCurrentRoom: (roomId) => {
    const socket = get().socket;
    if (!socket) return;
    
    set({ currentRoomId: roomId, messages: [] });
    socket.emit('getMessages', roomId);
  },

  sendMessage: (chatRoomId, content) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit('sendMessage', { chatRoomId, content });
  },
}));
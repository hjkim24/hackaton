import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials } from '@/types/auth';
import { validateCredentials } from '@/lib/dummyUsers';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        
        try {
          const user = validateCredentials(credentials.username, credentials.password);
          
          if (user) {
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
            
            return {
              success: true,
              message: '로그인 성공!',
            };
          } else {
            set({ isLoading: false });
            return {
              success: false,
              message: '아이디 또는 비밀번호가 올바르지 않습니다.',
            };
          }
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            message: '로그인 중 오류가 발생했습니다.',
          };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

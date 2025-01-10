import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, phoneNumber: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual login logic
      const mockUser: User = {
        id: '1',
        email,
        phoneNumber: '+234...',
        isVerified: false,
        has2FA: false,
        kycStatus: 'pending',
        wallets: {
          BTC: { balance: 0, address: '...' },
          ETH: { balance: 0, address: '...' },
          USDT: { balance: 0, address: '...' },
          NGN: { balance: 0, address: '...' },
        },
      };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  register: async (email: string, password: string, phoneNumber: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual registration logic
      const mockUser: User = {
        id: '1',
        email,
        phoneNumber,
        isVerified: false,
        has2FA: false,
        kycStatus: 'pending',
        wallets: {
          BTC: { balance: 0, address: '...' },
          ETH: { balance: 0, address: '...' },
          USDT: { balance: 0, address: '...' },
          NGN: { balance: 0, address: '...' },
        },
      };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
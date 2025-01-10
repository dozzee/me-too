export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  has2FA: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  wallets: {
    [key: string]: {
      balance: number;
      address: string;
    };
  };
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
}

export interface WalletBalance {
  currency: string;
  balance: number;
  value: number;
}
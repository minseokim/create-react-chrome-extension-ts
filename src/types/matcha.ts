import type { TransactionStatus } from '../contexts/transaction-watcher';
import type { TokensStats } from '../contexts/token-stats';
import { LimitOrderStatus } from '../contexts/limit-orders';
import Decimal from 'decimal.js-light';

export interface DashboardStats {
  trades: {
    total: number;
  };
  volumes: {
    usdTotal?: Decimal;
  };
  savings: {
    summary: {
      minimum?: Decimal;
      maximum?: Decimal;
      average?: Decimal;
      comparisonsCount?: Decimal;
      txCount?: Decimal;
    };
  };
}

export interface NewsItem {
  source: string;
  title: string;
  pubDate: Date;
  imageUrl?: string;
  link: string;
  relevantTokens: string[];
}

export interface AssetMetadata {
  defaultToLimitOrder?: boolean;
  allowedPairs?: Array<string>;
  coingeckoId?: string;
}

export interface Asset<T = AssetMetadata> {
  symbol: string;
  name: string;
  decimals: number;
  tokenAddress: string;
  primaryColor: string;
  secondaryColor: string;
  importType: AssetImportType;
  aliases?: string[];
  metadata?: Partial<T>;
}

export type AssetImportType = 'external' | 'curated' | 'custom';

export interface MarketPair {
  quoteToken: Asset;
  baseToken: Asset;
}

export interface MarketPairWithVolume extends MarketPair {
  volume24h: number;
}

export type AssetMap<T = AssetMetadata> = {
  [tokenSymbol: string]: Asset<T>;
};

export type MarketPairMap = {
  [tokenSymbol: string]: MarketPair[];
};

// TODO(johnrjj) - Find a name for this. It's the unopinionated version of base/quote
export interface GenericMarketPair {
  asset1: Asset;
  asset2: Asset;
}

export interface AssetTrade extends Asset {
  amount: number;
  amountInUsd?: number;
}

// TODO: this may be worth marshaling into a similar format to DexTrade
export interface DexTradeHistory {
  txHash: string;
  txSender: string;
  txTime: Date;
  makerFee: number;
  takerFee: number;
  buyAsset: AssetTrade;
  sellAsset: AssetTrade;
}

// shared metadata type, used as the core ancestor of all trade metadata
export interface TradeMetadata {}

export interface MarketOrderDexTradeMetadata extends TradeMetadata {
  type: 'market';
  txTime: Date;
  txHash: string;
  txSender: string;
  status: TransactionStatus;
}

export interface LimitOrderDexTradeMetadata extends TradeMetadata {
  type: 'limit';
  status: LimitOrderStatus;
  orderHash: string;
  createdAtTime: Date;
  remainingBuyAssetAmount: number;
}

export interface DexTrade<T = TradeMetadata> {
  buyAsset: AssetTrade;
  sellAsset: AssetTrade;
  metadata: T;
}

export type MarketOrderDexTrade = DexTrade<MarketOrderDexTradeMetadata>;
export type LimitOrderDexTrade = DexTrade<LimitOrderDexTradeMetadata>;

export interface AddressWhitelistRequestBody {
  socialId: string;
  inviteKey: string;
  ethAddress: string;
}

export interface AddressWhitelistStatusResponse {
  ethAddress: string;
  hasAccess: boolean;
}

export interface TokenList {
  id: string; // unique identifier used to identify list
  description?: string;
  title: string;
  backgroundColor: string;
  pickAssets: (assets: Asset[], assetsStatsMap: TokensStats) => Asset[]; // order matters from response
}

export type TokenListMap = {
  [id: string]: TokenList;
};

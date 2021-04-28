export interface BloxyDexTradeRequestParameters {
  key: string; // Your API Key
  format?: string; // Optional, one of: structure, table, csv
  protocol?: string; // optional string : Optional filter by protocol name(s).
  smart_contract_address?: string; // optional address : Optional filter by DEX smart contract(s).
  token?: string; // optional address : Optional filter by ANY token ( buy or sell side) address.
  buyToken?: string; // optional address : Optional filter by Buy token address.
  sellToken?: string; // optional address : Optional filter by Sell token address.
  maker?: string; // optional address : Optional filter by maker address.
  taker?: string; // optional address : Optional filter by taker address.
  tx_sender?: string; // optional address : Optional filter by sender address.
  price_currency?: string; // optional string : Currency to report amounts (USD or ETH). default is USD
  limit?: number; // optional integer : Maximum amount of results in the list. default is 1000, min 1, max 100000
  offset?: number; // optional integer : Offset of the list. default is 0, min 0, max 100000
  from_date?: string; // optional date : Since date. default is today
  till_date?: string; // optional date : Till date. default is today
}

export interface BloxyDexTrade {
  tx_hash: string;
  tx_time: string;
  tx_sender: string;
  smart_contract_id: number;
  smart_contract_address: string;
  contract_type: string; // "DEX/Zerox Exchange v3"
  maker: string;
  taker: string;
  amountBuy: number;
  amountBuyInCurrency: number;
  makerFee: number;
  buyCurrencyId: number;
  buySymbol: string;
  amountSell: number;
  amountSellInCurrency: number;
  takerFee: number;
  sellCurrencyId: number;
  sellSymbol: string;
  tradeIndex: string;
  maker_annotation?: string;
  taker_annotation?: string;
  sellAddress: string;
  buyAddress: string;
  protocol: string; // "Zerox Exchange v3"
}

export interface BloxyDailyValue {
  total: 'true' | 'false';
  symbol: string;
  date: string; // '2020-03-25';
  deposit: number;
  withdraw: number;
  deposit_value: number;
  withdraw_value: number;
  daily_price: number;
  change: number;
  daily_balance: number;
  daily_value: number;
  daily_profit: number;
  profit_lifetime: number;
  profit: number;
  deposited: number;
  in_daily_value: number;
  roi_daily: number;
  token_address: string;
  realized_gain: number;
  unrealized_gain: number;
}

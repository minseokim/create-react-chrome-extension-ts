import type Decimal from 'decimal.js-light';
import type BigNumber from 'bignumber.js';
import isNil from 'lodash/isNil';

// page:	The page index (1-indexed) of returned in the response (same as request if provided).
// perPage:	The amount of records requested in the pagination, but not necessarily returned.
// total:	The total amount of records in the collection (accross all pages).
// records:	The actual records returned for this page of the collection.
export interface PaginatedApiReponse<T> {
  total: number;
  page: number;
  perPage?: number;
  records: Array<T>;
}

export interface BasePaginationOptions {
  page?: number; // (default: 1)
  perPage?: number; // (default: 20, max: 1000)
}

// Don't want to pull in 0x packages (heavy bundle size) for static types
// These are fine to be duplicated here as we don't expect them to change (sealed into the v3 protocol spec)
export interface SerializedOrder {
  chainId: number;
  exchangeAddress: string;
  makerAddress: string;
  takerAddress: string;
  feeRecipientAddress: string;
  senderAddress: string;
  makerAssetAmount: string;
  takerAssetAmount: string;
  makerFee: string;
  takerFee: string;
  expirationTimeSeconds: string;
  salt: string;
  makerAssetData: string;
  takerAssetData: string;
  makerFeeAssetData: string;
  takerFeeAssetData: string;
}

export interface SerializedSignedOrder extends SerializedOrder {
  signature: string;
}

export interface DefaultMetadata {
  orderHash: string;
  remainingFillableTakerAssetAmount: string;
  createdAt?: string;
}

export interface SerializedOrderData<T = DefaultMetadata> {
  metaData: T;
  order: SerializedSignedOrder;
}

export interface Order {
  chainId: number;
  exchangeAddress: string;
  makerAddress: string;
  takerAddress: string;
  feeRecipientAddress: string;
  senderAddress: string;
  makerAssetAmount: Decimal;
  takerAssetAmount: Decimal;
  makerFee: Decimal;
  takerFee: Decimal;
  expirationTimeSeconds: Decimal;
  salt: Decimal;
  makerAssetData: string;
  takerAssetData: string;
  makerFeeAssetData: string;
  takerFeeAssetData: string;
}

export interface OrderWithBigNumber {
  chainId: number;
  exchangeAddress: string;
  makerAddress: string;
  takerAddress: string;
  feeRecipientAddress: string;
  senderAddress: string;
  makerAssetAmount: BigNumber;
  takerAssetAmount: BigNumber;
  makerFee: BigNumber;
  takerFee: BigNumber;
  expirationTimeSeconds: BigNumber;
  salt: BigNumber;
  makerAssetData: string;
  takerAssetData: string;
  makerFeeAssetData: string;
  takerFeeAssetData: string;
}

export interface SignedOrder extends Order {
  signature: string;
}

export interface SignedOrderWithBigNumber extends OrderWithBigNumber {
  signature: string;
}

export interface SerializedOrder {
  chainId: number;
  exchangeAddress: string;
  makerAddress: string;
  takerAddress: string;
  feeRecipientAddress: string;
  senderAddress: string;
  makerAssetAmount: string;
  takerAssetAmount: string;
  makerFee: string;
  takerFee: string;
  expirationTimeSeconds: string;
  salt: string;
  makerAssetData: string;
  takerAssetData: string;
  makerFeeAssetData: string;
  takerFeeAssetData: string;
}

export interface SerializedSignedOrder extends SerializedOrder {
  signature: string;
}

// From https://github.com/0xProject/0x-api/blob/master/src/types.ts

// Note: enums are technically values (not types) in JS/TS
export enum ERC20BridgeSource {
  Native = 'Native',
  ZeroEx = '0x',
  Mesh = 'Mesh',
  Uniswap = 'Uniswap',
  UniswapV2 = 'Uniswap_V2',
  Eth2Dai = 'Eth2Dai',
  Kyber = 'Kyber',
  Curve = 'Curve',
  LiquidityProvider = 'LiquidityProvider',
  MultiBridge = 'MultiBridge',
  Balancer = 'Balancer',
  Bancor = 'Bancor',
  Mooniswap = 'Mooniswap',
  DODO = 'DODO',
  DODO_V2 = 'DODO_V2',
  mStable = 'mStable',
  MultiHop = 'MultiHop',
  Swerve = 'Swerve',
  SushiSwap = 'SushiSwap',
  Shell = 'Shell',
  CREAM = 'CREAM',
  SnowSwap = 'SnowSwap',
  CryptoCom = 'CryptoCom',
  Linkswap = 'Linkswap',
  'MakerPsm' = 'MakerPsm',
  'KyberDMM' = 'KyberDMM',
  'Smoothy' = 'Smoothy',
  'Component' = 'Component',
  'Saddle' = 'Saddle',
}

export enum GeneralErrorCodes {
  ValidationError = 100,
  MalformedJson = 101,
  OrderSubmissionDisabled = 102,
  Throttled = 103,
  NotImplemented = 104,
  TransactionInvalid = 105,
  UnableToSubmitOnBehalfOfTaker = 106,
  InvalidAPIKey = 107,
  ServiceDisabled = 108,
}

export enum ValidationErrorCodes {
  RequiredField = 1000,
  IncorrectFormat = 1001,
  InvalidAddress = 1002,
  AddressNotSupported = 1003,
  ValueOutOfRange = 1004,
  InvalidSignatureOrHash = 1005,
  UnsupportedOption = 1006,
  InvalidOrder = 1007,
  InternalError = 1008,
  TokenNotSupported = 1009,
}

// See https://0x.org/docs/api#error-reporting-format
export type ErrorCodes = GeneralErrorCodes | ValidationErrorCodes;

export interface ValidationError {
  field: string;
  code: ErrorCodes;
  reason: string;
}

export interface GetSwapQuoteResponseError {
  code: ErrorCodes;
  reason: string;
  validationErrors?: Array<ValidationError>;
  values?: any;
}

export interface GetSwapQuoteRequestParams {
  sellToken: string;
  buyToken: string;
  takerAddress?: string;
  sellAmount?: Decimal;
  buyAmount?: Decimal;
  slippagePercentage?: number;
  gasPrice?: Decimal;
  excludedSources?: ERC20BridgeSource[];
  affiliateAddress?: string;
  skipValidation?: boolean;
  includePriceComparisons?: boolean;
}

export interface GetMetaTransactionSwapQuoteRequestParams {
  sellToken: string;
  buyToken: string;
  takerAddress: string;
  sellAmount?: Decimal;
  buyAmount?: Decimal;
  slippagePercentage?: number;
  excludedSources?: ERC20BridgeSource[];
  skipValidation?: boolean;
}

export type GetSwapQuoteUnifiedSerializedResponse =
  | GetSwapQuoteSerializedResponse
  | GetSwapRFQTPriceOnlyQuoteSerializedResponse
  | GetMetaTransactionSwapQuoteSerializedResponse;

export interface GetSwapQuoteSerializedResponse {
  price: string;
  to: string;
  data: string;
  gasPrice: string;
  protocolFee: string;
  orders: SignedOrder[]; //TODO(johnrjj ) - Need SerializedSignedOrder[]
  buyAmount: string;
  sellAmount: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  value: string;
  sources: GetSwapQuoteSerializedResponseLiquiditySource[];
  gas: string;
  minimumProtocolFee: string;
  estimatedGas: string;
  estimatedGasTokenRefund: string;
  priceComparisons?: GetSwapQuotePriceComparison[];
  allowanceTarget: string;
  from?: string;
}

export interface GetSwapRFQTPriceOnlyQuoteSerializedResponse {
  price: string;
  gasPrice: string;
  protocolFee: string;
  // Orders are not included in an RFQT price only quote
  buyAmount: string;
  sellAmount: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  value: string;
  sources: GetSwapQuoteSerializedResponseLiquiditySource[];
  minimumProtocolFee: string;
  estimatedGas: string;
  estimatedGasTokenRefund: string;
  priceComparisons?: GetSwapQuotePriceComparison[];
  gas: string;
  allowanceTarget: string;
}

export interface GetMetaTransactionSwapQuoteSerializedResponse {
  price: string;
  buyAmount: string;
  sellAmount: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  mtxHash: string;
  mtx: SerializedExchangeProxyMetaTransaction;
  orders: SignedOrder[];
  sources: GetSwapQuoteSerializedResponseLiquiditySource[];
  gasPrice: string;
  minimumProtocolFee: string;
  estimatedGas: string;
  estimatedGasTokenRefund: string;
  priceComparisons?: GetSwapQuotePriceComparison[];
  allowanceTarget: string;

  // Get Kim to add gas to meta-tx response
  gas: string;
}

export enum MetaTransactionTxStates {
  // transaction has been constructed, but not yet submitted to the network.
  Unsubmitted = 'unsubmitted',
  // transaction has been submitted to the network.
  Submitted = 'submitted',
  // transaction has been spotted in the mempool.
  Mempool = 'mempool',
  // transaction has not been mined in the expected time.
  Stuck = 'stuck',
  // transaction has been mined.
  Included = 'included',
  // transaction is confirmed.
  Confirmed = 'confirmed',
  // transaction is no longer in the mempool.
  Dropped = 'dropped',
  // transaction has been aborted because a new transaction with the same
  // nonce has been mined.
  Aborted = 'aborted',
  // transaction was in an unsubmitted state for too long.
  Cancelled = 'cancelled',
}

export enum EthereumTxStatus {
  Success = 1,
  Failed = 0,
}

export interface GetMetaTransactionTxStatusSerializedResponse {
  refHash: string;
  hash?: string;
  status: MetaTransactionTxStates;
  gasPrice?: string;
  updatedAt?: string;
  blockNumber?: number;
  expectedMinedInSec?: number;
  ethereumTxStatus?: EthereumTxStatus;
}

export interface GetSwapQuoteFormattedResponse {
  price: Decimal;
  to: string;
  data: string;
  gasPrice: Decimal;
  protocolFee: Decimal;
  orders: SignedOrder[];
  buyAmount: Decimal;
  sellAmount: Decimal;
  buyTokenAddress: string;
  sellTokenAddress: string;
  value: Decimal;
  sources: GetSwapQuoteFormattedResponseLiquiditySource[];
  gas?: Decimal;
  minimumProtocolFee: Decimal;
  estimatedGas: Decimal;
  estimatedGasTokenRefund: Decimal;
  priceComparisons?: GetSwapQuotePriceComparison[];
  from?: string;
}

export interface GetSwapQuotePriceComparison {
  name: ERC20BridgeSource;
  price: string | null;
  gas: string | null;
}

export interface GetSwapQuoteSerializedResponseLiquiditySource {
  name: ERC20BridgeSource;
  proportion: string;
}

export interface GetSwapQuoteSerializedResponseLiquiditySourceMultiHop {
  name: 'MultiHop';
  proportion: string;
  hops?: Array<ERC20BridgeSource>;
  intermediateToken?: string;
}

export interface GetSwapQuoteFormattedResponseLiquiditySource {
  name: ERC20BridgeSource;
  proportion: Decimal;
}

export interface TokenMetadata {
  symbol: string;
  decimals: number;
  tokenAddress: string;
}

export interface PostMetaTransactionSubmitRequestParams {
  signature: string;
  transaction: SerializedExchangeProxyMetaTransaction;
}

export interface PostMetaTransactionSubmitSerializedResponse {
  mtxHash: string;
  txHash: string;
}

export interface MetatransactionSignerStatusResponse {
  isLive: boolean;
}

// Copied from @0x/types
export interface EIP712DomainWithDefaultSchema {
  name?: string;
  version?: string;
  chainId: number;
  verifyingContract: string;
}
export const isExchangeProxyMetaTransaction = (
  tx:
    | SerializedZeroExTransaction
    | SerializedExchangeProxyMetaTransaction
    | ExchangeProxyMetaTransaction
    | ZeroExTransaction,
): tx is
  | SerializedExchangeProxyMetaTransaction
  | ExchangeProxyMetaTransaction =>
  !isNil((tx as SerializedExchangeProxyMetaTransaction).callData);

// Copied from @0x/types and modified into a serialized format
export interface ExchangeProxyMetaTransaction {
  signer: string;
  sender: string;
  minGasPrice: BigNumber;
  maxGasPrice: BigNumber;
  expirationTimeSeconds: BigNumber;
  salt: BigNumber;
  callData: string;
  value: BigNumber;
  feeToken: string;
  feeAmount: BigNumber;
  domain: EIP712DomainWithDefaultSchema;
}

export interface SerializedExchangeProxyMetaTransaction {
  signer: string;
  sender: string;
  minGasPrice: string;
  maxGasPrice: string;
  expirationTimeSeconds: string;
  salt: string;
  callData: string;
  value: string;
  feeToken: string;
  feeAmount: string;
  domain: EIP712DomainWithDefaultSchema;
}
export interface SerializedZeroExTransaction {
  salt: string;
  expirationTimeSeconds: string;
  gasPrice: string;
  signerAddress: string;
  data: string;
  domain: EIP712DomainWithDefaultSchema;
}

export interface ZeroExTransaction {
  salt: BigNumber;
  expirationTimeSeconds: BigNumber;
  gasPrice: BigNumber;
  signerAddress: string;
  data: string;
  domain: EIP712DomainWithDefaultSchema;
}

export interface DepthFetchResponseDepthDataPoint {
  price: string;
  bucket: string;
  bucketTotal: string;
  cumulative: string;
  sources: {
    [source: string]: string;
  };
}

export interface DepthFetchResponse {
  asks: {
    depth: Array<DepthFetchResponseDepthDataPoint>;
  };
  bids: {
    depth: Array<DepthFetchResponseDepthDataPoint>;
  };
  buyToken: {
    symbol: string;
    decimals: number;
    tokenAddress: string;
  };
  sellToken: {
    symbol: string;
    decimals: number;
    tokenAddress: string;
  };
}

export interface DepthFetchErrorResponse {
  reason?: string;
}

export interface DepthFetchResponseDepthDataPointWithAccumulatedSources
  extends DepthFetchResponseDepthDataPoint {
  accumulatedSources: {
    [source: string]: Decimal;
  };
}

export interface DepthFetchResponseDepthDataPointWithAccumulatedSourcesAndGroupedData
  extends DepthFetchResponseDepthDataPointWithAccumulatedSources {
  groupedSources: {
    [source: string]: Decimal;
  };
}

export interface BucketData {
  price: number;
  bucket: number;
  cumulative: number;
}

export interface GraphDataPoint {
  price: number;
  cumulative: number;
  bucket: number;
  [source: string]: any;
}

export type DataFormatThing = Array<GraphDataPoint>;

import { lighten } from 'polished';
import { LiquiditySourceGroup } from '../utils/0x-api';

const fontSizes = {
  xl: '64px',
  lg: '32px',
  md: '15px',
};

const palette = {
  white: '#ffffff',
  black: '#0E103C',
  darkYellow: '#7C560B',
  mutedYellow: '#FFF8EB',
  mutedOrange: '#FBEFE9',
  darkOrange: '#381A0C',
  grey: '#7578b5',
  mutedPurple: '#E8ECFD',
  purple: '#8E8CFF',
  darkPurple: '#0F1C46',
  mutedRef: '#FDE8F0',
  matchaRed: '#FF656D',
};

// Based on webflow's breakpoints
const breakpoints = {
  xs: '360px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

type BreakPointType = typeof breakpoints;

const generateMediaQueries = (points: BreakPointType) => ({
  sm: `(min-width: ${points.sm})`,
  md: `(min-width: ${points.md})`,
  lg: `(min-width: ${points.lg})`,
  xl: `(min-width: ${points.xl})`,
  hover: '(hover: hover)',
});

export type LiquiditySourceGroupToHexColor = {
  [key in LiquiditySourceGroup]: string;
};

export const liquiditySourceColors: LiquiditySourceGroupToHexColor = {
  '0x': '#706EFF',
  'Uniswap': '#DD1EE1',
  'Kyber': '#25A680',
  'Curve': '#3465A4',
  'Oasis': '#FF9C09',
  'Balancer': '#7578B5',
  'Bancor': '#0F59D1',
  'Mooniswap': '#2D3037',
  'DODO': '#FFC909',
  'mStable': '#306FD7',
  'MultiHop': '#706EFF',
  'Swerve': '#D16C00',
  'SushiSwap': '#00C5A2',
  'Shell': '#0043ff',
  'CREAM': '#afa3ff',
  'SnowSwap': '#00b9c2',
  'CryptoCom': '#07286C',
  'Linkswap': '#2b3a4a',
  'MakerPsm': '#0aa18f',
  'KyberDMM': '#25A680',
  'Smoothy': '#F3A1AD',
  'Component': '#FF42A1',
  'Saddle': '#3800D6',
};

// Unique liquidity sources as defined by our color theming
export const liquiditySourceKeys = Object.keys(liquiditySourceColors);
export const liquiditySourceCount = Object.keys(liquiditySourceColors).length;

export const TOKEN_GRADIENT_CSS_MAP = {
  REPV2: 'linear-gradient(180deg, #E2FFF8 0%, #D2FFF4 100%)',
  USDC: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  ZRX: 'linear-gradient(180deg, #D7D7D7 0%, #C0C0C0 100%)',
  BTC: 'linear-gradient(180deg, #FFE8CC 0%, #FFD6A4 100%)',
  WBTC: 'linear-gradient(180deg, #FFF6E7 0%, #FFEDD1 100%)',
  LINK: 'linear-gradient(180deg, #B8CBFF 0%, #608BFF 100%)',
  BAT: 'linear-gradient(180deg, #FFEAD5 0%, #FEC698 100%)',
  KNC: 'linear-gradient(180deg, #D6FFFA 0%, #9FFDF1 100%)',
  DAI: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  USDT: 'linear-gradient(180deg, #D7FFFC 0%, #A9FFF7 100%)',
  SNX: 'linear-gradient(180deg, #E3E3F0 0%, #D3D3E4 100%)',
  ANT: ' linear-gradient(180deg, #CBF8FF 0%, #AEF4FF 100%)',
  ENJ: 'linear-gradient(180deg, #DCD3FF 0%, #B1ABED 100%)',
  SNT: 'linear-gradient(180deg, #D7DFFF 0%, #A5AAFF 100%)',
  TUSD: 'linear-gradient(180deg, #CCD3FF 0%, #97A5F5 100%)',
  ETH: 'linear-gradient(180deg, #E4EAFD 0%, #BCC8F1 100%)',
  WETH: 'linear-gradient(180deg, #E4EAFD 0%, #BCC8F1 100%)',
  REN: 'linear-gradient(180deg, #E1E7F8 0%, #ADB7CE 100%)',
  IMBTC: 'linear-gradient(180deg, #E7E9FF 0%, #D0D4F1 100%)',
  NMR: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  MKR: 'linear-gradient(180deg, #CBFFFB 0%, #C7FEF9 100%)',
  MANA: 'linear-gradient(180deg, #FFE6DA 0%, #FFC0A3 100%)',
  COMP: 'linear-gradient(180deg, #D5FBF1 0%, #BFFAEB 100%)',
  UMA: 'linear-gradient(180deg, #FFD9E0 0%, #FFAFC0 100%)',
  RENBTC: 'linear-gradient(180deg, #B8CBFF 0%, #608BFF 100%)',
  BAL: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  LEND: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  YFI: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  AMPL: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  KEEP: 'linear-gradient(180deg, #CFFFF1 0%, #A6FFE6 100%)',
  CRV: 'linear-gradient(180deg, #FFD5C7 0%, #BCC4FF 100%)',
  OMG: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  BAND: 'linear-gradient(180deg, #9FCAFF 0%, #529FFF 100%)',
  PAX: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  BUSD: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  FOAM: 'linear-gradient(180deg, #FFF1EE 0%, #FFF1EE 100%)',
  LPT:
    'linear-gradient(180deg, rgba(113, 252, 164, 0.5) 0%, rgba(103, 242, 154, 0.5) 100%)',
  MUSD: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  BNT: 'linear-gradient(180deg, #B8CBFF 0%, #608BFF 100%)',
  DONUT: 'linear-gradient(180deg, #FFD2E5 0%, #FF94BF 100%)',
  BZRX: 'linear-gradient(180deg, #9FCAFF 0%, #529FFF 100%)',
  UNI: 'linear-gradient(180deg, #FFF2F8 0%, #F9CBE0 100%)',
  SUSD: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  SETH: 'linear-gradient(180deg, #CFFFE2 0%, #A6FFBF 100%)',
  $BASED: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  SRM: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  AKRO: 'linear-gradient(180deg, #FBEFFF 0%, #E8C1FF 100%)',
  SWRV: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  QNT: 'linear-gradient(180deg, #DCD3FF 0%, #B1ABED 100%)',
  TBTC: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  SUSHI: 'linear-gradient(180deg, #CCD3FF 0%, #97A5F5 100%)',
  PAXG: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  PICKLE: 'linear-gradient(180deg, #D6FFCF 0%, #B8FFA6 100%)',
  STAKE: 'linear-gradient(180deg, #CFFFF1 0%, #A6FFE6 100%)',
  CREAM: 'linear-gradient(180deg, #CFFFF1 0%, #A6FFE6 100%)',
  RENZEC: 'linear-gradient(180deg, #EEEEEE 0%, #C2C2C2 100%)',
  AAVE: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  AUDIO: 'linear-gradient(180deg, #FBEFFF 0%, #E8C1FF 100%)',
  MTA: 'linear-gradient(180deg, #E1E1E1 0%, #A5A5A5 100%)',
  BOND: 'linear-gradient(180deg, #FFD3D3 0%, #FFB6B6 100%)',
  GUSD: 'linear-gradient(180deg, #ABEDFF 0%, #98E3FF 100%)',
  WCELO: 'linear-gradient(180deg, #FFEFB1 0%, #FFECA6 100%)',
  WCUSD: 'linear-gradient(180deg, #D6FFCF 0%, #B8FFA6 100%)',
};

export const UnknownTokenGradient = '#E8ECFD';
export const UnknownTokenSecondaryColor = '#E8ECFD';
export const UnknownTokenPrimaryColor = '#1F1F41';

export const getTokenGradientBySymbol = (
  symbol: string,
): string | undefined => {
  const normalizedSymbol = symbol.toUpperCase();
  return (TOKEN_GRADIENT_CSS_MAP as any)[normalizedSymbol];
};

// Based on Bootstrap z-indexes
const zIndices = {
  sticky: 1020,
  fixed: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

const fontWeights = {
  h1: 600,
  semiBold: 600,
  medium: 500,
};

const opacities = {
  secondaryText: 0.6,
};

const lightTheme = {
  zIndices,
  fontWeights,
  breakpoints,
  fontSizes: {
    h1: fontSizes.xl,
    paragraph: fontSizes.md,
    navLink: fontSizes.md,
  },
  palette,
  colors: {
    backgroundColor: palette.white,
    primaryText: palette.black,
    secondaryText: lighten(opacities.secondaryText, palette.black),
    liquiditySourceColors,
  },
  mediaQueries: generateMediaQueries(breakpoints),
};

export type ITheme = typeof lightTheme;

const themes = {
  light: lightTheme,
};

export { themes };

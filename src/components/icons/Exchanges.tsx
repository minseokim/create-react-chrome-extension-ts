import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

// Raw SVG Components
type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const ShellIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/shell.svg')} />
);

const BalancerIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/balancer.svg')} />
);

const BancorIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/bancor.svg')} />
);

const CurveIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/curve.svg')} />
);

const DodoIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/dodo.svg')} />
);

const KyberIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/kyber.svg')} />
);

const MooniswapIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/mooniswap.svg')} />
);

const MStableIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/mstable.svg')} />
);

const OasisIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/oasis.svg')} />
);

const UniswapIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/uniswap.svg')} />
);

const ZeroExIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/0x.svg')} />
);

const SushiSwapIcon = (props: ImageProps) => (
  <img {...props} src={require('../icons/svg/sushiswap.svg')} />
);

const LOOKUP: {
  [key: string]: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
  ) => JSX.Element;
} = {
  BALANCER: BalancerIcon,
  CURVE: CurveIcon,
  BANCOR: BancorIcon,
  DODO: DodoIcon,
  KYBER: KyberIcon,
  MOONISWAP: MooniswapIcon,
  MSTABLE: MStableIcon,
  OASIS: OasisIcon,
  UNISWAP: UniswapIcon,
  ZEROEX: ZeroExIcon,
  SHELL: ShellIcon,
  SUSHISWAP: SushiSwapIcon,
};

const ExchangeIcon: React.FC<
  {
    exchangeId: string | undefined; // TODO(dave4506) better naming
  } & ImageProps
> = ({ exchangeId, ...rest }) => {
  const IconComponent = exchangeId ? LOOKUP[exchangeId] : null;

  return <>{IconComponent && <IconComponent {...rest} />}</>;
};

export {
  ExchangeIcon,
  BalancerIcon,
  BancorIcon,
  CurveIcon,
  DodoIcon,
  KyberIcon,
  MooniswapIcon,
  MStableIcon,
  OasisIcon,
  UniswapIcon,
  ZeroExIcon,
  ShellIcon,
  SushiSwapIcon,
};

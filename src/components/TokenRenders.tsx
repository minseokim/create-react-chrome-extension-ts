import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

// Raw SVG Components
type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

// You might be wondering, why list all these token renders by hand?
// By statically declaring images ahead of build time, we can leverage off-the-shelf image optimization
// Read more here: https://github.com/cyrilwanner/next-optimized-images
const BatRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/bat.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/bat.png')} type="image/png" />
    <img {...props} src={require('../images/renders/bat.png')} />
  </picture>
);
const DaiRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/dai.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/dai.png')} type="image/png" />
    <img {...props} src={require('../images/renders/dai.png')} />
  </picture>
);
const KncRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/knc.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/knc.png')} type="image/png" />
    <img {...props} src={require('../images/renders/knc.png')} />
  </picture>
);
const LinkRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/link.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/link.png')} type="image/png" />
    <img {...props} src={require('../images/renders/link.png')} />
  </picture>
);
const RepV2Render = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/repv2.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/repv2.png')} type="image/png" />
    <img {...props} src={require('../images/renders/repv2.png')} />
  </picture>
);
const SnxRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/snx.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/snx.png')} type="image/png" />
    <img {...props} src={require('../images/renders/snx.png')} />
  </picture>
);
const UsdcRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/usdc.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/usdc.png')} type="image/png" />
    <img {...props} src={require('../images/renders/usdc.png')} />
  </picture>
);
const WbtcRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/wbtc.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/wbtc.png')} type="image/png" />
    <img {...props} src={require('../images/renders/wbtc.png')} />
  </picture>
);
const ZrxRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/zrx.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/zrx.png')} type="image/png" />
    <img {...props} src={require('../images/renders/zrx.png')} />
  </picture>
);
const EnjRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/enj.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/enj.png')} type="image/png" />
    <img {...props} src={require('../images/renders/enj.png')} />
  </picture>
);
const AntRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/ant.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/ant.png')} type="image/png" />
    <img {...props} src={require('../images/renders/ant.png')} />
  </picture>
);
const SntRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/snt.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/snt.png')} type="image/png" />
    <img {...props} src={require('../images/renders/snt.png')} />
  </picture>
);
const TusdRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/tusd.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/tusd.png')} type="image/png" />
    <img {...props} src={require('../images/renders/tusd.png')} />
  </picture>
);
const EthRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/eth.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/eth.png')} type="image/png" />
    <img {...props} src={require('../images/renders/eth.png')} />
  </picture>
);
const WethRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/weth.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/weth.png')} type="image/png" />
    <img {...props} src={require('../images/renders/weth.png')} />
  </picture>
);
const UsdtRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/usdt.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/usdt.png')} type="image/png" />
    <img {...props} src={require('../images/renders/usdt.png')} />
  </picture>
);

const RenRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/ren.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/ren.png')} type="image/png" />
    <img {...props} src={require('../images/renders/ren.png')} />
  </picture>
);
const ImbtcRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/imbtc.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/imbtc.png')} type="image/png" />
    <img {...props} src={require('../images/renders/imbtc.png')} />
  </picture>
);
const MkrRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/mkr.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/mkr.png')} type="image/png" />
    <img {...props} src={require('../images/renders/mkr.png')} />
  </picture>
);
const NmrRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/nmr.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/nmr.png')} type="image/png" />
    <img {...props} src={require('../images/renders/nmr.png')} />
  </picture>
);
const ManaRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/mana.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/mana.png')} type="image/png" />
    <img {...props} src={require('../images/renders/mana.png')} />
  </picture>
);
const CompRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/comp.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/comp.png')} type="image/png" />
    <img {...props} src={require('../images/renders/comp.png')} />
  </picture>
);
const UmaRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/uma.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/uma.png')} type="image/png" />
    <img {...props} src={require('../images/renders/uma.png')} />
  </picture>
);
const RenBtcRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/renbtc.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/renbtc.png')} type="image/png" />
    <img {...props} src={require('../images/renders/renbtc.png')} />
  </picture>
);
const BalRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/bal.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/bal.png')} type="image/png" />
    <img {...props} src={require('../images/renders/bal.png')} />
  </picture>
);
const LendRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/lend.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/lend.png')} type="image/png" />
    <img {...props} src={require('../images/renders/lend.png')} />
  </picture>
);
const AaveRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/aave.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/aave.png')} type="image/png" />
    <img {...props} src={require('../images/renders/aave.png')} />
  </picture>
);
const YfiRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/yfi.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/yfi.png')} type="image/png" />
    <img {...props} src={require('../images/renders/yfi.png')} />
  </picture>
);
const AmplRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/ampl.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/ampl.png')} type="image/png" />
    <img {...props} src={require('../images/renders/ampl.png')} />
  </picture>
);
const KeepRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/keep.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/keep.png')} type="image/png" />
    <img {...props} src={require('../images/renders/keep.png')} />
  </picture>
);
const CrvRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/crv.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/crv.png')} type="image/png" />
    <img {...props} src={require('../images/renders/crv.png')} />
  </picture>
);
const PaxRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/pax.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/pax.png')} type="image/png" />
    <img {...props} src={require('../images/renders/pax.png')} />
  </picture>
);
const BntRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/bnt.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/bnt.png')} type="image/png" />
    <img {...props} src={require('../images/renders/bnt.png')} />
  </picture>
);
const BandRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/band.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/band.png')} type="image/png" />
    <img {...props} src={require('../images/renders/band.png')} />
  </picture>
);
const BusdRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/busd.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/busd.png')} type="image/png" />
    <img {...props} src={require('../images/renders/busd.png')} />
  </picture>
);
const FoamRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/foam.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/foam.png')} type="image/png" />
    <img {...props} src={require('../images/renders/foam.png')} />
  </picture>
);
const LptRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/lpt.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/lpt.png')} type="image/png" />
    <img {...props} src={require('../images/renders/lpt.png')} />
  </picture>
);
const MusdRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/musd.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/musd.png')} type="image/png" />
    <img {...props} src={require('../images/renders/musd.png')} />
  </picture>
);
const OmgRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/omg.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/omg.png')} type="image/png" />
    <img {...props} src={require('../images/renders/omg.png')} />
  </picture>
);
const DonutRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/donut.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/donut.png')} type="image/png" />
    <img {...props} src={require('../images/renders/donut.png')} />
  </picture>
);
const BzrxRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/bzrx.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/bzrx.png')} type="image/png" />
    <img {...props} src={require('../images/renders/bzrx.png')} />
  </picture>
);
const UniRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/uni.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/uni.png')} type="image/png" />
    <img {...props} src={require('../images/renders/uni.png')} />
  </picture>
);
const SusdRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/susd.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/susd.png')} type="image/png" />
    <img {...props} src={require('../images/renders/susd.png')} />
  </picture>
);
const SethRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/seth.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/seth.png')} type="image/png" />
    <img {...props} src={require('../images/renders/seth.png')} />
  </picture>
);
const BasedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/based.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/based.png')} type="image/png" />
    <img {...props} src={require('../images/renders/based.png')} />
  </picture>
);
const SrmRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/srm.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/srm.png')} type="image/png" />
    <img {...props} src={require('../images/renders/srm.png')} />
  </picture>
);
const AkroRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/akro.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/akro.png')} type="image/png" />
    <img {...props} src={require('../images/renders/akro.png')} />
  </picture>
);
const SwrvRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/swrv.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/swrv.png')} type="image/png" />
    <img {...props} src={require('../images/renders/swrv.png')} />
  </picture>
);
const QntRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/qnt.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/qnt.png')} type="image/png" />
    <img {...props} src={require('../images/renders/qnt.png')} />
  </picture>
);
const TbtcRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/tbtc.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/tbtc.png')} type="image/png" />
    <img {...props} src={require('../images/renders/tbtc.png')} />
  </picture>
);
const PickleRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/pickle.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/pickle.png')} type="image/png" />
    <img {...props} src={require('../images/renders/pickle.png')} />
  </picture>
);
const PaxgRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/paxg.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/paxg.png')} type="image/png" />
    <img {...props} src={require('../images/renders/paxg.png')} />
  </picture>
);
const SushiRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/sushi.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/sushi.png')} type="image/png" />
    <img {...props} src={require('../images/renders/sushi.png')} />
  </picture>
);
const StakeRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/stake.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/stake.png')} type="image/png" />
    <img {...props} src={require('../images/renders/stake.png')} />
  </picture>
);
const CreamRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/cream.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/cream.png')} type="image/png" />
    <img {...props} src={require('../images/renders/cream.png')} />
  </picture>
);
const RenzecRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/renzec.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/renzec.png')} type="image/png" />
    <img {...props} src={require('../images/renders/renzec.png')} />
  </picture>
);
const AudioRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/audio.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/audio.png')} type="image/png" />
    <img {...props} src={require('../images/renders/audio.png')} />
  </picture>
);
const MtaRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/mta.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/mta.png')} type="image/png" />
    <img {...props} src={require('../images/renders/mta.png')} />
  </picture>
);
const BondRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/bond.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/bond.png')} type="image/png" />
    <img {...props} src={require('../images/renders/bond.png')} />
  </picture>
);
const GusdRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/gusd.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/gusd.png')} type="image/png" />
    <img {...props} src={require('../images/renders/gusd.png')} />
  </picture>
);
const WcusdRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/wcusd.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/wcusd.png')} type="image/png" />
    <img {...props} src={require('../images/renders/wcusd.png')} />
  </picture>
);
const WceloRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/wcelo.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/renders/wcelo.png')} type="image/png" />
    <img {...props} src={require('../images/renders/wcelo.png')} />
  </picture>
);
const UnknownTokenRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/renders/unknown.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/renders/unknown.png')}
      type="image/png"
    />
    <img {...props} src={require('../images/renders/unknown.png')} />
  </picture>
);

const TOKEN_RENDER_LOOKUP: {
  [key: string]: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
  ) => JSX.Element;
} = {
  REPV2: RepV2Render,
  USDC: UsdcRender,
  ZRX: ZrxRender,
  BTC: WbtcRender,
  WBTC: WbtcRender,
  LINK: LinkRender,
  BAT: BatRender,
  KNC: KncRender,
  DAI: DaiRender,
  USDT: UsdtRender,
  SNX: SnxRender,
  ENJ: EnjRender,
  ANT: AntRender,
  SNT: SntRender,
  TUSD: TusdRender,
  ETH: EthRender,
  WETH: WethRender,
  REN: RenRender,
  IMBTC: ImbtcRender,
  MKR: MkrRender,
  NMR: NmrRender,
  MANA: ManaRender,
  COMP: CompRender,
  UMA: UmaRender,
  RENBTC: RenBtcRender,
  BAL: BalRender,
  LEND: LendRender,
  AAVE: AaveRender,
  YFI: YfiRender,
  AMPL: AmplRender,
  KEEP: KeepRender,
  CRV: CrvRender,
  PAX: PaxRender,
  BNT: BntRender,
  BUSD: BusdRender,
  BAND: BandRender,
  FOAM: FoamRender,
  LPT: LptRender,
  MUSD: MusdRender,
  OMG: OmgRender,
  DONUT: DonutRender,
  BZRX: BzrxRender,
  UNI: UniRender,
  SUSD: SusdRender,
  SETH: SethRender,
  $BASED: BasedRender,
  SRM: SrmRender,
  AKRO: AkroRender,
  SWRV: SwrvRender,
  QNT: QntRender,
  TBTC: TbtcRender,
  PICKLE: PickleRender,
  PAXG: PaxgRender,
  SUSHI: SushiRender,
  STAKE: StakeRender,
  CREAM: CreamRender,
  RENZEC: RenzecRender,
  AUDIO: AudioRender,
  MTA: MtaRender,
  BOND: BondRender,
  GUSD: GusdRender,
  WCELO: WceloRender,
  WCUSD: WcusdRender,
};

const getTokenRenderBySymbol = (symbol: string) => {
  const normalizedSymbol = symbol.toUpperCase();
  return TOKEN_RENDER_LOOKUP[normalizedSymbol];
};

export { getTokenRenderBySymbol, TOKEN_RENDER_LOOKUP, UnknownTokenRender };

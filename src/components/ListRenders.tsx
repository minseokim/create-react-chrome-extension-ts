import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

// Raw SVG Components
type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

// You might be wondering, why list all these renders by hand?
// By statically declaring images ahead of build time, we can leverage off-the-shelf image optimization
// Read more here: https://github.com/cyrilwanner/next-optimized-images
const RecentlyAddedCompressedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders-compressed/recently-added.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders-compressed/recently-added.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../images/list-renders-compressed/recently-added.png')}
    />
  </picture>
);

const TopGainersCompressedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders-compressed/top-gainers.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders-compressed/top-gainers.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../images/list-renders-compressed/top-gainers.png')}
    />
  </picture>
);

const TopLosersCompressedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders-compressed/top-losers.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders-compressed/top-losers.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../images/list-renders-compressed/top-losers.png')}
    />
  </picture>
);
const YieldFarmersCompressedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders-compressed/yield-farming.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders-compressed/yield-farming.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../images/list-renders-compressed/yield-farming.png')}
    />
  </picture>
);

const StablecoinsCompressedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders-compressed/stablecoins.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders-compressed/stablecoins.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../images/list-renders-compressed/stablecoins.png')}
    />
  </picture>
);

const VCBackedCompressedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders-compressed/vc-backed.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders-compressed/vc-backed.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../images/list-renders-compressed/vc-backed.png')}
    />
  </picture>
);

const RecentlyAddedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders/recently-added.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders/recently-added.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../images/list-renders/recently-added.png')}
    />
  </picture>
);

const TopGainersRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders/top-gainers.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders/top-gainers.png')}
      type="image/png"
    />
    <img {...props} src={require('../images/list-renders/top-gainers.png')} />
  </picture>
);

const TopLosersRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders/top-losers.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders/top-losers.png')}
      type="image/png"
    />
    <img {...props} src={require('../images/list-renders/top-losers.png')} />
  </picture>
);
const YieldFarmersRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders/yield-farming.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders/yield-farming.png')}
      type="image/png"
    />
    <img {...props} src={require('../images/list-renders/yield-farming.png')} />
  </picture>
);

const StablecoinsRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders/stablecoins.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders/stablecoins.png')}
      type="image/png"
    />
    <img {...props} src={require('../images/list-renders/stablecoins.png')} />
  </picture>
);

const VCBackedRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../images/list-renders/vc-backed.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../images/list-renders/vc-backed.png')}
      type="image/png"
    />
    <img {...props} src={require('../images/list-renders/vc-backed.png')} />
  </picture>
);

const LIST_RENDER_LOOKUP: {
  [key: string]: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
  ) => JSX.Element;
} = {
  'recently-added': RecentlyAddedRender,
  'top-gainers': TopGainersRender,
  'top-losers': TopLosersRender,
  'yield-farming': YieldFarmersRender,
  'vc-backed': VCBackedRender,
  'stablecoins': StablecoinsRender,
};

const LIST_COMPRESSED_RENDER_LOOKUP: {
  [key: string]: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
  ) => JSX.Element;
} = {
  'recently-added': RecentlyAddedCompressedRender,
  'top-gainers': TopGainersCompressedRender,
  'top-losers': TopLosersCompressedRender,
  'yield-farming': YieldFarmersCompressedRender,
  'vc-backed': VCBackedCompressedRender,
  'stablecoins': StablecoinsCompressedRender,
};

export { LIST_RENDER_LOOKUP, LIST_COMPRESSED_RENDER_LOOKUP };

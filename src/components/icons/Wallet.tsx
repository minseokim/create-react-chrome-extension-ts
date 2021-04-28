import React from 'react';

const WalletIcon = React.memo(() => (
  <picture>
    <source
      srcSet={require('../../images/illustrations/wallet-icon.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../../images/illustrations/wallet-icon.png')}
      type="image/png"
    />
    <img src={require('../../images/illustrations/wallet-icon.png')} />
  </picture>
));

export { WalletIcon };

import React from 'react';

const MysteryTokenWithBackgroundIcon = React.memo(() => (
  <picture>
    <source
      srcSet={require('../../images/illustrations/mystery-icon-with-background.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../../images/illustrations/mystery-icon-with-background.png')}
      type="image/png"
    />
    <img
      src={require('../../images/illustrations/mystery-icon-with-background.png')}
    />
  </picture>
));

const MysteryTokenIcon = React.memo(() => (
  <picture>
    <source
      srcSet={require('../../images/illustrations/mystery-icon.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../../images/illustrations/mystery-icon.png')}
      type="image/png"
    />
    <img src={require('../../images/illustrations/mystery-icon.png')} />
  </picture>
));

export { MysteryTokenWithBackgroundIcon, MysteryTokenIcon };

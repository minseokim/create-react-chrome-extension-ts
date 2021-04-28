import { FC } from 'react';
import { ActionCardWithState, ActionCardState } from './index';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

// Raw SVG Components
type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const ConnectWalletRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../../images/action-renders/connect-wallet.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../../images/action-renders/connect-wallet.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../../images/action-renders/connect-wallet.png')}
    />
  </picture>
);

export const ConnectWalletActionCard: FC<{ actionState: ActionCardState }> = ({
  actionState,
}) => {
  return (
    <ActionCardWithState
      actionState={actionState}
      bgColor={'linear-gradient(180deg, #8C8AFF 0%, #2955F1 100%);'}
      textColor={'#FFFFFF'}
      as={'a'}
      href={'#'}
      springStyle={{}}
      text={'Connect a wallet'}
    >
      <ConnectWalletRender />
    </ActionCardWithState>
  );
};

const FundEtherRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../../images/action-renders/fund-ether.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../../images/action-renders/fund-ether.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../../images/action-renders/fund-ether.png')}
    />
  </picture>
);

export const FundEtherActionCard: FC<{ actionState: ActionCardState }> = ({
  actionState,
}) => {
  return (
    <ActionCardWithState
      actionState={actionState}
      bgColor={'linear-gradient(180deg, #3D66CE 0%, #2675F4 100%);'}
      textColor={'#FFFFFF'}
      as={'a'}
      href={'#'}
      springStyle={{}}
      text={'Fund with Ether'}
    >
      <FundEtherRender />
    </ActionCardWithState>
  );
};

const FirstTradeRender = (props: ImageProps) => (
  <picture>
    <source
      srcSet={require('../../images/action-renders/first-trade.png?webp')}
      type="image/webp"
    />
    <source
      srcSet={require('../../images/action-renders/first-trade.png')}
      type="image/png"
    />
    <img
      {...props}
      src={require('../../images/action-renders/first-trade.png')}
    />
  </picture>
);

export const FirstTradeActionCard: FC<{ actionState: ActionCardState }> = ({
  actionState,
}) => {
  return (
    <ActionCardWithState
      actionState={actionState}
      bgColor={'linear-gradient(180deg, #FC7889 0%, #EE4A5E 100%);'}
      textColor={'#FFFFFF'}
      as={'a'}
      href={'#'}
      springStyle={{}}
      text={'Make a first trade'}
    >
      <FirstTradeRender />
    </ActionCardWithState>
  );
};

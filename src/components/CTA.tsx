import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import Rellax from 'rellax';

import { useDetectMobile } from '../hooks/useDetectMobile';

import { H2, H4 } from '../components/Typography';

const Container = styled.div`
  width: 100%;
  margin: auto;
  background: #f6f6ff;
  height: 620px;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 677px;
    background-image: url('${require('../images/cta/cta_mobile.png')}');
    background-size: cover;
  }
`;

const BackgroundTop = () => (
  <picture>
    <source srcSet={require('../images/cta/top.png?webp')} type="image/webp" />
    <source srcSet={require('../images/cta/top.png')} type="image/png" />
    <img
      style={{
        height: '268px',
      }}
      src={require('../images/cta/top.png')}
    />
  </picture>
);

const BackgroundMiddle = () => (
  <picture>
    <source
      srcSet={require('../images/cta/middle.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/cta/middle.png')} type="image/png" />
    <img
      style={{ height: '497px' }}
      src={require('../images/cta/middle.png')}
    />
  </picture>
);

const BackgroundBottom = () => (
  <picture>
    <source
      srcSet={require('../images/cta/bottom.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/cta/bottom.png')} type="image/png" />
    <img
      style={{
        height: '502px',
      }}
      src={require('../images/cta/bottom.png')}
    />
  </picture>
);

const Scene = styled.div`
  max-height: 620px;
  width: 70%;
  position: absolute;
  height: 100%;
  overflow: hidden;
  right: 0;
  top: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const ParallaxContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const P = styled.p`
  font-family: 'Gilroy';
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: 16px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.primaryText};
`;

const AbsoluteContentWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: auto;
  display: flex;
  padding: 0 10px;
  padding-top: 66px;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    align-items: center;
    padding-top: 0;
  }
`;

const TextWrapper = styled.div`
  ${H2} + ${H4} {
    margin-top: 60px;
  }

  ${H4} + ${P} {
    margin-top: 8px;
  }

  ${P} + ${H4} {
    margin-top: 30px;
  }
`;

interface CTAProps {}
export const CTA: FC<CTAProps> = () => {
  const isMobile = useDetectMobile();

  useEffect(() => {
    if (isMobile === undefined || isMobile === true) {
      return;
    }

    const rellax = new Rellax('.parallax');
    return () => rellax.destroy();
  }, [isMobile]);

  return (
    <Container>
      <Scene>
        <ParallaxContainer className="parallax" data-rellax-speed="-3">
          <BackgroundBottom />
        </ParallaxContainer>
        <ParallaxContainer className="parallax" data-rellax-speed="-2">
          <BackgroundMiddle />
        </ParallaxContainer>
        <ParallaxContainer
          className="parallax"
          style={{ marginTop: '-200px' }}
          data-rellax-speed="-1"
        >
          <BackgroundTop />
        </ParallaxContainer>
      </Scene>

      <AbsoluteContentWrapper>
        <ContentWrapper>
          <TextWrapper>
            <H2>Fast, secure token swaps</H2>
            <H4>Trade directly from your wallet</H4>
            <P>We never hold or control your assets</P>
            <H4>Get the best price on every trade</H4>
            <P>We aggregate liquidity from across exchange networks</P>
            <H4>No account or sign up required</H4>
            <P>Connect with Matcha in seconds to start trading</P>
          </TextWrapper>
        </ContentWrapper>
      </AbsoluteContentWrapper>
    </Container>
  );
};

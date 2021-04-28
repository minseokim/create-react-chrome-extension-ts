import React from 'react';
import styled from 'styled-components';
import { H3 } from './Typography';
import {
  getTokenRenderBySymbol,
  UnknownTokenRender,
} from '../components/TokenRenders';
import { LeftRightSwapBigIcon } from './icons/LeftRightSwapIcon';
import {
  getTokenGradientBySymbol,
  UnknownTokenGradient,
} from '../styles/theme';
import { BaseLink } from './BaseLink';

const CenteredFlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background-color: #f6f6ff;
  border-radius: 8px;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const LeftPanel = styled.div`
  flex-shrink: 0;
  flex-basis: 280px;
  padding: 40px 0;
`;

const RightPanel = styled.div`
  flex-shrink: 0;
  flex-basis: 115px;
  padding: 30px 0 30px 0;
`;

const RightPanelRow = styled.div`
  display: flex;
  flex: 1;
`;

// TODO(johnrjj) - This is the updated P style, need to do a refactor with the typography
const P = styled.div`
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 140%;
  color: #7578b5;
`;

const CustomH3 = styled(H3)`
  text-align: inherit;
  line-height: 110%;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 110%;
`;

const RightSideIllustrationContainer = styled.div`
  padding: 6px;
  background-color: #f6f6ff;
  border-radius: 100%;
`;

const RightSideIllustrationContainerRight = styled(
  RightSideIllustrationContainer,
)`
  position: relative;
  transform: translateX(32px);
`;

const TokenBackground = styled.div``;

export interface NoTradeHistoryEmptyStateProps {
  baseTokenSymbol: string | undefined;
  quoteTokenSymbol: string | undefined;
}

// This CSS needs refactoring bigly
const NoTradeHistoryEmptyState: React.FC<NoTradeHistoryEmptyStateProps> = ({
  baseTokenSymbol,
  quoteTokenSymbol,
}) => {
  const BaseTokenImage = baseTokenSymbol
    ? getTokenRenderBySymbol(baseTokenSymbol) ?? UnknownTokenRender
    : undefined;
  const QuoteTokenImage = quoteTokenSymbol
    ? getTokenRenderBySymbol(quoteTokenSymbol) ?? UnknownTokenRender
    : undefined;
  const WethTokenImage = getTokenRenderBySymbol('WETH');

  const isEthWethPair =
    (baseTokenSymbol === 'ETH' && quoteTokenSymbol === 'WETH') ||
    (baseTokenSymbol === 'WETH' && quoteTokenSymbol === 'ETH');

  const baseGradient = baseTokenSymbol
    ? getTokenGradientBySymbol(baseTokenSymbol) ?? UnknownTokenGradient
    : undefined;
  const quoteGradient = quoteTokenSymbol
    ? getTokenGradientBySymbol(quoteTokenSymbol) ?? UnknownTokenGradient
    : undefined;
  const wethGradient = quoteTokenSymbol
    ? getTokenGradientBySymbol('WETH') ?? UnknownTokenGradient
    : undefined;

  return (
    <CenteredFlexRowContainer>
      <LeftPanel
        style={{
          flexBasis: isEthWethPair ? '320px' : '280px',
        }}
      >
        <CustomH3 style={{ marginBottom: 12 }}>
          {isEthWethPair ? (
            <>
              <span style={{ marginRight: 8 }}>Convert ETH</span>
              <LeftRightSwapBigIcon />
              <span style={{ marginLeft: 8 }}>WETH</span>
            </>
          ) : (
            <>
              <span>
                Start trading {quoteTokenSymbol ? <br /> : null}
                <span style={{ color: '#706EFF', marginRight: 8 }}>
                  {baseTokenSymbol}
                </span>
              </span>
              <LeftRightSwapBigIcon />
              <span style={{ color: '#706EFF', marginLeft: 8 }}>
                {quoteTokenSymbol}
              </span>
            </>
          )}
        </CustomH3>
        <P>
          {isEthWethPair
            ? `WETH is a special version of ETH that has more capabilities. 1 WETH = 1 ETH on Matcha.`
            : `We source from the top exchange networks so you get the best rates.`}
        </P>
        {isEthWethPair && (
          <P style={{ marginTop: 10 }}>
            <BaseLink
              external={true}
              href={
                'http://help.matcha.xyz/en/articles/3983459-i-know-what-eth-is-but-what-is-weth'
              }
            >
              Learn more about WETH
            </BaseLink>
          </P>
        )}
      </LeftPanel>
      <RightPanel>
        <RightPanelRow>
          {isEthWethPair ? (
            <RightSideIllustrationContainer>
              <TokenBackground
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: '100%',
                  background: wethGradient ?? 'inherit',
                }}
              >
                {WethTokenImage && (
                  <WethTokenImage style={{ width: 128, height: 128 }} />
                )}
              </TokenBackground>
            </RightSideIllustrationContainer>
          ) : (
            <>
              <RightSideIllustrationContainerRight style={{}}>
                <TokenBackground
                  style={{
                    width: 128,
                    height: 128,
                    borderRadius: '100%',
                    background: baseGradient ?? 'inherit',
                  }}
                >
                  {BaseTokenImage && (
                    <BaseTokenImage style={{ width: 128, height: 128 }} />
                  )}
                </TokenBackground>
              </RightSideIllustrationContainerRight>
              <RightSideIllustrationContainer>
                <TokenBackground
                  style={{
                    width: 128,
                    height: 128,
                    borderRadius: '100%',
                    background: quoteGradient ?? 'inherit',
                  }}
                >
                  {QuoteTokenImage && (
                    <QuoteTokenImage style={{ width: 128, height: 128 }} />
                  )}
                </TokenBackground>
              </RightSideIllustrationContainer>
            </>
          )}
        </RightPanelRow>
      </RightPanel>
    </CenteredFlexRowContainer>
  );
};

const NoTradeHistoryEmptyStateMemo = React.memo(NoTradeHistoryEmptyState);

export { NoTradeHistoryEmptyStateMemo as NoTradeHistoryEmptyState };

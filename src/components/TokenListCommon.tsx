import styled from 'styled-components';
import { animated } from 'react-spring';
import { H1, P } from './Typography';

const HeroContainer = styled.div`
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: space-between;
  max-height: 282px;
  height: 282px;
  margin-bottom: 50px;
  background-color: #f6f6ff;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 0.4fr;
    height: 182px;
    max-height: 182px;
    margin-bottom: 25px;
  }
`;

const StyledP = styled(P)`
  color: #ffffff;
  font-size: 18px;
  line-height: 150%;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    line-height: 125%;
  }
`;

const StyledH1 = styled(H1)`
  margin-top: 10px;
  color: #ffffff;
  font-weight: bold;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 36px;
  }
`;

const ListCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  will-change: transform;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 0 15px;
  }
`;

const HeroGraphicWrapper = styled.div`
  z-index: 1;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  height: 100%;
  & > picture {
    height: 100%;
  }
  & img {
    display: block;
    height: 100%;
  }
`;

const ContentRow = styled.div`
  margin: auto;
  width: 100%;
`;

const HeroContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 72px;
  z-index: 2;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-left: 24px;
  }
`;

const AnimatedListCardHeader = animated(ListCardHeader);
const AnimatedHeroGraphicWrapper = animated(HeroGraphicWrapper);
const AnimatedHeroContentWrapper = animated(HeroContentWrapper);
const AnimatedContentRow = animated(ContentRow);

export {
  HeroContainer,
  StyledP,
  StyledH1,
  ContentRow,
  AnimatedListCardHeader,
  AnimatedHeroGraphicWrapper,
  AnimatedHeroContentWrapper,
  AnimatedContentRow,
};

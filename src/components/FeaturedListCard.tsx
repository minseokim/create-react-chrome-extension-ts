import styled from 'styled-components';
import React from 'react';
import { animated as a } from 'react-spring';
import { FeaturedCard, FeaturedCardAnimationProps } from './FeaturedCard';

const ListTitleLabel = styled.div<{ textColor: string }>`
  font-family: 'Gilroy';
  font-feature-settings: 'tnum' on, 'lnum' on;
  flex-wrap: nowrap;
  font-weight: 600;
  font-size: 28px;
  line-height: 32px;
  color: ${(props) => props.textColor};
  margin-bottom: 0px;
`;

const ListIconWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    img {
      max-height: 130px;
    }
  }
`;

export interface FeaturedListCardProps {
  bgColor: string;
  textColor: string;
  as?: 'a';
  href?: string;
  children?: any;
  onClick?: () => void;
}

export interface FeaturedListMetadataProps {
  listTitle: string;
}

// function takeEvery<T>(arr: Array<T>, every: number = 5): Array<T> {
//   return arr.filter((_, idx) => idx % every === 0);
// }

const FeaturedListCard = React.forwardRef<
  any,
  FeaturedListCardProps & FeaturedListMetadataProps & FeaturedCardAnimationProps
>(({ bgColor, textColor, as, href, listTitle, children, ...rest }, ref) => {
  const TopLeft: React.FC = () => {
    return (
      <>
        <ListTitleLabel textColor={textColor}>{listTitle}</ListTitleLabel>
      </>
    );
  };

  const TopRight: React.FC = () => {
    return <></>;
  };

  return (
    <FeaturedCard
      {...rest}
      ref={ref}
      bgColor={bgColor}
      as={as}
      href={href}
      topLeft={<TopLeft />}
      topRight={<TopRight />}
    >
      <ListIconWrapper>{children}</ListIconWrapper>
    </FeaturedCard>
  );
});

const AnimatedFeaturedListCard = a(FeaturedListCard);

export { AnimatedFeaturedListCard as FeaturedListCard };

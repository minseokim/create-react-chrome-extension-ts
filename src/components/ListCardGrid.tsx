import { FC, ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { useAdaptiveDesign } from '../hooks/useIsMobile';
import { ChevronLeftExtraLargeIcon } from './icons/ChevronLeft';
import { ChevronRightExtraLargeIcon } from './icons/ChevronRight';
const ListCardRelativeContainer = styled.div`
  width: 100%;
  position: relative;
  height: 224px;
`;

const ListCardScrollAbsoluteContainer = styled.div`
  position: absolute;
  -webkit-overflow-scrolling: touch;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ListCardGridContainer = styled.div<{ numColsInRow?: number }>`
  min-width: 980px;
  display: grid;
  grid-template-columns: repeat(
    ${(p) => (!!p.numColsInRow ? p.numColsInRow : 5)},
    1fr
  );
  grid-gap: 12px;
  width: 100%;
  -webkit-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
`;

const LeftArrowContainer = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 100;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-left: 12px;
  left: 0;
  align-items: center;
  width: 7%;
  opacity: 100%;
`;

const RightArrowContainer = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 100;
  height: 100%;
  display: flex;
  justify-content: center;
  right: 0;
  padding-right: 12px;
  align-items: center;
  /* transition: font-size .1s ease-out; */
  width: 7%;
  opacity: 100%;
`;

// const StyledBaseLink = styled(BaseLink)`
//   font-size: 20px;
//   line-height: 20px;
//   font-weight: 600;
//   text-align: center;
//   color: #706eff;
//   cursor: pointer;
//   padding: 3px 0 0 0;
//   &:focus,
//   :active {
//     outline: none;
//   }
// `;

interface ListCardGridProps {
  children: ReactNode[];
  className?: string;
  numColsInRow?: number;
  isClickNavigationEnabled?: boolean;
}

const FIXED_WIDTH = 196;

export const ListCardGrid: FC<ListCardGridProps> = ({
  children,
  className,
  numColsInRow,
  isClickNavigationEnabled,
}) => {
  const listCardContainerRef = useRef<HTMLDivElement>(null);

  const { isSmallScreen } = useAdaptiveDesign();

  const handleClickScroll = (direction: string) => {
    const { current: container } = listCardContainerRef;
    if (!container) {
      return;
    }

    const style = getComputedStyle(container);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const { m41: translatedX } = matrix;
    const numOfItems = numColsInRow || (children && children.length);
    // Since we only display 3 cards in one 'view', divide by 3 and round up to calculate navigationIndex to determine whether we've reached 'end' of the carousel/navigation
    const navigationIndex = Math.ceil(numOfItems / 3);
    const endOfLeftNavigation = 0;
    const endOfRightDirectionNavigation = -1 * FIXED_WIDTH * navigationIndex;

    switch (direction) {
      case 'LEFT':
        const newTranslatedXLeftValue = translatedX + FIXED_WIDTH;

        if (newTranslatedXLeftValue >= endOfLeftNavigation) {
          container.style.transform = `translateX(0)`;
          return;
        }
        container.style.transform = `translateX(${newTranslatedXLeftValue}px)`;
        break;
      case 'RIGHT':
        const newTranslatedXRightValue = translatedX - FIXED_WIDTH;

        if (newTranslatedXRightValue <= endOfRightDirectionNavigation) {
          container.style.transform = `translateX(${endOfRightDirectionNavigation}px)`;
          return;
        }
        container.style.transform = `translateX(${newTranslatedXRightValue}px)`;
        break;
      default:
        break;
    }
  };

  return (
    <ListCardRelativeContainer className={className}>
      {isClickNavigationEnabled && !isSmallScreen && (
        <LeftArrowContainer onClick={() => handleClickScroll('LEFT')}>
          <ChevronLeftExtraLargeIcon />
        </LeftArrowContainer>
      )}

      <ListCardScrollAbsoluteContainer>
        <ListCardGridContainer
          numColsInRow={numColsInRow}
          ref={listCardContainerRef}
        >
          {children}
        </ListCardGridContainer>
      </ListCardScrollAbsoluteContainer>

      {isClickNavigationEnabled && !isSmallScreen && (
        <RightArrowContainer onClick={() => handleClickScroll('RIGHT')}>
          <ChevronRightExtraLargeIcon />
        </RightArrowContainer>
      )}
    </ListCardRelativeContainer>
  );
};

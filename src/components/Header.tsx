import React, { useState, useEffect, FC, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useWindowScroll } from 'react-use';
import { useSpring, animated as a } from 'react-spring';
import { useRouter, Router } from 'next/router';
import { routes } from '../utils/routes';
import { useAppContext } from '../contexts/app';
import { useWalletConnectionState } from '../contexts/wallet-connection';
import { useMixpanelAnalytics } from '../contexts/analytics';
import { MATCHA_ANALYTIC_EVENTS } from '../data/analytics';
import { useAdaptiveDesign } from '../hooks/useIsMobile';
import { AccountMenu } from './AccountMenu';
import { HeaderSearchCombobox } from './HeaderSearchCombobox';
import {
  LeftColumn,
  LeftFillContainer,
  MainContainer,
  PageContainer,
  RightColumn,
  RightFillContainer,
} from './Layout';
import { CompassDesktopIcon } from './icons/Compass';
import { SearchComboboxIcon } from './SearchComboboxIcon';
import { BaseButton } from './BaseButton';
import { HouseDesktopIcon } from './icons/House';
import { OnboardingProgress } from './onboarding/OnboardingProgress';
import { AppNotificationBanner } from './TokensPromoBanner';

// TODO(johnrjj) - App context duplicates this, consolidate when there's an opportunity. In the meantime, just change both
export const HEADER_BANNER_HEIGHT = `50px`;
export const HEADER_HEIGHT_DESKTOP = '60px';

// const EXPLORE_DESKTOP_SHOW_HEADER_SCROLL_HEIGHT = 200;
// const HOME_DESKTOP_SHOW_HEADER_SCROLL_HEIGHT = 320;
const EXPLORE_MOBILE_SHOW_HEADER_SCROLL_HEIGHT = 220;
const HOME_MOBILE_SHOW_HEADER_SCROLL_HEIGHT = 280;

const HeaderOuter = styled.div<{
  hasAppBanner: boolean;
}>`
  position: fixed;
  display: flex;
  flex: 1;
  justify-content: center;
  width: 100%;
  height: ${(props) =>
    props.hasAppBanner
      ? `calc(${HEADER_BANNER_HEIGHT} + ${HEADER_HEIGHT_DESKTOP})`
      : HEADER_HEIGHT_DESKTOP};
  z-index: 101;
  border-bottom: 1px solid #e8ecfd;
  background-color: #ffffff;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    position: fixed;
  }
`;
const AnimatedHeaderOuter = a(HeaderOuter);

const HeaderWrapperColumn = styled.div`
  width: 100%;
`;

const HeaderPrimaryRow = styled(PageContainer).attrs({ as: 'nav' })`
  width: 100%;
  height: ${HEADER_HEIGHT_DESKTOP};
  overflow: visible;
  min-height: auto;
  position: relative;
`;

// NOTE(johnrjj) - Right now HeaderLeft and HeaderRight are tightly coupled to the Layout components LeftColumn and RightColumn
const HeaderLeft = styled(LeftFillContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  flex-grow: 1;
  padding-left: 24px;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  flex-basis: 460px;
  max-width: 460px;
  padding-right: 24px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
`;

const HeaderCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
const AnimatedHeaderCenter = a(HeaderCenter);

const HeaderLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.primaryText};
  text-decoration: none;
  /* Better touch targets */
  padding: 8px;
  margin-left: -8px;
  margin-bottom: -4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HeaderLinkWithHover = styled(HeaderLink)<{ isActive?: boolean }>`
  height: 100%;
  position: relative;
  & > svg * {
    fill: ${(props) => (props.isActive ? '#706EFF' : '#7578B5')};
  }
  :hover > svg * {
    fill: ${(props) => (props.isActive ? '#706EFF' : '#000000')};
  }

  &::after {
    content: '';
    display: ${(props) => (props.isActive ? 'block' : 'none')};
    height: 2px;
    right: 0;
    left: 0;
    position: absolute;
    bottom: -1px;
    background: #706eff;
  }
`;

const isSplitPanelsPage = (pathname: string) =>
  ['[...tradingParams]'].some((path) => pathname.includes(path));

const isHeaderOnExplore = (pathname: string): boolean => {
  const exactMatch = ['explore'].some((path) => pathname.includes(path));
  return exactMatch;
};

const HeaderSearchContainer = styled.div`
  position: relative;
  height: 44px;
  width: 100%;
  z-index: 0;
`;

const HeaderSearchContainerHideOnMobile = styled(HeaderSearchContainer)`
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const AnimatedHeaderSearchContainerHideOnMobile = a(
  HeaderSearchContainerHideOnMobile,
);

const HeaderMobilePrimaryRow = styled.div.attrs({ as: 'div' })`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${HEADER_HEIGHT_DESKTOP};
  padding: 0 24px;
`;

const HeaderMobileLeft = styled.div``;
const HeaderMobileRight = styled.div`
  display: flex;
  align-items: center;
`;

// transition: opacity 150ms ease-in-out;

const HeaderSearchButton = styled(BaseButton)<{ showSearchInHeader: boolean }>`
  height: 18px;
  width: 18px;
  display: block;
  pointer-events: ${(p) => (p.showSearchInHeader ? 'auto' : 'none')};
  opacity: 1;
  > svg {
    height: 18px;
    width: 18px;
    > * {
      fill: #7578b5;
    }
  }
`;

const Header = () => {
  const router = useRouter();
  const analytics = useMixpanelAnalytics();

  const { isAppBannerVisible } = useAppContext();

  const { triedEagerConnect } = useWalletConnectionState();

  const isSplitLayout = isSplitPanelsPage(router.pathname);

  const {
    isSmallScreen: isMobileHeaderVisible,
    isMediumScreen,
  } = useAdaptiveDesign();

  // const { y: windowScrollHeight } = useWindowScroll();
  const showSearchInHeader = true;

  // Not using for now - we always display header in search bar at the moment
  // const showSearchInHeaderOnScroll = useMemo(() => {
  //   if (
  //     router.pathname.startsWith(`/explore`) &&
  //     windowScrollHeight < EXPLORE_DESKTOP_SHOW_HEADER_SCROLL_HEIGHT
  //   ) {
  //     return false;
  //   }
  //   if (
  //     router.pathname === '/' &&
  //     windowScrollHeight < HOME_DESKTOP_SHOW_HEADER_SCROLL_HEIGHT
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }, [router, windowScrollHeight]);

  const showOnboardingHeader = useMemo(() => {
    if (router.pathname.startsWith(`/onboard`)) {
      return true;
    }
    return false;
  }, [router]);
  const skipTutorial = useCallback(() => {
    router.push(routes.LOGIN);
  }, [router]);

  const [searchValue, setSearchValue] = useState<string>('');

  // Any time we change routes, clear combobox
  useEffect(() => {
    const clearSearchCombobox = () => setSearchValue('');
    Router.events.on('routeChangeComplete', clearSearchCombobox);
    return () => {
      Router.events.off('routeChangeComplete', clearSearchCombobox);
    };
  }, []);

  // Reset scroll position on any navigation
  // Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });

  const headerSearchSpring = useSpring({
    y: showSearchInHeader ? 0 : 4,
    opacity: showSearchInHeader ? 1 : 0,
    config: { mass: 10, tension: 500, friction: 1, clamp: true },
  });

  const headerProgressSpring = useSpring({
    y: showOnboardingHeader ? 0 : 4,
    opacity: showOnboardingHeader ? 1 : 0,
    config: { mass: 10, tension: 500, friction: 1, clamp: true },
  });

  return (
    <AnimatedHeaderOuter hasAppBanner={isAppBannerVisible}>
      <HeaderWrapperColumn>
        <AppNotificationBanner />
        {!isMobileHeaderVisible && (
          <HeaderPrimaryRow>
            <HeaderLeft>
              <Link passHref href={routes.HOME}>
                <HeaderLink>Matcha</HeaderLink>
              </Link>
            </HeaderLeft>
            <MainContainer style={{ overflowY: 'visible' }}>
              {showOnboardingHeader ? (
                <AnimatedHeaderCenter style={headerProgressSpring}>
                  <OnboardingProgress />
                </AnimatedHeaderCenter>
              ) : (
                <>
                  <LeftColumn style={{ justifyContent: 'center' }}>
                    <AnimatedHeaderSearchContainerHideOnMobile
                      style={headerSearchSpring}
                    >
                      <HeaderSearchCombobox
                        searchTerm={searchValue}
                        setSearchTerm={setSearchValue}
                      />
                    </AnimatedHeaderSearchContainerHideOnMobile>
                  </LeftColumn>
                  <RightColumn />
                </>
              )}
            </MainContainer>
            <RightFillContainer />

            <HeaderRight>
              {showOnboardingHeader ? (
                <>
                  <SkipTutorial onClick={skipTutorial}>
                    {isMediumScreen ? 'Skip' : 'Skip tutorial'}
                  </SkipTutorial>
                </>
              ) : (
                <>
                  {/* Make sure this loads at the same time the 'Connect Wallet does (e.g. when triedEagerConnect is set to true) */}
                  {triedEagerConnect && (
                    <NavLinkWrapper>
                      <Link passHref href={routes.HOME}>
                        <HeaderLinkWithHover
                          isActive={router.pathname === '/'}
                          onClick={() => {
                            analytics.track?.(
                              MATCHA_ANALYTIC_EVENTS.NAV_CLICK_HOME_LINK,
                              {},
                            );
                          }}
                        >
                          <HouseDesktopIcon />
                          <HeaderLinkText>Home</HeaderLinkText>
                        </HeaderLinkWithHover>
                      </Link>
                      <Link passHref href={routes.EXPLORE}>
                        <HeaderLinkWithHover
                          isActive={isHeaderOnExplore(router.pathname)}
                          onClick={() => {
                            analytics.track?.(
                              MATCHA_ANALYTIC_EVENTS.NAV_CLICK_EXPLORE_LINK,
                              {},
                            );
                          }}
                        >
                          <CompassDesktopIcon />
                          <HeaderLinkText>Explore</HeaderLinkText>
                        </HeaderLinkWithHover>
                      </Link>
                    </NavLinkWrapper>
                  )}
                  <AccountMenu isSplitLayout={isSplitLayout} />
                </>
              )}
            </HeaderRight>
          </HeaderPrimaryRow>
        )}
        {isMobileHeaderVisible && <MobileHeader />}
      </HeaderWrapperColumn>
    </AnimatedHeaderOuter>
  );
};

const MobileHeader: FC = () => {
  const router = useRouter();
  const { openMobileSearch } = useAppContext();

  const { y: windowScrollHeight } = useWindowScroll();

  const showSearchInHeader = useMemo(() => {
    if (
      router.pathname.startsWith(`/explore`) &&
      windowScrollHeight < EXPLORE_MOBILE_SHOW_HEADER_SCROLL_HEIGHT
    ) {
      return false;
    }
    if (
      router.pathname === '/' &&
      windowScrollHeight < HOME_MOBILE_SHOW_HEADER_SCROLL_HEIGHT
    ) {
      return false;
    }
    return true;
  }, [router, windowScrollHeight]);

  return (
    <>
      <HeaderMobilePrimaryRow>
        <HeaderMobileLeft>
          <Link passHref href={routes.HOME}>
            <HeaderLink>Matcha</HeaderLink>
          </Link>
        </HeaderMobileLeft>
        <HeaderMobileRight>
          <HeaderSearchButton
            showSearchInHeader={showSearchInHeader}
            onClick={() => openMobileSearch()}
          >
            <SearchComboboxIcon />
          </HeaderSearchButton>
        </HeaderMobileRight>
      </HeaderMobilePrimaryRow>
    </>
  );
};

const HeaderLinkText = styled.span`
  padding: 3px 0 0 8px;
`;

const NavLinkWrapper = styled.div`
  margin-right: 24px;
  height: 100%;
  display: flex;
  a + a {
    margin-left: 12px;
  }
`;

const SkipTutorial = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #7578b5;
  cursor: pointer;
  transition: color 250ms ease;
  &:hover {
    color: #706eff;
  }
`;

const HeaderSpacerContainer = styled.div<{
  showAppBanner: boolean;
}>`
  height: ${(props) =>
    `calc(${
      props.showAppBanner ? HEADER_BANNER_HEIGHT : `0px`
    } + ${HEADER_HEIGHT_DESKTOP})`};
  min-height: ${(props) =>
    `calc(${
      props.showAppBanner ? HEADER_BANNER_HEIGHT : `0px`
    } + ${HEADER_HEIGHT_DESKTOP})`};
  width: 100%;
`;

// Spacer component that takes up the width of the Header (since the header is outside the flow via fixed/absolute positioning)
const HeaderSpacer: React.FC<{}> = () => {
  const { isAppBannerVisible } = useAppContext();
  return <HeaderSpacerContainer showAppBanner={isAppBannerVisible} />;
};
const HeaderSpacerMemo = React.memo(HeaderSpacer);

// Standardized space between the Header and content
const BetweenHeaderAndContentSpacer = styled.div`
  height: 60px;
  min-height: 60px;
  width: 100%;
`;

const BetweenHeaderAndContentSpacerMemo = React.memo(
  BetweenHeaderAndContentSpacer,
);

const MemoizedHeader = React.memo(Header);

export {
  MemoizedHeader as Header,
  HeaderLeft,
  HeaderRight,
  HeaderLink,
  HeaderSpacerMemo as HeaderSpacer,
  BetweenHeaderAndContentSpacerMemo as BetweenHeaderAndContentSpacer,
};

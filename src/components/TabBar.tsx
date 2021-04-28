import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { HouseDesktopIcon } from './icons/House';
import { CompassDesktopIcon } from './icons/Compass';
import { BellDesktopIcon } from './icons/Bell';
import { ProfileDesktopIcon } from './icons/Profile';
import { routes } from '../utils/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { MatchaPrimaryButton } from './Buttons';
import { useWalletConnectionState } from '../contexts/wallet-connection';
import { useMounted } from '../hooks/useMounted';
import { useMixpanelAnalytics } from '../contexts/analytics';
import { MATCHA_ANALYTIC_EVENTS } from '../data/analytics';

export const TAB_BAR_HEIGHT = 60;

const TabBarContent = styled.div<{ isLoggedIn?: boolean }>`
  height: ${TAB_BAR_HEIGHT}px;
  grid-template-columns: ${(p) =>
    p.isLoggedIn ? 'repeat(4, 1fr)' : '1fr 1fr 2fr'};
  display: grid;
`;

const TabBarWrapper = styled.div<{ shouldShowTabBar?: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e8ecfd;
  display: ${(p) => (p.shouldShowTabBar ? 'block' : 'none')};
  z-index: 1000;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const TabBarNavLink = styled.a<{ isActive?: boolean }>`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg * {
    fill: ${(props) => (props.isActive ? '#706EFF' : '#7578B5')};
  }

  & > svg {
    height: 20px;
    width: 20px;
  }
  :hover > svg * {
    fill: ${(props) => (props.isActive ? '#706EFF' : '#000000')};
  }
`;

const ConnectWalletButton = styled(MatchaPrimaryButton)`
  height: 44px;
  box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
  font-size: 16px;
  margin-right: 20px;
`;

const TabBarSafeAreaSpacer = styled.div`
  width: 100%;
  height: env(safe-area-inset-bottom);
  min-height: env(safe-area-inset-bottom);
`;

const TabBarSpacerWrapper = styled.div<{ shouldShowTabBar?: boolean }>`
  display: ${(p) => (p.shouldShowTabBar ? 'block' : 'none')};
`;

const TabBarContentSpacer = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  height: ${TAB_BAR_HEIGHT}px;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    height: 0;
  }
`;

const pagesWithoutTabBar: string[] = ['[...tradingParams]', 'onboard'];

export const TabBarSpacer: FC = () => {
  const router = useRouter();

  const shouldShowTabBar = useMemo(() => {
    if (pagesWithoutTabBar.some((page) => router.pathname.includes(page))) {
      return false;
    }
    return true;
  }, [router]);

  return (
    <TabBarSpacerWrapper shouldShowTabBar={shouldShowTabBar}>
      <TabBarContentSpacer />
      <TabBarSafeAreaSpacer />
    </TabBarSpacerWrapper>
  );
};

export const TabBar: FC = () => {
  const router = useRouter();
  const { account } = useWeb3React();
  const { triedEagerConnect } = useWalletConnectionState();

  const isMounted = useMounted();
  const analytics = useMixpanelAnalytics();

  const shouldShowTabBar = useMemo(() => {
    if (pagesWithoutTabBar.some((page) => router.pathname.includes(page))) {
      return false;
    }
    return true;
  }, [router]);

  return (
    <>
      {isMounted && (
        <TabBarWrapper shouldShowTabBar={shouldShowTabBar}>
          <TabBarContent isLoggedIn={!!account}>
            <Link passHref href={routes.HOME}>
              <TabBarNavLink
                isActive={router.pathname === '/'}
                onClick={() =>
                  analytics.track?.(
                    MATCHA_ANALYTIC_EVENTS.TABBAR_CLICK_CONNECT_WALLET_LINK,
                    {},
                  )
                }
              >
                <HouseDesktopIcon />
              </TabBarNavLink>
            </Link>
            <Link passHref href={routes.EXPLORE}>
              <TabBarNavLink
                isActive={router.pathname === '/explore'}
                onClick={() =>
                  analytics.track?.(
                    MATCHA_ANALYTIC_EVENTS.TABBAR_CLICK_EXPLORE_LINK,
                    {},
                  )
                }
              >
                <CompassDesktopIcon />
              </TabBarNavLink>
            </Link>
            {!!account ? (
              <>
                <Link passHref href={`${routes.PROFILE}?tab=notification`}>
                  <TabBarNavLink
                    isActive={
                      router.pathname === '/profile' &&
                      (router.query?.tab as string) === 'notification'
                    }
                    onClick={() =>
                      analytics.track?.(
                        MATCHA_ANALYTIC_EVENTS.TABBAR_CLICK_NOTIFICATIONS_LINK,
                        {},
                      )
                    }
                  >
                    <BellDesktopIcon />
                  </TabBarNavLink>
                </Link>
                <Link passHref href={routes.PROFILE}>
                  <TabBarNavLink
                    isActive={
                      router.pathname === '/profile' &&
                      (router.query?.tab as string) !== 'notification'
                    }
                    onClick={() =>
                      analytics.track?.(
                        MATCHA_ANALYTIC_EVENTS.TABBAR_CLICK_PROFILE_LINK,
                        {},
                      )
                    }
                  >
                    <ProfileDesktopIcon />
                  </TabBarNavLink>
                </Link>{' '}
              </>
            ) : (
              <>
                {triedEagerConnect && (
                  <Link
                    passHref
                    href={{
                      pathname: routes.LOGIN,
                      query: {
                        to: router.pathname, // filename route
                        as: router.asPath, // user-rendered route
                      },
                    }}
                  >
                    <TabBarNavLink
                      isActive={false}
                      onClick={() =>
                        analytics.track?.(
                          MATCHA_ANALYTIC_EVENTS.TABBAR_CLICK_CONNECT_WALLET_LINK,
                          {},
                        )
                      }
                    >
                      <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
                    </TabBarNavLink>
                  </Link>
                )}
              </>
            )}
          </TabBarContent>
          <TabBarSafeAreaSpacer />
        </TabBarWrapper>
      )}
    </>
  );
};

import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import { useClickAway, useCopyToClipboard } from 'react-use';
import styled from 'styled-components';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorBitski,
  PopUpWasBlockedByBrowserError as PopUpWasBlockedByBrowserErrorBitski,
  SignInRequestCancelledError as SignInRequestCancelledErrorBitski,
} from '../utils/web3/bitski-connector';
import { useInactiveListener } from '../hooks/useInactiveListener';
import { useDetectMobile } from '../hooks/useDetectMobile';
import { useWalletHistory } from '../hooks/useWalletHistory';
import {
  injected,
  walletconnect,
  walletlink,
  bitski,
  AvailableConnectors,
  AvailableConnectorKeys,
  ConnectorNames,
  getConnectorName,
  resetWalletLink,
  resetWalletConnect,
} from '../utils/web3/connector-instances';
import { reenableEagerWalletConnectPreferenceIfDisabled } from '../utils/preferences';
import {
  getInjectedProviderType,
  InjectedProviders,
} from '../utils/web3/helpers';
import { MetaMaskIcon } from '../components/icons/MetaMask';
import { ThickSpinnerIcon } from '../components/icons/Spinner';
import { BitskiIcon } from '../components/icons/Bitski';
import { CoinbaseWalletIcon } from '../components/icons/CoinbaseWallet';
import { WalletConnectIcon } from '../components/icons/WalletConnect';
import { TrustWalletIcon } from '../components/icons/TrustWallet';
import { StatusWalletIcon } from './icons/StatusWallet';
import { ImTokenWalletIcon } from './icons/ImTokenWalletIcon';
import { H3, PBig } from '../components/Typography';
import { MatchaPrimaryButton } from '../components/Buttons';
import { WalletIcon } from './icons/Wallet';
import { useRouter } from 'next/router';
import { routes } from '../utils/routes';

const WalletIconWrapper = styled.div`
  width: 128px;
  margin-bottom: 32px;
`;

const WalletIconHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

export const StyledWalletButton = styled.button`
  background-color: ${(props) => props.theme.palette.white};
  border: 1px solid ${(props) => props.theme.palette.mutedPurple};
  box-sizing: border-box;
  border-radius: 8px;
  width: 320px;
  height: 52px;
  outline: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.18s ease-in;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  will-change: transform, box-shadow, border;

  & + & {
    margin-top: 20px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    & + & {
      margin-top: 12px;
    }
  }

  & > span {
    font-family: 'Gilroy';
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    font-size: 16px;
    line-height: 140%;
    color: #1f1f41;
  }

  :active {
    transform: scale(0.98);
  }

  :hover {
    transform: scale(0.98), translateY(-2px);
    border: 1px solid #cdd2ea;
    box-shadow: 0px 5px 12px rgba(31, 31, 65, 0.08);
  }
`;

export const IconWrapper = styled.div`
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 24px 0 16px;
`;

const WalletButton: React.FC<WalletButtonProps> = ({
  icon,
  confirmingIcon,
  walletName,
  isConfirming,
  onClick,
}) => {
  return (
    <StyledWalletButton onClick={onClick}>
      {isConfirming ? (
        <>
          <IconWrapper>{confirmingIcon}</IconWrapper>
          <span>Confirm in {walletName}</span>
        </>
      ) : (
        <>
          <IconWrapper>{icon}</IconWrapper>
          <span>Connect {walletName}</span>
        </>
      )}
    </StyledWalletButton>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;

const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

const MenuWrapper = styled(FlexColumn)<EmbeddedProps>`
  align-items: center;
  margin: ${(props) => !props.isEmbedded && 'auto'};
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-top: 0;
  }
`;

export const FadedText = styled.p`
  font-family: 'Gilroy';
  font-size: 15px;
  line-height: 140%;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: #7578b5;
`;

export const WalletsContainer = styled(Flex)<EmbeddedProps>`
  margin: auto;
  justify-content: center;
  margin-top: ${(props) => (props.isEmbedded ? '0' : '20px')};
  margin-bottom: ${(props) => (props.isEmbedded ? '0' : '100px')};

  flex-wrap: wrap;
  flex-direction: ${(props) => (props.isEmbedded ? 'column' : 'row')};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: column;
    margin-top: 0;
  }
`;

export const WalletGroup = styled(FlexColumn)<EmbeddedProps>`
  justify-content: center;
`;

export const VerticalSeparator = styled.div`
  width: 0px;
  height: 85px;
  border-right: 1px solid #e8ecfd;
  margin: 0 100px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    width: 95px;
    height: 0;
    border-right: none;
    border-top: 1px solid #e8ecfd;
    margin: 32px 0;
  }
`;

export const WalletGroupSeparator = styled(FlexColumn)`
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    height: auto;
    flex-direction: row;
    width: 300px;
    align-self: center;
  }
`;

export const StyledMatchaPrimaryButton = styled(MatchaPrimaryButton)`
  height: 52px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 300px;
  }
`;

const ErrorMessage = styled.p`
  font-family: 'Gilroy';
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: 18px;
  color: #ff656d;
  background: rgba(255, 101, 109, 0.15);
  border-radius: 8px;
  padding: 15px;
`;

const ErrorMessageContainer = styled.div<{ isEmbedded?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.isEmbedded ? 'inherit' : '60px')};
  max-height: 60px;
  max-width: 600px;
  margin: 0 auto ${(props) => (props.isEmbedded ? '20px' : '0px')};
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 320px;
    margin-bottom: ${(props) => !props.isEmbedded && '10px'};
  }
`;

export const CreateWalletContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  align-items: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-top: 0px;
  }
`;

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorBitski
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  } else if (error instanceof PopUpWasBlockedByBrowserErrorBitski) {
    return 'The login popup was blocked by your browser. Please make sure https://account.bitski.com is allowed to open popups and try again.';
  } else if (error instanceof SignInRequestCancelledErrorBitski) {
    return 'Sign in with Bitski was cancelled. Click the Bitski button to try again.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

const ConnectWalletMenu: React.FC<ConnectWalletMenuProps> = ({
  isEmbedded,
  errorMessage,
  onLogin,
  hideCreateWallet,
}) => {
  const {
    activate,
    setError,
    error,
    connector: currentConnector,
  } = useWeb3React();
  const { addWalletHistory } = useWalletHistory();
  const [, copyToClipboard] = useCopyToClipboard();

  const [hasCopiedToClipboard, setHasCopiedToClipboard] = useState<boolean>(
    false,
  );

  // Keep track of web3 connection in progress
  const [activatingConnector, setActivatingConnector] = React.useState<
    AvailableConnectors | undefined
  >();

  // Handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!!activatingConnector);

  // Try to identify the injected provider on mount
  const [injectProviderType, setInjectedProviderType] = useState<
    InjectedProviders | undefined
  >(undefined);
  useEffect(() => {
    const getProviderType = async () => {
      const _provider = await injected.getProvider();
      const _providerType = getInjectedProviderType(_provider);
      if (_providerType) {
        setInjectedProviderType(_providerType);
      }
    };

    getProviderType().catch((e) => {
      console.error(e);
      setInjectedProviderType(undefined);
    });
  }, []);

  // Check if we are authorized to use the injected provider
  // activatingConnector === injected && !isAuthorized === true means they need to click the connect button in MM
  const [
    isInjectedProviderAuthorized,
    setIsInjectedProviderAuthorized,
  ] = useState<boolean>(false);
  useEffect(() => {
    const checkAuthorization = async () => {
      if (injected) {
        const isAuthorized = await injected.isAuthorized();
        setIsInjectedProviderAuthorized(isAuthorized);
      }
    };

    checkAuthorization().catch((err) => {
      console.error(err);
    });
  }, [activatingConnector]);

  const handleWeb3Activation = useCallback(
    async (connector: AvailableConnectors) => {
      setActivatingConnector(connector);
      reenableEagerWalletConnectPreferenceIfDisabled();

      const connectorName = getConnectorName(connector);
      let walletName:
        | AvailableConnectorKeys
        | InjectedProviders
        | undefined = connectorName;

      if (connectorName === ConnectorNames.Injected && injectProviderType) {
        walletName = injectProviderType;
      }

      if (!!connector && connector instanceof WalletConnectConnector) {
        if (
          !!currentConnector &&
          currentConnector instanceof WalletConnectConnector
        ) {
          currentConnector.close();
        }
        connector.walletConnectProvider = undefined;
      }

      await activate(connector, undefined, true)
        .then(() => {
          setActivatingConnector(undefined);

          if (walletName && connectorName) {
            addWalletHistory(walletName, connectorName);
          }

          if (onLogin) {
            onLogin();
          }
        })
        .catch((err) => {
          setError(err);
          setActivatingConnector(undefined);
          // Reset connectors otherwise they can get stuck in an invalid state
          // e.g. user closes the modal, connector is instantiated but not connected
          if (walletName === ConnectorNames.WalletLink) {
            resetWalletLink();
          } else if (walletName === ConnectorNames.WalletConnect) {
            resetWalletConnect();
          }
        });
    },
    [
      currentConnector,
      activate,
      injectProviderType,
      addWalletHistory,
      setError,
      onLogin,
    ],
  );

  const handleConnectOnclick = useMemo(
    () => ({
      [ConnectorNames.Injected]: () => handleWeb3Activation(injected),
      [ConnectorNames.Bitski]: () => handleWeb3Activation(bitski),
      [ConnectorNames.WalletLink]: () => handleWeb3Activation(walletlink),
      [ConnectorNames.WalletConnect]: () => handleWeb3Activation(walletconnect),
    }),
    [handleWeb3Activation],
  );

  const isMobile = useDetectMobile();
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  useClickAway(menuWrapperRef, () => {
    // Clicking outside of the menu should hide dialog on mobile
    if (onLogin && isMobile) {
      onLogin();
    }
  });

  const router = useRouter();
  const startOnboarding = useCallback(async () => {
    router.push(routes.ONBOARD.START);
  }, [router]);

  // const handleCreateBitskiWallet = useCallback(async () => {
  //   // HACK(kimpers): This is an ugly hack to work around web3-react not supporting passing params
  //   // to the connector's activate function
  //   try {
  //     bitski.shouldSuggestSignup = true;
  //     await handleWeb3Activation(bitski);
  //   } finally {
  //     bitski.shouldSuggestSignup = false;
  //   }
  // }, [handleWeb3Activation]);

  const handleCopyToClipboard = useCallback(() => {
    const url = location.href;
    copyToClipboard(url);

    setHasCopiedToClipboard(true);
  }, [copyToClipboard]);

  useEffect(() => {
    let stale = false;

    setTimeout(() => {
      if (!stale) {
        setHasCopiedToClipboard(false);
      }
    }, 5000);

    return () => {
      stale = true;
    };
  }, [hasCopiedToClipboard]);

  return (
    <MenuWrapper isEmbedded={isEmbedded} ref={menuWrapperRef}>
      <ErrorMessageContainer isEmbedded={isEmbedded}>
        {error ? (
          <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>
        ) : (
          errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </ErrorMessageContainer>
      <WalletsContainer isEmbedded={isEmbedded}>
        {!isEmbedded && !hideCreateWallet && (
          <>
            <CreateWalletContainer>
              <WalletIconWrapper>
                <WalletIcon />
              </WalletIconWrapper>
              <H3 style={{ marginBottom: '12px', textAlign: 'center' }}>
                New here?
              </H3>
              <PBig style={{ marginBottom: '32px', color: '#7578B5' }}>
                Welcome to DeFi! Create a crypto wallet to start trading on
                Matcha.
              </PBig>
              <StyledMatchaPrimaryButton
                onClick={startOnboarding}
                style={{ marginBottom: 12 }}
              >
                Get started
              </StyledMatchaPrimaryButton>
              {/* <PLabel style={{ marginTop: '12px', color: '#7578B5' }}>
                Powered by Bitski
              </PLabel> */}
            </CreateWalletContainer>
            <WalletGroupSeparator>
              <VerticalSeparator />
              <FadedText>or</FadedText>
              <VerticalSeparator />
            </WalletGroupSeparator>
          </>
        )}
        <WalletGroup isEmbedded={isEmbedded}>
          {hideCreateWallet && (
            <WalletIconHeaderWrapper>
              <WalletIconWrapper>
                <WalletIcon />
              </WalletIconWrapper>
              <H3 style={{ marginBottom: '12px', textAlign: 'center' }}>
                Connect your wallet
              </H3>
            </WalletIconHeaderWrapper>
          )}

          {injectProviderType === InjectedProviders.Status && (
            <WalletButton
              walletName="Status"
              isConfirming={
                !isInjectedProviderAuthorized &&
                activatingConnector === injected
              }
              icon={<StatusWalletIcon />}
              confirmingIcon={<ThickSpinnerIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          {injectProviderType === InjectedProviders.Metamask && (
            <WalletButton
              walletName="MetaMask"
              isConfirming={
                !isInjectedProviderAuthorized &&
                activatingConnector === injected
              }
              icon={<MetaMaskIcon />}
              confirmingIcon={<ThickSpinnerIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          {injectProviderType === InjectedProviders.TrustWallet && (
            <WalletButton
              walletName="Trust Wallet"
              icon={<TrustWalletIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          {injectProviderType === InjectedProviders.CoinbaseWallet && (
            <WalletButton
              walletName="Coinbase Wallet"
              icon={<CoinbaseWalletIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          {injectProviderType === InjectedProviders.ImToken && (
            <WalletButton
              walletName="ImToken Wallet"
              icon={<ImTokenWalletIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          <WalletButton
            walletName="mobile wallet"
            icon={<WalletConnectIcon />}
            onClick={handleConnectOnclick.WalletConnect}
          />
          {isMobile === false && (
            <WalletButton
              walletName="Coinbase Wallet"
              icon={<CoinbaseWalletIcon />}
              onClick={handleConnectOnclick.WalletLink}
            />
          )}
          <WalletButton
            walletName="Bitski wallet"
            icon={<BitskiIcon />}
            onClick={handleConnectOnclick.Bitski}
          />
          {isMobile === true && (
            <StyledWalletButton
              onClick={handleCopyToClipboard}
              style={{ justifyContent: 'center' }}
            >
              <span style={{ color: '#7578B5' }}>
                {hasCopiedToClipboard ? 'Copied...' : 'Copy this URL'}
              </span>
            </StyledWalletButton>
          )}
        </WalletGroup>
      </WalletsContainer>
    </MenuWrapper>
  );
};

const MemoizedConnectWalletMenu = React.memo(ConnectWalletMenu);

export { MemoizedConnectWalletMenu as ConnectWalletMenu };

interface ConnectWalletMenuProps {
  isEmbedded?: boolean;
  onLogin?: () => void;
  errorMessage?: string;
  hideCreateWallet?: boolean;
}

interface EmbeddedProps {
  isEmbedded?: boolean;
}

interface WalletButtonProps {
  walletName: string;
  isConfirming?: boolean;
  icon?: React.ReactNode;
  confirmingIcon?: React.ReactNode;
  onClick?: () => void;
}

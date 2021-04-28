import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { P } from './Typography';
import { routes } from '../utils/routes';
import { MATCHA_HELP_HOME_URL } from '../utils/config';
import { TabBarSpacer } from './TabBar';

// NOTE(johnrjj) - For now, since P tags currently override text color cascade, we explicitly set to 'inherit' here
const PWithInheritFontColor = styled(P)`
  color: inherit;
  font-weight: 600;
`;

const StyledAnchorLink = styled.a`
  color: #0e103c;
  :visited {
    color: #0e103c;
  }
  :hover,
  :active,
  :hover:visited {
    color: #706eff;
  }
  text-decoration: none;
  :hover,
  :visited,
  :link,
  :active {
    text-decoration: none;
  }
`;

const GrayStyledAnchorLink = styled(StyledAnchorLink)`
  color: #7d7f9d;
  :visited {
    color: #7d7f9d;
  }
`;

const FooterContainer = styled.div<{ hasNoTopMargin: boolean }>`
  width: 100%;
  height: 100px;
  margin-top: ${(props) => (props.hasNoTopMargin ? '0px' : '120px')};
  border-top: 1px solid #e8ecfd;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-top: 80px;
  }
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto auto;
  align-items: center;
  max-width: 1000px;
  padding: 0 10px;

  ${StyledAnchorLink} + ${StyledAnchorLink} {
    margin-left: 40px;
  }

  ${P}:first-of-type {
    margin-right: auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    margin: 30px auto 50px auto;
  }
`;

const FooterContentRight = styled.div`
  display: flex;
  align-items: center;
`;

const FooterContentLeft = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: 16px;
  }
`;

export interface FooterProps {
  hasNoTopMargin?: boolean;
}

const Footer: React.FC<FooterProps> = ({ hasNoTopMargin }) => {
  return (
    <>
      <FooterContainer hasNoTopMargin={hasNoTopMargin || false}>
        <FooterRow>
          <FooterContentLeft>
            <P style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={routes.HOME} passHref={true}>
                <StyledAnchorLink>
                  <PWithInheritFontColor
                    as={'span'}
                    fontSize="16px"
                    lineHeight="19px"
                  >
                    Matcha
                  </PWithInheritFontColor>
                </StyledAnchorLink>
              </Link>
              <P
                as={'span'}
                style={{ margin: '0 4px', color: '#7d7f9d', fontSize: 16 }}
              >
                by
              </P>
              <GrayStyledAnchorLink
                href="https://0x.org"
                target="_blank"
                rel="noopener"
              >
                <PWithInheritFontColor
                  as={'span'}
                  style={{ color: 'inherit', fontSize: 16 }}
                >
                  0x
                </PWithInheritFontColor>
              </GrayStyledAnchorLink>
            </P>
          </FooterContentLeft>
          <FooterContentRight>
            <StyledAnchorLink
              href={MATCHA_HELP_HOME_URL}
              target="_blank"
              rel="noopener"
            >
              <PWithInheritFontColor fontSize="16px" lineHeight="19px">
                Help
              </PWithInheritFontColor>
            </StyledAnchorLink>
            <Link href={routes.BLOG} passHref={true}>
              <StyledAnchorLink>
                <PWithInheritFontColor fontSize="16px" lineHeight="19px">
                  Blog
                </PWithInheritFontColor>
              </StyledAnchorLink>
            </Link>
            <Link href={routes.TERMS_OF_SERVICE} passHref={true}>
              <StyledAnchorLink>
                <PWithInheritFontColor fontSize="16px" lineHeight="19px">
                  Terms
                </PWithInheritFontColor>
              </StyledAnchorLink>
            </Link>
            <Link href={routes.PRIVACY} passHref={true}>
              <StyledAnchorLink>
                <PWithInheritFontColor fontSize="16px" lineHeight="19px">
                  Privacy
                </PWithInheritFontColor>
              </StyledAnchorLink>
            </Link>
          </FooterContentRight>
        </FooterRow>
      </FooterContainer>
      <TabBarSpacer />
    </>
  );
};

export { Footer };

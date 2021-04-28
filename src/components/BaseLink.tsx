import React, { FC } from 'react';
import styled from 'styled-components';
import Link, { LinkProps } from 'next/link';

export const StyledLink = styled.a`
  font-family: 'Gilroy';
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  font-size: 16px;
  line-height: 140%;
  color: #706eff;
  text-decoration: none;

  :hover,
  :active {
    text-decoration: underline;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

interface BaseLinkProps extends LinkProps {
  href: string;
  className?: string;
  external?: boolean;
  style?: any;
}

// TODO(johnrjj) - Figure out a good way to pass ...rest spread to both the StyledLink and the next.js Link component
// TODO(johnrjj) - a.small style of BaseLink
export const BaseLink: FC<BaseLinkProps> = ({
  className,
  children,
  external,
  href,
  as,
  ...rest
}) => {
  if (external) {
    return (
      <StyledLink
        className={className}
        target="_blank"
        rel="noopener"
        href={href}
        {...rest}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <Link as={as} passHref {...rest} href={href}>
      <StyledLink className={className}>{children}</StyledLink>
    </Link>
  );
};

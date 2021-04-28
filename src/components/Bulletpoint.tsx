import React from 'react';
import styled from 'styled-components';
import { BulletpointIcon } from './icons/Bulletpoint';
import { P } from './Typography';

const BulletpointUl = styled.ul``;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 0;
`;

const StyledLiContent = styled(P)`
  margin-left: 12px;
  font-size: 16px;
  font-weight: 600;
`;

const BulletpointLi: React.FC<{}> = ({ children }) => {
  return (
    <StyledLi>
      <BulletpointIcon />
      <StyledLiContent>{children}</StyledLiContent>
    </StyledLi>
  );
};
export { BulletpointUl, BulletpointLi };

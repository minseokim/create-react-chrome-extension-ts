import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-y: auto;
  min-height: 100%;
`;

// Expands on the left to take up remaining space
export const LeftFillContainer = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-basis: 0;
  flex-grow: 1;
  padding-left: 24px;
`;

// Expands on the right to take up remaining space
export const RightFillContainer = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-basis: 0;
  flex-grow: 1;
  padding-right: 24px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    background-color: #ffffff;
  }
`;

// Main container is seperated in a left (white background) and right (gray background)
export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-basis: 1200px;
  max-width: 1200px;
  flex: 1;
  flex-grow: 1000;
`;

// Wrapper for pages that don't have enough content to fill the viewable area
export const FullViewportContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-basis: 760px;
  padding-right: 80px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding-right: 40px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-right: 0;
  }
  flex-direction: column;
`;

export const RightColumn = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-basis: 440px;
  max-width: 440px;
  padding-left: 80px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding-left: 40px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

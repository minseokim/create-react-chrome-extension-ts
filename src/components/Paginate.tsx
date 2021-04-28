import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Pagination from 'rc-pagination';
import { BaseButton } from './BaseButton';
import { ChevronLeftIcon } from './icons/ChevronLeft';
import { ChevronRightIcon } from './icons/ChevronRight';
import { P } from './Typography';
import { ExpandIcon } from './icons/Expand';

const PaginateControlsContainer = styled.div`
  & * {
    outline: none;
  }
  display: flex;
  & .rc-pagination {
    display: flex;
    align-items: center;
  }
  & .rc-pagination .rc-pagination-item {
    margin: 0 2px;
  }
  & .rc-pagination .rc-pagination-item-active > button {
    background-color: #706eff;
    p {
      color: #ffffff;
    }
  }
`;

const PageButton = styled(BaseButton)`
  outline: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  transition: all 0.08s ease-in;
  transition-property: transform, background-color;
  cursor: pointer;
  &:hover {
    background-color: #e8ecfd;
    transform: scale(1.08, 1.08); // TODO(dave4506) use springs?
  }
  &:disabled:hover {
    background-color: transparent;
    transform: scale(1, 1);
  }
  & > p {
    color: #000000;
  }
`;

const IconButton = styled(PageButton)`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    display: block;
  }
  & > svg * {
    fill: ${(props) => (props.disabled ? '#7578B5' : '#000000')};
  }
`;

const StyledP = styled(P)`
  padding-top: 2px;
  font-weight: 600;
`;

const itemRender = (current: number, type: string, element: ReactNode) => {
  if (type === 'page') {
    return (
      <PageButton>
        <StyledP>{current}</StyledP>
      </PageButton>
    );
  }
  if (type === 'prev') {
    return (
      <IconButton style={{ marginRight: '24px' }}>
        <ChevronLeftIcon />
      </IconButton>
    );
  }
  if (type === 'next') {
    return (
      <IconButton style={{ marginLeft: '24px' }}>
        <ChevronRightIcon />
      </IconButton>
    );
  }
  if (type === 'jump-prev' || type === 'jump-next') {
    return (
      <IconButton>
        <ExpandIcon />
      </IconButton>
    );
  }
  return element;
};

export interface PaginateControlsProps {
  itemsCount: number;
  itemsPerPage: number;
  currentPageIndex: number;
  goToPage: (index: number) => void;
}

export const PaginateControls: FC<PaginateControlsProps> = ({
  itemsCount,
  itemsPerPage,
  currentPageIndex,
  goToPage,
}) => {
  return (
    <PaginateControlsContainer>
      <Pagination
        defaultCurrent={1}
        current={currentPageIndex + 1}
        total={itemsCount}
        pageSize={itemsPerPage}
        showTitle={false}
        itemRender={itemRender}
        onChange={(page: number) => {
          goToPage(page - 1);
        }}
      />
    </PaginateControlsContainer>
  );
};

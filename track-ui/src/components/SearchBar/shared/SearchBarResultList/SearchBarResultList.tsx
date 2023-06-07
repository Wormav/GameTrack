import React from 'react';
import { List, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import { StyledResultContainer } from './search-bar-result-list.styles';

export interface ISearchResult {
  id: number;
  title: string;
  cover: string;
  alreadyAdded?: boolean;
}

interface SearchBarResultListProps {
  isOpen: boolean;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  data: ISearchResult[] | undefined;
  verticalAnchorOrigin?: number;
  fullSize?: boolean;
  hasMore: boolean;
  setOpenResults: (open: boolean) => void;
  onLoadMore: () => void;
  onClickItem?: () => void;
}

export function SearchBarResultList({
  data,
  isOpen,
  anchorEl,
  setOpenResults,
  onLoadMore,
  verticalAnchorOrigin = 60,
  fullSize = false,
  hasMore,
  onClickItem,
}: SearchBarResultListProps) {
  const navigate = useNavigate();

  const handleClickItem = (id: number) => {
    setOpenResults(false);
    if (onClickItem) {
      onClickItem();
    }
    navigate(`/game/${id}`);
  };

  return (
    <StyledResultContainer
      id="simple-popper"
      open={isOpen}
      anchorEl={anchorEl}
      onClose={() => setOpenResults(false)}
      anchorOrigin={{
        vertical: verticalAnchorOrigin,
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      $fullSize={fullSize}
    >

      {data && data.length > 0 ? (
        <List id="result-list" disablePadding dense>
          <InfiniteScroll
            dataLength={data.length + 20}
            next={onLoadMore}
            scrollableTarget="result-list"
            hasMore={hasMore}
            loader={<div />}
          >
            {data.map((item) => (
              <SearchResultCard
                key={item.id}
                {...item}
                onClick={(id: number) => handleClickItem(id)}
              />
            ))}
          </InfiniteScroll>
        </List>
      ) : (
        <Typography variant="h5">Aucun résultat</Typography>
      )}
    </StyledResultContainer>
  );
}

SearchBarResultList.defaultProps = {
  verticalAnchorOrigin: 60,
  fullSize: false,
  onClickItem: () => {},
};

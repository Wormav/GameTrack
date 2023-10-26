import React, { useCallback, useEffect } from 'react';
import { List, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
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
  enableKeyoardNavigation?: boolean;
  forceHidden: boolean;
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
  enableKeyoardNavigation = false,
  forceHidden,
}: SearchBarResultListProps) {
  const { t } = useTranslation(['common']);
  const [selectedItem, setSelectedItem] = React.useState(-1);
  const navigate = useNavigate();

  const handleClickItem = useCallback((id: number) => {
    setOpenResults(false);
    if (onClickItem) {
      onClickItem();
    }
    navigate(`/game/${id}`);
  }, [navigate, setOpenResults, onClickItem]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enableKeyoardNavigation || !data || !isOpen || !anchorEl) {
        return;
      }
      if (event.key === 'ArrowDown') {
        setSelectedItem((prevSelectedItem) => prevSelectedItem + 1);
      } else if (event.key === 'ArrowUp') {
        setSelectedItem((prevSelectedItem) => prevSelectedItem - 1);
      } else if (event.key === 'Enter') {
        if (selectedItem !== -1) {
          handleClickItem(data[selectedItem].id);
        }
      }
    };
    if (selectedItem !== -1) {
      const listItems = document.querySelectorAll('#result-list li');
      if (listItems[selectedItem]) {
        listItems[selectedItem].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, enableKeyoardNavigation, data, handleClickItem, isOpen, anchorEl]);

  if (forceHidden) {
    return null;
  }
  return (
    <StyledResultContainer
      id="simple-popper"
      open={isOpen}
      anchorEl={anchorEl}
      disableAutoFocus
      disableEnforceFocus
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
            {data.map((item, index) => (
              <SearchResultCard
                key={item.id}
                {...item}
                onClick={(id: number) => handleClickItem(id)}
                selected={selectedItem === index}
              />
            ))}
          </InfiniteScroll>
        </List>
      ) : (
        <Typography variant="h5">{t('noResult')}</Typography>
      )}
    </StyledResultContainer>
  );
}

SearchBarResultList.defaultProps = {
  verticalAnchorOrigin: 60,
  fullSize: false,
  onClickItem: () => { },
  enableKeyoardNavigation: false,
};

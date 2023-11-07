import {
  IconButton,
} from '@mui/material';
import React, {
  useContext, useEffect, useReducer, useRef, useState,
} from 'react';
import axios from '@config/axios.config';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { useInfiniteQuery } from 'react-query';
import isInUserGames from '@src/utils/games';
import { Game, UserGamesContext } from '@src/contexts/UserGamesContext';
import { StyledCloseButton, StyledDiv } from './searchBarMobile.styles';
import { IPage } from '../SearchBarDesktop/SearchBarDesktop';
import { SearchBarActionTypes, initialStateSearchBarReducer, searchBarReducer } from '../reducer/searchbarReducer';
import SearchBarInput from '../shared/SearchBarInput/SearchBarInput';
import { SearchBarResultList } from '../shared/SearchBarResultList/SearchBarResultList';

export default function SearchBarMobile() {
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(searchBarReducer, initialStateSearchBarReducer);
  const [isOpen, setIsOpen] = useState(false);
  const { userGames } = useContext(UserGamesContext);

  const games = userGames?.map((g) => g.game);

  const submitRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setIsOpen(true);
  };

  const disableScroll = () => {
    const currentPosition = document.documentElement.scrollTop;
    window.onscroll = () => {
      window.scrollTo(0, currentPosition);
    };
  };

  const fetchSearchGames = async (searchOffset: number) => {
    const name = state.gameName;
    if (name.length === 0) {
      return ({ games: [], offset: 0, forceHidden: true });
    }
    try {
      const responseData = (
        await axios.get('games', {
          params: { gameName: name, offset: searchOffset },
          withCredentials: true,
        })
      ).data;
      const modifiedData = responseData.games.map((game: Game) => {
        if (isInUserGames(games ?? [], game.id)) {
          return { ...game, alreadyAdded: true };
        }
        return { ...game, alreadyAdded: false };
      });
      dispatch({ type: SearchBarActionTypes.OPEN_RESULTS, payload: { openResults: true } });

      return ({ games: modifiedData, offset: searchOffset, forceHidden: false });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return ({ games: [], offset: 0 });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    dispatch({
      type: SearchBarActionTypes.OPEN_RESULTS,
      payload: { openResults: false },
    });
  };

  useEffect(() => () => {
    if (submitRef.current) {
      clearTimeout(submitRef.current);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      window.onscroll = null;
    }
  }, [isOpen]);

  const {
    data, isLoading, fetchNextPage, hasNextPage, refetch,
  } = useInfiniteQuery({
    queryKey: ['search'],
    enabled: false,
    queryFn: ({ pageParam = 0 }) => fetchSearchGames(pageParam),
    getNextPageParam: (lastPage: IPage) => {
      if (lastPage.games.length < 10) {
        return undefined;
      }
      return lastPage.offset + 10;
    },
    refetchOnWindowFocus: false,
  });

  const submitSearchGame = () => {
    refetch();
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };
  return (
    <>
      {isOpen && (
      <StyledDiv>
        <StyledCloseButton onClick={handleClose} color="primary">
          <ImCross className="cross" />
        </StyledCloseButton>

        <div id="search-container">
          <SearchBarInput
            openResults={state.openResults}
            onSubmit={submitSearchGame}
            dispatchReducer={dispatch}
            value={state.gameName}
            refInput={inputRef}
            showPrefix={false}
            fixedWidth={false}
          />
          {!isLoading && (
          <SearchBarResultList
            data={data?.pages.flatMap((page) => page.games) ?? []}
            anchorEl={inputRef.current}
            isOpen={state.openResults}
            fullSize
            onLoadMore={handleLoadMore}
            hasMore={hasNextPage ?? false}
            forceHidden={false}
          />
          )}

        </div>
      </StyledDiv>
      )}
      <IconButton onClick={handleClick}>
        <AiOutlineSearch />
      </IconButton>
    </>
  );
}

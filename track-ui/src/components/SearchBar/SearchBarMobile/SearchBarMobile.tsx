import {
  IconButton,
} from '@mui/material';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import axios from '@config/axios.config';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { useInfiniteQuery } from 'react-query';
import isInUserGames from '@src/utils/games';
import { Game, UserGamesContext } from '@src/contexts/UserGamesContext';
import SearchBarInput from '../shared/SearchBarInput/SearchBarInput';
import { StyledCloseButton, StyledDiv } from './searchBarMobile.styles';
import { SearchBarResultList } from '../shared/SearchBarResultList/SearchBarResultList';
import { IPage } from '../SearchBarDesktop/SearchBarDesktop';

export default function SearchBarMobile() {
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [gameName, setGameName] = useState('');
  const { games: userGames } = useContext(UserGamesContext);

  const submitRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => setIsOpen((prev) => !prev);

  const disableScroll = () => {
    const currentPosition = document.documentElement.scrollTop;
    window.onscroll = () => {
      window.scrollTo(0, currentPosition);
    };
  };

  const fetchSearchGames = async (name: string, searchOffset: number) => {
    if (!name) {
      return ({ games: [], offset: 0 });
    }
    try {
      const responseData = (
        await axios.get('games/games', {
          params: { gameName: name, offset: searchOffset },
          withCredentials: true,
        })
      ).data;
      const modifiedData = responseData.games.map((game: Game) => {
        if (isInUserGames(userGames ?? [], game.id)) {
          return { ...game, alreadyAdded: true };
        }
        return { ...game, alreadyAdded: false };
      });
      return ({ games: modifiedData, offset: searchOffset });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return ({ games: [], offset: 0 });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setOpenResults(false);
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

  const updateGameName = (value: string) => {
    if (value !== gameName) {
      setGameName(value);
    }
    setOpenResults(true);
  };

  const {
    data, isLoading, fetchNextPage, hasNextPage,
  } = useInfiniteQuery(
    ['search', gameName],
    ({ pageParam = 0 }) => fetchSearchGames(gameName, pageParam),
    {
      getNextPageParam: (lastPage: IPage) => {
        if (lastPage.games.length < 10) {
          return undefined;
        }
        return lastPage.offset + 10;
      },
    },
  );

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
            openResults={openResults}
            onSubmit={updateGameName}
            refInput={inputRef}
            showPrefix={false}
            fixedWidth={false}
            keepOpen
          />
          {!isLoading && (
          <SearchBarResultList
            data={data?.pages.flatMap((page) => page.games) ?? []}
            anchorEl={inputRef.current}
            isOpen={openResults}
            setOpenResults={setOpenResults}
            fullSize
            onLoadMore={handleLoadMore}
            hasMore={hasNextPage ?? false}
            onClickItem={() => setIsOpen(false)}
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

import React, {
  useState, useRef, useContext,
} from 'react';
import { Game, UserGamesContext } from '@src/contexts/UserGamesContext';
import axios from '@config/axios.config';
import isInUserGames from '@src/utils/games';
import { useInfiniteQuery } from 'react-query';
import SearchBarInput from '../shared/SearchBarInput/SearchBarInput';
import { ISearchResult, SearchBarResultList } from '../shared/SearchBarResultList/SearchBarResultList';

export interface IPage {
  games: ISearchResult[];
  offset: number;
}

function SearchBarDesktop() {
  const [openResults, setOpenResults] = useState(false);
  const [gameName, setGameName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { games: userGames } = useContext(UserGamesContext);
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
      setOpenResults(true);

      return ({ games: modifiedData, offset: searchOffset });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return ({ games: [], offset: 0 });
    }
  };

  const updateGameName = (value: string) => {
    if (value !== gameName) {
      setGameName(value);
    } else {
      setOpenResults(true);
    }
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
      <SearchBarInput
        openResults={openResults}
        onSubmit={updateGameName}
        refInput={inputRef}
        showPrefix
        fixedWidth
      />
      {!isLoading && (
        <SearchBarResultList
          data={data?.pages.flatMap((page) => page.games) ?? []}
          anchorEl={inputRef.current}
          isOpen={openResults}
          setOpenResults={setOpenResults}
          onLoadMore={handleLoadMore}
          hasMore={hasNextPage ?? false}
          enableKeyoardNavigation
        />
      )}
    </>
  );
}

export default SearchBarDesktop;

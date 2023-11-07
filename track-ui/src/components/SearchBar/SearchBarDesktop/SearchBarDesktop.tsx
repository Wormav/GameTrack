import React, {
  useRef, useContext, useReducer,
} from 'react';
import { Game, UserGamesContext } from '@src/contexts/UserGamesContext';
import axios from '@config/axios.config';
import isInUserGames from '@src/utils/games';
import { useInfiniteQuery } from 'react-query';
import { ISearchResult, SearchBarResultList } from '../shared/SearchBarResultList/SearchBarResultList';
import { SearchBarActionTypes, initialStateSearchBarReducer, searchBarReducer } from '../reducer/searchbarReducer';
import SearchBarInput from '../shared/SearchBarInput/SearchBarInput';

export interface IPage {
  games: ISearchResult[];
  offset: number;
  forceHidden?: boolean;
}

export function SearchBarDesktop() {
  const [state, dispatch] = useReducer(searchBarReducer, initialStateSearchBarReducer);

  const inputRef = useRef<HTMLInputElement>(null);
  const { userGames } = useContext(UserGamesContext);

  const games = userGames?.map((g) => g.game);

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
      <SearchBarInput
        value={state.gameName}
        dispatchReducer={dispatch}
        openResults={state.openResults}
        onSubmit={submitSearchGame}
        refInput={inputRef}
        showPrefix
        fixedWidth
      />
      {!isLoading && (
        <SearchBarResultList
          data={data?.pages.flatMap((page) => page.games) ?? []}
          anchorEl={inputRef.current}
          isOpen={state.openResults}
          onLoadMore={handleLoadMore}
          hasMore={hasNextPage ?? false}
          enableKeyoardNavigation
          forceHidden={data?.pages[0].forceHidden ?? false}
        />
      )}
    </>
  );
}

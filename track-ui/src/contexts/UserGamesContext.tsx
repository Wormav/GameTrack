import React, {
  createContext, useContext, useEffect, useState, useMemo,
} from 'react';
import axios from '@config/axios.config';
import { useQuery } from 'react-query';
import { ErrorContext } from './ErrorContext';

export const UserGamesContext = createContext<{
  refetch:() => void;
  userGames: UserGame[] | null;
  isLoading: boolean;
  setUpdateUserGames: React.Dispatch<React.SetStateAction<boolean>>;
}>({
      userGames: null,
      refetch: () => {},
      isLoading: false,
      setUpdateUserGames: () => {},
    });

export interface Game {
  id: number;
  game_id: number;
  title: string;
  description: string;
  update_at: string;
  isCompleted: boolean;
}

export interface UserGameTime {
  id: number;
  user_game: UserGame;
  user_game_id: number;
  main_story?: number;
  main_extra?: number;
  completionist?: number;
  single_player?: number;
  solo?: number;
  coOp?: number;
  all_style?: number;
}

export interface UserGame {
  done: boolean;
  game: Game;
  game_id: number;
  game_time: UserGameTime;
  id: number;
  user_id: number;
}

interface UserGamesProviderProps {
  children: React.ReactNode;
}

export function UserGamesProvider({ children }: UserGamesProviderProps) {
  const { setError } = useContext(ErrorContext);
  const [updateUserGames, setUpdateUserGames] = useState(false);

  const fetchUserGames = async () => {
    const response = await axios.get('/user/games', { withCredentials: true });
    return response.data;
  };

  const {
    data: userGamesData,
    isError,
    error,
    refetch,
    isLoading,
  } = useQuery<UserGame[]>('userGames', fetchUserGames, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (updateUserGames) {
      refetch();
      setUpdateUserGames(false);
    }
  }, [updateUserGames, refetch]);

  const userGames = userGamesData || null;

  const contextValue = useMemo(
    () => ({
      userGames, refetch, isLoading, setUpdateUserGames,
    }),
    [userGames, refetch, isLoading, setUpdateUserGames],
  );

  if (isError) {
    if (import.meta.env.DEV_CONSOLE_LOG) {
      // eslint-disable-next-line no-console
      console.error({ message: 'UserGamesContext', error });
    }
    setError(true);
    return null;
  }

  return (
    <UserGamesContext.Provider value={contextValue}>
      {children}
    </UserGamesContext.Provider>
  );
}

import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';
import { ErrorContext } from './ErrorContext';

export const UserGamesContext = createContext<{
  setUpdateUserGames: React.Dispatch<React.SetStateAction<boolean>>;
  userGames: UserGame[] | null;
  updateUserGames: boolean;
}>({
  userGames: null,
  setUpdateUserGames: () => {},
  updateUserGames: false,
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
  user_game : UserGame;
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
  user_id: number
}

interface UserGamesProviderProps {
  children: React.ReactNode;
}

export function UserGamesProvider({ children }: UserGamesProviderProps) {
  const [userGames, setUserGames] = useState<UserGame[] | null>(null);
  const [updateUserGames, setUpdateUserGames] = useState(false);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    axios
      .get('/user/games', {
        withCredentials: true,
      })
      .then((res) => {
        setUserGames(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        setError(true);
      });
  }, [updateUserGames, setError]);

  const contextValue = useMemo(
    () => ({
      updateUserGames, userGames, setUpdateUserGames,
    }),
    [updateUserGames, userGames, setUpdateUserGames],
  );

  return (
    userGames && (
      <UserGamesContext.Provider value={contextValue}>
        {children}
      </UserGamesContext.Provider>
    )
  );
}

import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';
import { ErrorContext } from './ErrorContext';

export const UserGamesContext = createContext<{
  games: Game[] | null;
  updateGames: boolean;
  setUpdateGames: React.Dispatch<React.SetStateAction<boolean>>;
  userGames: UserGame[] | null;
}>({
  games: null,
  updateGames: false,
  userGames: null,
  setUpdateGames: () => {},
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
  const [games, setGames] = useState<Game[] | null>(null);
  const [userGames, setUserGames] = useState<UserGame[] | null>(null);
  const [updateGames, setUpdateGames] = useState(false);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    axios
      .get('/user/games', {
        withCredentials: true,
      })
      .then((res) => {
        setGames(res.data.map((userGame : UserGame) => userGame.game));
        setUserGames(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        setError(true);
      });
  }, [updateGames, setError]);

  const contextValue = useMemo(
    () => ({
      games, updateGames, userGames, setUpdateGames,
    }),
    [games, updateGames, userGames, setUpdateGames],
  );

  return (
    games && (
      <UserGamesContext.Provider value={contextValue}>
        {children}
      </UserGamesContext.Provider>
    )
  );
}

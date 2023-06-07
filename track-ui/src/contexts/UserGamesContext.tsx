import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';

export const UserGamesContext = createContext<{
  games: Game[] | null;
  updateGames: boolean;
  setUpdateGames: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  games: null,
  updateGames: false,
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

interface UserGamesProviderProps {
  children: React.ReactNode;
}

export function UserGamesProvider({ children }: UserGamesProviderProps) {
  const [games, setGames] = useState<Game[] | null>(null);
  const [updateGames, setUpdateGames] = useState(false);

  useEffect(() => {
    axios
      .get('/games/usergames', {
        withCredentials: true,
      })
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [updateGames]);

  const contextValue = useMemo(
    () => ({ games, updateGames, setUpdateGames }),
    [games, updateGames, setUpdateGames],
  );

  return (
    games && (
      <UserGamesContext.Provider value={contextValue}>
        {children}
      </UserGamesContext.Provider>
    )
  );
}

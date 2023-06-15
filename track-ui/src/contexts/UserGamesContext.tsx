import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';
import { UserContext } from './UserContext';

export const UserGamesContext = createContext<{
  games: Game[] | null;
  updateGames: boolean;
  setUpdateGames: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  games: null,
  updateGames: false,
  setUpdateGames: () => {},
});

interface Game {
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

  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const { id } = user;
      axios
        .get('/games/usergames', {
          params: { id },
          withCredentials: true,
        })
        .then((res) => {
          setGames(res.data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }, [user, updateGames]);

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

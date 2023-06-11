import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import axios from '@config/axios.config';
import { UserContext } from './UserContext';

export const UserGamesContext = createContext<Game[] | null>(null);

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
  }, [user]);

  return (
    games && (
      <UserGamesContext.Provider value={games}>
        {children}
      </UserGamesContext.Provider>
    )
  );
}

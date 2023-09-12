import React, {
  createContext,
  useContext, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';
import { ErrorContext } from './ErrorContext';

export const UserListsContext = createContext < {
  setUpdateUserLists: React.Dispatch<React.SetStateAction<boolean>> ;
  userLists: List[] | null;
  updateUserLists: boolean;
}>({
  userLists: null,
  setUpdateUserLists: () => { },
  updateUserLists: false,
});

export interface Game {
  id: number;
  game_id: number;
  title: string;
  description: string;
  update_at: string;
  isCompleted: boolean;
  cover: string;
}

export interface List {
  id: number;
  name: string;
  backgroundColor: string;
  icon: string;
  user_id: number;
  games: Game[];
}

interface UserGamesProviderProps {
  children: React.ReactNode;
}

export function UserListsProvider({ children }: UserGamesProviderProps) {
  const [userLists, setUserLists] = useState<List[] | null>(null);
  const [updateUserLists, setUpdateUserLists] = useState(false);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    axios
      .get('/user/lists', {
        withCredentials: true,
      })
      .then((response) => {
        setUserLists(response.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        setError(true);
      });
  }, [updateUserLists, setError]);

  const contextValue = useMemo(
    () => ({
      updateUserLists, userLists, setUpdateUserLists,
    }),
    [updateUserLists, userLists, setUpdateUserLists],
  );

  return (
    userLists && (
      <UserListsContext.Provider value={contextValue}>
        {children}
      </UserListsContext.Provider>
    ));
}

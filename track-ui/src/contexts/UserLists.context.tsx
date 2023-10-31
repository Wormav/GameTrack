import React, {
  createContext,
  useContext, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';
import { useQuery } from 'react-query';
import { ErrorContext } from './ErrorContext';

export const UserListsContext = createContext<{
  refetch:() => void;
  userLists: List[] | null;
  isLoading: boolean;
  setUpdateUserLists: React.Dispatch<React.SetStateAction<boolean>>;
}>({
      userLists: null,
      refetch: () => {},
      isLoading: false,
      setUpdateUserLists: () => {},
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

interface UserListsProviderProps {
  children: React.ReactNode;
}

export function UserListsProvider({ children }: UserListsProviderProps) {
  const { setError } = useContext(ErrorContext);
  const [updateUserLists, setUpdateUserLists] = useState(false);

  const fetchUserLists = async () => {
    const response = await axios.get('/user/lists', { withCredentials: true });
    return response.data;
  };

  const {
    data: userListsData,
    isError,
    error,
    refetch,
    isLoading,
  } = useQuery<List[]>('userLists', fetchUserLists, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (updateUserLists) {
      refetch();
      setUpdateUserLists(false);
    }
  }, [updateUserLists, refetch]);

  const userLists = userListsData || null;

  const contextValue = useMemo(
    () => ({
      userLists, refetch, isLoading, setUpdateUserLists,
    }),
    [userLists, refetch, isLoading, setUpdateUserLists],
  );

  if (isError) {
    if (import.meta.env.DEBUG) {
      // eslint-disable-next-line no-console
      console.error({ message: 'UserListsContext', error });
    }
    setError(true);
    return null;
  }

  return (
    <UserListsContext.Provider value={contextValue}>
      {children}
    </UserListsContext.Provider>
  );
}

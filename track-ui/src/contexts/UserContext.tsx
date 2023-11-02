import React, {
  createContext, useCallback, useMemo, useState, useEffect, useContext,
} from 'react';
import axios from '@config/axios.config';
import { useQuery } from 'react-query';
import { ErrorContext } from './ErrorContext';

export const UserContext = createContext<{
  user: User | null;
  updateUserFromApi: boolean;
  setUpdateUserFromApi: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser:() => void;
}>({
      user: null,
      updateUserFromApi: false,
      setUpdateUserFromApi: () => {},
      updateUser: () => {},
    });

export interface User {
  id: number;
  username: string;
  bio: null | string;
  email: string;
  is_active: boolean;
  avatar: string;
  created_at: string;
  updated_at: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [updateUserFromApi, setUpdateUserFromApi] = useState(false);
  const { setError } = useContext(ErrorContext);

  const fetchUser = async () => {
    const response = await axios.get('/auth', { withCredentials: true });
    return response.data;
  };

  const {
    data: user = null, isError, error, refetch,
  } = useQuery<User | null>('user', fetchUser, {
    enabled: true,
    retry: false,
  });

  const updateUser = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (updateUserFromApi) {
      refetch();
    }
  }, [updateUserFromApi, refetch]);

  const contextValue = useMemo(
    () => ({
      user, updateUserFromApi, setUpdateUserFromApi, updateUser,
    }),
    [user, updateUserFromApi, setUpdateUserFromApi, updateUser],
  );

  if (isError) {
    if (import.meta.env.DEBUG === 'true') {
      // eslint-disable-next-line no-console
      console.error({ message: 'UserContext', error });
    }
    setError(true);
    return null;
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

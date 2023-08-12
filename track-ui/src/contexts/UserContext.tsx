import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';

export const UserContext = createContext<{
  user: User | null;
  updateUserFromApi: boolean;
  setUpdateUserFromApi: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser:(data: Partial<User>) => void;
}>({
      user: null,
      updateUserFromApi: false,
      setUpdateUserFromApi: () => { },
      updateUser: () => { },
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
  const [user, setUser] = useState<User | null>(null);
  const [updateUserFromApi, setUpdateUserFromApi] = useState(false);

  useEffect(() => {
    axios.get(
      '/auth',
      { withCredentials: true },
    )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [updateUserFromApi]);

  const updateUser = useCallback((data: Partial<User>) => {
    if (user) {
      setUser((prevState) => {
        if (prevState) {
          return { ...prevState, ...data };
        }
        return prevState;
      });
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user, updateUserFromApi, setUpdateUserFromApi, updateUser,
    }),
    [user, updateUserFromApi, setUpdateUserFromApi, updateUser],
  );

  return (
    user && (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    )

  );
}

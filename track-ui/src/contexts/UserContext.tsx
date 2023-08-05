import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import axios from '@config/axios.config';

export const UserContext = createContext<{
  user: User | null;
  updateUser: boolean;
  setUpdateUser : React.Dispatch<React.SetStateAction<boolean>>;
}>({
  user: null,
  updateUser: false,
  setUpdateUser: () => {},
});

interface User {
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
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);

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
  }, [updateUser]);

  const contextValue = useMemo(
    () => ({ user, updateUser, setUpdateUser }),
    [user, updateUser, setUpdateUser],
  );

  return (
    user && (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    )

  );
}

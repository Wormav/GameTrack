import React, { createContext, useEffect, useState } from 'react';
import axios from '@config/axios.config';

export const UserContext = createContext(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState(null);

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
  }, []);
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

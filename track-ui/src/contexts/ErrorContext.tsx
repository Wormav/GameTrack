import React, {
  createContext, useMemo, useState,
} from 'react';

export const ErrorContext = createContext<{
  error : boolean
  setError: React.Dispatch<React.SetStateAction<boolean>>
}>({
  error: false,
  setError: () => {},
});

interface ErrorProviderProps {
  children: React.ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState(false);

  const contextValue = useMemo(
    () => ({
      error, setError,
    }),
    [error, setError],
  );

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}

import React, {
  createContext, useMemo, useState,
} from 'react';

export const ErrorContext = createContext<{
  error : Error | null;
  updateError: boolean;
  setUpdateError : React.Dispatch<React.SetStateAction<boolean>>
}>({
  error: null,
  updateError: false,
  setUpdateError: () => {},
});

interface ErrorProviderProps {
  children: React.ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(false);

  const contextValue = useMemo(
    () => ({ error, updateError, setUpdateError }),
    [error, updateError, setUpdateError],
  );

  return (
    error && (
      <ErrorContext.Provider value={contextValue}>
        {children}
      </ErrorContext.Provider>
    )
  );
}

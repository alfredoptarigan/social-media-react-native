import { getCurrentUser } from '@/lib/appwrite';
import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';


interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res) {
        setIsLoggedIn(true)
        setUser(res)
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

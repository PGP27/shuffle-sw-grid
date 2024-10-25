import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AppContextProps } from '~/models/AppContext.model';
import { api } from '~/services/index.service';

const AppContext = createContext({} as AppContextProps);

const AppProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [steamDeals, setSteamDeals] = useState<any>({});
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getSteamDeals = async () => {
    setLoadingData(true);
    await api
      .get('/deals', {
        params: {
          storeID: 1,
          pageNumber,
        },
      })
      .then((res) => setSteamDeals(res.data))
      .finally(() => setLoadingData(false));
  };

  const prevPage = () => {
    setPageNumber((old) => (old < 2 ? old : old - 1));
  };

  const nextPage = () => {
    setPageNumber((old) => (old > 49 ? old : old + 1));
  };

  return (
    <AppContext.Provider
      value={{
        loadingData,
        steamDeals,
        pageNumber,
        getSteamDeals,
        prevPage,
        nextPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };

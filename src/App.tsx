import { useEffect } from 'react';
import { useApp } from './contexts/AppContext';

const App = () => {
  const { loadingData, steamDeals, pageNumber, getSteamDeals, prevPage, nextPage } = useApp();

  useEffect(() => {
    getSteamDeals();
  }, [pageNumber]);

  console.log(steamDeals);

  return <div>App</div>;
};

export { App };

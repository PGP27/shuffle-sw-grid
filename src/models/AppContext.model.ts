import { SteamDealProps } from './SteamDeal.model';

export interface AppContextProps {
  loadingData: boolean;
  steamDeals: SteamDealProps[];
  pageNumber: number;
  getSteamDeals(): void;
  prevPage(): void;
  nextPage(): void;
}

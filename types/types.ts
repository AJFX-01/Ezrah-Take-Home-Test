export type Network = 'ETHEREUM' | 'POLYGON' | 'BSC'

export interface TokenData  {
    name: string;
    symbol: string;
    max_supply: number;
    circulating_supply : number;
    total_supply: number;
    quote: {
        USD: {
            volume_24h: number;
            market_cap: number;
            market_cap_dominance: number;
            fully_diluted_market_cap: number;
            price: number;
            percent_change_24h: number,
            percent_change_7d: number,
            percent_change_30d: number,
            percent_change_60d: number,
            percent_change_90d: number
        };
    }
}

export interface CryptoListItemProps {
    data: TokenData;
    onPress: () => void;  // Event handler for clicking
  }


export interface FavoriteToken {
    name: string;
    balance: string;
    balance2: string;
}


export interface ChartData {
    symbol_id: string;
    time_exchange: Date;
    ask_price: number;
    ask_size: number
    bid_price: number;
    bid_size: number;

}

export interface CryptoLineChartProps {
    data : ChartData[];
}

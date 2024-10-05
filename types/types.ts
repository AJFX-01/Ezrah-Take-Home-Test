export type Network = 'ETHEREUM' | 'POLYGON' | 'BSC'

export interface TokenData  {
    name: string;
    symbol: string;
    quote: {
        USD: {
            price: number;
            percent_change_24h: number
        };
    }
}


export interface FavoriteToken {
    name: string;
    balance: string;
    balance2: string;
}


export interface ChartData {
    symbol_id: string;
    time_exchange: string;
    ask_price: number;
};
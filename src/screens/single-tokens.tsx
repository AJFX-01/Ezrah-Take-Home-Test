import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import TopBar from '../components/topbar';
import CryptoLineChart from '../components/chart';
import { ChartData, TokenData } from '../../types/types';
import CoinApi from '../modules/coin_api';



// type RootStackParamList = {
//   Tokens: undefined;
//   CryptoDetails: { crypto: TokenData }; // Passing crypto data
// };
// type CryptoDetailsRouteProp = RouteProp<RootStackParamList, 'SingleToken'>;

// interface CryptoDetailsProps {
//   route: CryptoDetailsRouteProp;
// }
const coinApi = new CoinApi();

const SingleTokens  = ({ route }) => {

  const [cryptoData, setCryptoData] = useState<ChartData[]>([]);

  const getCryptoData = () => {
    const date = '2024-09-30';
    coinApi.getChartData(route.params.symbol , date)
      .then(datfa => {
        setCryptoData(datfa); // Use the data in your chart or UI
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getCryptoData();
  }, );
  return (
    <View>
      <TopBar/>
        <CryptoLineChart {...cryptoData}/>
        <Text>{route.params.price}</Text>
    </View>
  );
};


export default SingleTokens;

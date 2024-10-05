import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TopBar from '../components/topbar';
import CryptoLineChart from '../components/chart';
import CoinApi from '../modules/coin_api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import Loader from '../components/loader';


import { useQuery } from '@tanstack/react-query';
import { ChartData } from '../../types/types';

const coinApi = new CoinApi();

type propsType = NativeStackScreenProps<RootStackParamList, 'SingleToken'>;

const SingleTokens: React.FC<propsType> = (props) => {
  const { route } = props;
  const { crypto } = route.params;

  // React Query for fetching the crypto chart data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cryptoData', crypto.symbol],
    queryFn: async () => {
      const date = '2024-09-30';
      const date2 ='2024-10-01';
      const response = await coinApi.getChartData(`${crypto.symbol}_USDT`, date, date2);
      console.log(response);
      return response;
    },
    retry: 2, // Optional: number of retries on failure
  });

  const cryptoData: ChartData[] = data || [];

  return (
    <View>
      <TopBar />
      <Text>{crypto.name}</Text>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <View style={styles.textCon}>
          <Text style={styles.texx}>Failed to fetch crypto data.</Text>
        </View>
      ) : cryptoData && cryptoData.length > 0 ? (
        <CryptoLineChart data={cryptoData} />
      ) : (
        <View style={styles.textCon}>
          <Text style={styles.texx}>No Tokens found</Text>
        </View>
      )}
    </View>
  );
};

// const coinApi = new CoinApi();

// type propsType = NativeStackScreenProps<RootStackParamList, 'SingleToken'>;
// const SingleTokens  = (props : propsType) => {

//   const { route } = props;
//   const { crypto } = route.params;
//   const [cryptoData, setCryptoData] = useState<ChartData[]>([]);
//   const [loading, isLoading] = useState<boolean>(false);

//   const getCryptoData = async () => {
//     const date = '2024-09-30';
//     isLoading(true);
//     await coinApi.getChartData(`${crypto.symbol}_USDT`, date)
//       .then(datfa => {
//         console.log(datfa);
//         setCryptoData(datfa);
//         console.log(cryptoData);
//         isLoading(false);// Use the data in your chart or UI
//       })
//       .catch(err => console.error(err))
//       .finally(() => isLoading(false));
//   };

//   useEffect(() => {
//     getCryptoData();
//   }, []);
//   return (
//     <View>
//       <TopBar/>
//       <Text>{crypto.name}</Text>
//         {loading ?  (
//           <Loader/>
//         ) :  cryptoData.length > 0 ? (
//           <View style={styles.textCon}>
//             <Text style={styles.texx}>No Tokens found</Text>
//           </View>
//         ) : (
//           <CryptoLineChart {...cryptoData}/>
//         )}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  texx: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  textCon: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
});
export default SingleTokens;

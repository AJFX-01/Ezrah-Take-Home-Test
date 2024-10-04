import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import TopBar from '../components/topbar';
import AdvertisementBanner from '../components/advert';
import TabBar from '../components/tapbar';
import CryptoListItem, { CryptoListHeader } from '../components/list';
import CoinApi from '../modules/coin_api';
import { useQuery } from '@tanstack/react-query';
import { TokenData } from '../../types/types';
import Loader from '../components/loader';

const coinApi = new CoinApi();

const Tokens: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Hot');
  const { isPending, error, data } = useQuery({
    queryKey: ['tokenList'],
    queryFn: async () => {
      const res = await coinApi.getTokens();
      if (res) {
        return res.data;
      } else if (error) {
        throw new Error('Failed to fetch token list');
      }
    },
  });


  const cryptocurrencies: TokenData[] = data || [];

  return (
    <View style={styles.container}>
      <TopBar />
      <AdvertisementBanner />
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      <CryptoListHeader header1={'Name'} header2={'Last Price'} header3={'24h chng%'}/>
      {isPending ? <Loader /> : error ?
        <View style={styles.textCon}>
          <Text style={styles.texx}>An error occured.Please try again!</Text>
        </View> : (
          <ScrollView>
            {cryptocurrencies.length > 0 ? (
              cryptocurrencies.map((crypto, index) => (
                <CryptoListItem
                  key={index}
                  name={crypto.symbol}
                  price={crypto.quote.USD.price.toFixed(2)}
                  change={crypto.quote.USD.percent_change_24h.toFixed(2)}
                />
              ))
            ) : (
              <View style={styles.textCon}>
                <Text style={styles.texx}>No Tokens found</Text>
              </View>
            )}
          </ScrollView>
        )}
    </View>
  );
};

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

export default Tokens;

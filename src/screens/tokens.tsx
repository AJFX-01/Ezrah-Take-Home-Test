import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import TopBar from '../components/topbar';
import AdvertisementBanner from '../components/advert';
import TabBar from '../components/tapbar';
import CryptoListItem, { CryptoListHeader } from '../components/list';
import CoinApi from '../modules/coin_api';
import { useQuery } from '@tanstack/react-query';
import { FavoriteToken, TokenData } from '../../types/types';
import Loader from '../components/loader';
import { getFavoriteTokens } from '../utils/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

const coinApi = new CoinApi();

type propsType = NativeStackScreenProps<RootStackParamList, 'Tokens'>;

const Tokens = (props : propsType) => {
  const [activeTab, setActiveTab] = useState<string>('Hot');
  const [favoriteData, setFavoriteData] = useState<FavoriteToken[]>([]);
  const { navigation } = props;

  const handlePress = (crypto: TokenData) => {
    navigation.navigate('SingleToken', {crypto});
  };

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

  useEffect(() => {
    getFavoriteTokens().then(tokens => setFavoriteData(tokens));
  }, []);
  const cryptocurrencies: TokenData[] = data || [];

  const favoriteTokens = cryptocurrencies.filter(crypto =>
    favoriteData.some(fav => fav.name === crypto.symbol)
  );

  return (
    <View style={styles.container}>
      <TopBar />
      <AdvertisementBanner />
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      <CryptoListHeader/>
      {activeTab && activeTab === 'Hot' ? (
        <>
        {isPending ? <Loader /> : error ?
          <View style={styles.textCon}>
            <Text style={styles.texx}>An error occured.Please try again!</Text>
          </View> : (
            <ScrollView>
              {cryptocurrencies.length > 0 ? (
                cryptocurrencies.map((crypto, index) => (
                  <CryptoListItem
                    key={index}
                    data={crypto}
                    // name={crypto.symbol}
                    // price={crypto.quote.USD.price.toFixed(2)}
                    // change={crypto.quote.USD.percent_change_24h.toFixed(2)}
                    onPress={() =>handlePress(crypto)}
                  />
                ))
              ) : (
                <View style={styles.textCon}>
                  <Text style={styles.texx}>No Tokens found</Text>
                </View>
              )}
            </ScrollView>
          )}
        </>
        ) : (
          <>
          {isPending ? <Loader /> : error ?
            <View style={styles.textCon}>
              <Text style={styles.texx}>An error occured. Please try again!</Text>
            </View> : (
              <ScrollView>
                {favoriteTokens.length > 0 ? (
                  favoriteTokens.map((crypto, index) => (
                    <CryptoListItem
                      key={index}
                      data={crypto}
                      onPress={() => handlePress(crypto)}
                      // name={crypto.symbol}
                      // price={crypto.quote.USD.price.toFixed(2)}
                      // change={crypto.quote.USD.percent_change_24h.toFixed(2)}
                    />
                  ))
                ) : (
                  <View style={styles.textCon}>
                    <Text style={styles.texx}>No Favorites Yet</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </>
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

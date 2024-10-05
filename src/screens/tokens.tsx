import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="wallet" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Academy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="family-tree" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Referral</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="square-rounded-outline" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Square</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="currency-btc" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Earn</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="ethereum" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="credit-card-sync" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>P2P</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="gift-outline" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Giveaway</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="ellipse-outline" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>More</Text>
            {/* <View style={styles.newBadge}>
              <Text style={styles.newText}>New</Text>
            </View> */}
          </TouchableOpacity>
        </View>
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

  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'white'
  },
  button: {
    width: '25%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0,
  },
  buttonText: {
    marginTop: 8,
    fontSize: 9,
    color: 'black',
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: '#ffb31a',
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 5,
  },
  newText: {
    fontSize: 9,
    color: '#fff',
  },
});

export default Tokens;

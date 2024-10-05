import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // You can replace with other icons as necessary
import TopBar from '../components/topbar';
import { FavoriteHeader } from '../components/favoriteheader';
import Favorites from '../components/favorites';
import { FavoriteToken } from '../../types/types';
import { getFavoriteTokens } from '../utils/constants';

const WalletScreen = () => {

  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [favoriteData, setFavoriteData] = useState<FavoriteToken[]>([]);

  const handleBalanceToggle = () => {
    setShowBalance(!showBalance);
  };

  useEffect(() => {
    getFavoriteTokens().then(tokens => setFavoriteData(tokens));
  }, []);


  return (
    <>
      <TopBar/>
      <ScrollView style={styles.container}>
        {/* Top Section - Total Assets */}
        <View style={styles.assetsContainer}>
          <View style={styles.funding}>
            <Text style={styles.totalAssets}>Total Assets</Text>
            {showBalance ? (
              <Icon name="eye-outline" size={15} color="#ffb31a" onPress={handleBalanceToggle} />
            ) : (
              <Icon name="eye-off-outline" size={15} color="#ffb31a" onPress={handleBalanceToggle}/>
            )}
          </View>
          <View style={styles.assetValueCon}>
            {!showBalance ? (
              <Text style={styles.assetValue}>100.00</Text>
            ) : (
              <Text style={styles.assetValue}>******</Text>
            )}
            <Text style={styles.assetValue2}>USD</Text>
          </View>
            { !showBalance ? (
              <Text style={styles.assetBTC}>≈ 0.00163609 BTC</Text>
            ) : (
              <Text style={styles.assetBTC}>≈ ********** BTC</Text>
            )}
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="wallet" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="arrow-up" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="swap-horizontal" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="credit-card-sync" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="gift-outline" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Giveaway</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="tag" size={20} color="#ffb31a" />
            <Text style={styles.buttonText}>Easy Buy</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>New</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Account/Asset Section */}
        <View>
          <Text style={styles.accountHeader}>Account</Text>
        </View>
        <View style={styles.accountContainer}>
          <View>
            <Text style={styles.accountText}>Funding</Text>
            <View style={styles.assetValueCon}>
              <Text style={styles.assetText}>100.00</Text>
              <Text style={styles.assetText2}>USD</Text>
            </View>
          </View>
          <View>
            <Icon name="arrow-right" size={20} color="#000" />
          </View>
        </View>
        <View>
          <Text style={styles.accountHeader}>Favorites</Text>
        </View>
        <FavoriteHeader/>
        <ScrollView>
          {favoriteData.length > 0 ? (
            favoriteData.map((data, index) => (
              <Favorites key={index} name={data.name} balance={data.balance} balance2={data.balance2}/>
            ))
          ) : (
            <View style={styles.textCon}>
                <Text style={styles.texx}>No Favorites Yet</Text>
              </View>
          )}
        </ScrollView>
      </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  assetsContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  totalAssets: {
    fontSize: 12,
    color: '#7d7d7d',
    marginBottom: 5,
    marginRight: 5,
  },
  assetValueCon: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  assetValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  assetValue2: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 7,
    marginTop: 5,
  },
  assetBTC: {
    fontSize: 11,
    color: '#7d7d7d',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '30%',
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
  accountContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accountText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  assetText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
  },
  assetText2: {
    fontSize: 10,
    color: 'black',
    marginTop: 1,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  funding: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  accountHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#000',
    textAlign: 'left',
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

export default WalletScreen;


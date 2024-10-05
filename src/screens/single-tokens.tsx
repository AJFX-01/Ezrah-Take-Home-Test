import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CryptoLineChart from '../components/chart';
import CoinApi from '../modules/coin_api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import Loader from '../components/loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { useQuery } from '@tanstack/react-query';
import { ChartData } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { formatLargeNumber, formatValue, getTextStyle } from '../utils/constants';


const coinApi = new CoinApi();


type propsType = NativeStackScreenProps<RootStackParamList, 'SingleToken'>;

const SingleTokens: React.FC<propsType> = (props) => {
  const { route } = props;
  const { crypto } = route.params;
  const navigation = useNavigation();



  const { data, isLoading, isError } = useQuery({
    queryKey: ['cryptoData', crypto.symbol],
    queryFn: async () => {
      const date = '2024-09-30';
      const date2 = '2024-10-01';
      const response = await coinApi.getChartData(`${crypto.symbol}_USDT`, date, date2);
      console.log(response);
      return response;
    },
    retry: 2, // Optional: number of retries on failure
  });

  const cryptoData: ChartData[] = data || [];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.cryptoTitle}>{crypto.symbol}/USDT</Text>
          <Text style={styles.subTitle}>Perpetual</Text>
        </View>
        <View style={styles.headerIcon} >
          <TouchableOpacity>
            <Icon name="refresh" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.lastPrice} >Last Price</Text>
        <View style={styles.statsContainerInner}>
          <View>
            <Text style={styles.price}>{crypto.quote.USD.price.toFixed(1)}</Text>
            <Text style={styles.priceChange}>≈ ${crypto.quote.USD.price.toFixed(2)}<Text style={[styles.priceChange2, getTextStyle(crypto.quote.USD.percent_change_24h)]}>  {formatValue(crypto.quote.USD.percent_change_24h)}%</Text> </Text>
            <Text style={styles.priceMChange}>Mark Price <Text style={styles.priceMChange2}>  {crypto.quote.USD.price.toFixed(1)}</Text> </Text>
          </View>
          <View style={styles.statBoxContainer}>
            <View style={styles.statBoxContainerinner1}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>24h High</Text>
                <Text style={styles.statValue}>{crypto.quote.USD.price.toFixed(1)}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>24h Low</Text>
                <Text style={styles.statValue}>{crypto.quote.USD.price.toFixed(1)}</Text>
              </View>
            </View>
            <View style={styles.statBoxContainerinner2}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>24h Vol({crypto.symbol})</Text>
                <Text style={styles.statValue}>{formatLargeNumber(crypto.total_supply)}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>24h Vol(USDT)</Text>
                <Text style={styles.statValue}>{formatLargeNumber(crypto.quote.USD.market_cap)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View>
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

      {/* Tabs Section */}
      <View style={styles.tabsContainer}>
        <View>
          <Text style={styles.tabText}>Today</Text>
          <Text style={[styles.tabText2, getTextStyle(crypto.quote.USD.percent_change_24h)]}>{formatValue(crypto.quote.USD.percent_change_24h)}%</Text>
        </View>
        <View>
          <Text style={styles.tabText}>7 Days</Text>
          <Text style={[styles.tabText2, getTextStyle(crypto.quote.USD.percent_change_7d)]}>{formatValue(crypto.quote.USD.percent_change_7d)}%</Text>
        </View>
        <View>
          <Text style={styles.tabText}>30 Days</Text>
          <Text style={[styles.tabText2, getTextStyle(crypto.quote.USD.percent_change_30d)]}>{formatValue(crypto.quote.USD.percent_change_30d)}%</Text>
        </View>
        <View>
          <Text style={styles.tabText}>60 Days</Text>
          <Text style={[styles.tabText2, getTextStyle(crypto.quote.USD.percent_change_60d)]}>{formatValue(crypto.quote.USD.percent_change_60d)}%</Text>
        </View>
        <View>
          <Text style={styles.tabText}>90 Days</Text>
          <Text style={[styles.tabText2, getTextStyle(crypto.quote.USD.percent_change_90d)]}>{formatValue(crypto.quote.USD.percent_change_90d)}%</Text>
        </View>
      </View>
      {/* Order Book Section */}
      <View style={styles.orderBookContainer}>
        <Text style={styles.sectionTitle}>Order Book</Text>
        {/* Sample order data */}
        <View style={styles.OrderheaderContainer}>
          <Text style={styles.OrderheaderText}>Bid</Text>
          <View style={styles.Orderheader2}>
            <Text style={styles.OrderheaderText}>Ask</Text>
          </View>
        </View>
        {cryptoData && cryptoData.length > 0 ? (
          cryptoData.slice(0, 7).map((item, index) => (
            <View key={index} style={styles.orderRow}>
              <View style={styles.OrderRowinner}>
                <Text style={styles.bidText}>{item.bid_size}</Text>
                <Text style={styles.bidTextprice}>{item.bid_price}</Text>
              </View>
              <View style={styles.OrderRowinner}>
                <Text style={styles.askTextprice}>{item.ask_price}</Text>
                <Text style={styles.askText}>{item.ask_size}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.textCon}>
            <Text style={styles.texx}>No Order Book Data found</Text>
          </View>
        )}
      </View>


      {/* Buy and Sell Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sellButton}>
          <Text style={styles.sellButtonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cryptoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  subTitle: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
  },
  lastPrice: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#888',
  },
  headerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  priceChange: {
    fontSize: 12,
    color: 'black',
  },
  priceChange2: {
    fontSize: 9,
    color: 'green',
  },
  priceMChange: {
    fontSize: 10,
    color: '#888',
  },
  priceMChange2: {
    fontSize: 9,
    color: 'black',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsContainerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '35%',
  },
  statBoxContainerinner1: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  statBoxContainerinner2: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  statBox: {
    // width: screenWidth / 4 - 10,
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 10,
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  statValue: {
    fontSize: 9,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  orderBookContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },

  OrderheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },
  OrderheaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#d3d3d3',
  },
  Orderheader2: {
    width: '55%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  OrderRowinner: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bidText: {
    color: '#888',
    width: '50%',
    fontSize: 10,
  },
  askText: {
    color: '#888',
    width: '50%',
    textAlign: 'right',
    fontSize: 10,
  },
  bidTextprice: {
    color: 'green',
    width: '50%',
    textAlign: 'right',
    fontSize: 10,
  },
  askTextprice: {
    color: 'red',
    width: '50%',
    fontSize: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderTopColor: '#ddd',
  },
  tabText: {
    fontSize: 11,
    color: '#888',
  },
  tabText2: {
    fontSize: 12,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: 'green',
    flex: 1,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  sellButton: {
    backgroundColor: 'red',
    flex: 1,
    padding: 15,
    marginLeft: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  sellButtonText: {
    color: '#fff',
    fontSize: 12,
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

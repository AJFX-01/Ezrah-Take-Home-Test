import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import TopBar from './../components/topbar';
import AdvertisementBanner from './../components/advert';
import TabBar from './../components/tapbar';
import CryptoListItem from './../components/list';

const App = () => {
  const [activeTab, setActiveTab] = useState('Hot');

  const cryptocurrencies = [
    { name: 'BNB', price: '542.00', change: '-0.39' },
    { name: 'BTC', price: '60586.02', change: '-1.29' },
    { name: 'ETH', price: '2343.49', change: '-3.47' },
    { name: 'SOL', price: '135.77', change: '-5.99' },
    { name: 'SUI', price: '1.7016', change: '-5.78' },
    { name: 'PEPE', price: '0.00000851', change: '-10.80' },
  ];

  return (
    <View style={styles.container}>
      <TopBar />
      <AdvertisementBanner />
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      <ScrollView>
        {cryptocurrencies.map((crypto, index) => (
          <CryptoListItem
            key={index}
            name={crypto.name}
            price={crypto.price}
            change={crypto.change}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;

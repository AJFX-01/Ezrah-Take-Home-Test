// /* eslint-disable react-native/no-inline-styles */
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import CoinApi from '../modules/coin_api';
// import { useQuery } from '@tanstack/react-query';
// import AnimatedListItem from '../components/animated-list-item';

// const coinApi = new CoinApi();


// type Token = {
//   name: string
//   symbol: string,
//   max_supply: number,
// }


// const renderItems = ({index, item}) => {
//   return (
//     <AnimatedListItem>
//       <View style={{ flex: 1, flexDirection: 'row' }}>
//         <View style={{ flex: 1 }}>
//           <Text>{item.symbol}</Text>
//         </View>
//         <View style={{ flex: 3 }}>
//           <Text>{item.name}</Text>
//         </View>
//       </View>
//     </AnimatedListItem>
//   );
// };


// const Tokens: React.FC = () => {
//   const { isPending, error, data } = useQuery({
//     queryKey: ['tokenList'],
//     queryFn: async () => {
//       const data = await coinApi.getTokens();
//       console.log(data);
//       if (data) {
//         return data.data;
//       } else if (error) {
        
//       }
//     },
//   });

//   return (
//     <>
//       <StatusBar />
//       <SafeAreaView style={styles.container}>
//         <View style={{
//           flex: 1,
//         }}>
//           <View style={styles.header}>
//             <Text style={{ fontWeight: '600', fontSize: 40 }}>Tokens</Text>
//             <Text>Listing and manging your favourite tokens</Text>
//           </View>
//           {isPending ? null : <View style={styles.tokenList}>
//             <FlatList
//               data={data}
//               renderItem={renderItems}
//             />
//           </View>}
//         </View>
//       </SafeAreaView>
//     </>

//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     fontWeight: '700',
//     marginTop: 50,
//     //flex: 1,
//     justifyContent: 'flex-start',
//     paddingHorizontal: 12,
//   },
//   tokenList: {
//     marginTop: 10,
//     //flex: 1,
//     width: '100%',
//     //flexDirection:'row',
//   },
// });



// export default Tokens;

import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import CoinApi from '../modules/coin_api';
import { useQuery } from '@tanstack/react-query';
import AnimatedListItem from '../components/animated-list-item';

const coinApi = new CoinApi();

// Token type definition
type Token = {
  name: string;
  symbol: string;
  quote: {
    USD: { price: string; percent_change_24h: number };
  }
};

// Custom render for each token item
const renderItems = ({ index, item }: { index: number, item: Token }) => {
  return (
    <AnimatedListItem>
      <View style={styles.tokenContainer}>
        {/* Symbol and Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.symbolText}>{item.symbol}</Text>
          {item.symbol === 'BNB' || item.symbol === 'BTC' || item.symbol === 'ETH' ? (
            <Text style={styles.hotIcon}>🔥</Text>
          ) : null}
        </View>
        {/* Price and Subtext */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.quote.USD.price}</Text>
          <Text style={styles.priceSubtext}>${item.quote.USD.price}</Text>
        </View>
        {/* Percentage Change */}
        <View style={styles.changeContainer}>
          <Text
            style={[
              styles.percentChange,
              {
                backgroundColor: item.quote.USD.percent_change_24h >= 0 ? '#4CAF50' : '#F44336',
              },
            ]}
          >
            {item.quote.USD.percent_change_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </AnimatedListItem>
  );
};

const Tokens: React.FC = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['tokenList'],
    queryFn: async () => {
      const data = await coinApi.getTokens();
      if (data) {
        return data.data;
      } else if (error) {
        throw new Error('Failed to fetch token list');
      }
    },
  });

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Hot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Gainers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Losers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>New Listings</Text>
          </TouchableOpacity>
        </View>

        {/* Token List */}
        {isPending ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItems}
            keyExtractor={(item) => item.symbol}
          />
        )}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Text style={styles.navItem}>Home</Text>
          <Text style={styles.navItem}>Markets</Text>
          <Text style={styles.navItem}>Trade</Text>
          <Text style={styles.navItem}>Futures</Text>
          <Text style={styles.navItem}>Wallets</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

// Styles adjusted to match the exact design in the image
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F44336',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  activeTabText: {
    color: '#F44336',
    fontSize: 14,
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nameContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  hotIcon: {
    marginLeft: 8,
    fontSize: 18,
  },
  priceContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceSubtext: {
    fontSize: 12,
    color: '#888',
  },
  changeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  percentChange: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: '#fff',
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    fontSize: 14,
    color: '#888',
  },
});

export default Tokens;


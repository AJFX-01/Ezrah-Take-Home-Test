import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { CryptoListItemProps } from '../../types/types';



const CryptoListItem : React.FC<CryptoListItemProps> = ({ data, onPress }) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('@favorites');
            const favoriteList = favorites ? JSON.parse(favorites) : [];
            const isFav = favoriteList.some((token: { name: string; }) => token.name === data.symbol);
            setIsFavorite(isFav);
        } catch (error) {
            console.log('Error checking favorites', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('@favorites');
            let favoriteList = favorites ? JSON.parse(favorites) : [];

            if (isFavorite) {
                // Remove from favorites
                favoriteList = favoriteList.filter((token: { name: string; }) => token.name !== data.symbol);
            } else {
                // Add to favorites
                favoriteList.push({ name: data.symbol, balance: '15.00', balance2: '0.000321' });
            }

            await AsyncStorage.setItem('@favorites', JSON.stringify(favoriteList));
            setIsFavorite(!isFavorite); // Toggle the favorite state
        } catch (error) {
            console.log('Error updating favorites', error);
        }
    };

    useEffect(() => {
        checkIfFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getColor = (change : number) => change < 0 ? '#ff4d4d' : '#4CAF50';

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{data.symbol}</Text>
                </View>
                <View style={styles.heart}>
                    <TouchableOpacity onPress={toggleFavorite}>
                        {isFavorite ? (
                            <Icon
                                name="heart"
                                size={15}
                                color={'red'}
                            />
                        ) : (
                            <Icon
                                name="heart-outline"
                                size={15}
                                color={'red'}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.priceChangeContainer}>
                    <View style={styles.priceTxt}>
                        <Text style={styles.priceText}>{data.quote.USD.price.toFixed(2)}</Text>
                        <Text style={styles.priceText2}>${data.quote.USD.price.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.changeContainer, { backgroundColor: getColor(data.quote.USD.percent_change_24h) }]}>
                        <Text style={styles.changeText}>
                            {data.quote.USD.percent_change_24h.toFixed(2)}%
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const CryptoListHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Name</Text>
            <View style={styles.header2}>
                <Text style={styles.headerText2}>Last Price</Text>
                <Text style={styles.headerText}>24h chng%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heart: {
        justifyContent : 'center',
        alignSelf : 'center',
        alignContent : 'center',
    },
    // Header styles
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#d3d3d3',

    },
    headerText2: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#d3d3d3',
        justifyContent: 'flex-end',

    },
    header2: {
        width: '35%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    // List item styles
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    nameContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '30%',
    },
    nameText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    priceChangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '45%', // Adjust width to control space between price and change
    },
    priceText: {
        fontSize: 12,
        color: 'black',
        fontWeight: '600',
        textAlign: 'right',

    },
    priceText2: {
        fontSize: 9,
        color: '#999',
        textAlign: 'right',
    },
    priceTxt:{
       flexDirection: 'column',
        width: '50%',
    },
    changeContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
    },
    changeText: {
        fontSize: 10,
        color: 'white',
        fontWeight: '600', // Text color will be white to contrast the background
    },
});

// const styles = StyleSheet.create({
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   nameContainer: {
//     flexDirection: 'column',
//   },
//   nameText: {
//     fontSize: 13,
//     fontWeight: 'bold',
//   },
//   priceText: {
//     fontSize: 12,
//     color: '#999',
//   },
//   changeText: {
//     fontSize: 11,
//   },
// });

export default CryptoListItem;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default CryptoListItem = ({ name, price, change }) => {
//   const getColor = (change) => change < 0 ? '#ff4d4d' : '#4CAF50';

//   return (
//     <View style={styles.itemContainer}>
//       <View style={styles.nameContainer}>
//         <Text style={styles.nameText}>{name}</Text>
//       </View>

//       <View style={styles.priceChangeContainer}>
//         <Text style={styles.priceText}>${price}</Text>
//         <View style={[styles.changeContainer, { backgroundColor: getColor(change) }]}>
//           <Text style={styles.changeText}>
//             {change}%
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export const CryptoListHeader = () => {
//   return (
//     <View style={styles.headerContainer}>
//       <Text style={styles.headerText}>Name</Text>
//       <Text style={styles.headerText}>Price</Text>
//       <Text style={styles.headerText}>24h Change</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // Header styles
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: '#f5f5f5',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   headerText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },

//   // List item styles
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   nameContainer: {
//     justifyContent: 'center',
//   },
//   nameText: {
//     fontSize: 13,
//     fontWeight: 'bold',
//   },
//   priceChangeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: 120, // Adjust width to control space between price and change
//   },
//   priceText: {
//     fontSize: 12,
//     color: '#999',
//   },
//   changeContainer: {
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   changeText: {
//     fontSize: 12,
//     color: '#fff', // Text color will be white to contrast the background
//   },
// });

// export default function CryptoList({ data }) {
//   return (
//     <View>
//       {/* Render Header */}
//       <CryptoListHeader />

//       {/* Render list of items */}
//       {data.map((item, index) => (
//         <CryptoListItem
//           key={index}
//           name={item.name}
//           price={item.price}
//           change={item.change}
//         />
//       ))}
//     </View>
//   );
// }


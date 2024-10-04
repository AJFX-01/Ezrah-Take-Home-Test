import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CryptoListItem = (({ name , price, change }) => {
    const getColor = (change) => change < 0 ? '#ff4d4d' : '#4CAF50';

    return (
        <View style={styles.itemContainer}>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{name}</Text>
            </View>

            <View style={styles.priceChangeContainer}>
                <View style={styles.priceTxt}>
                    <Text style={styles.priceText}>{price}</Text>
                    <Text style={styles.priceText2}>${price}</Text>
                </View>
                <View style={[styles.changeContainer, { backgroundColor: getColor(change) }]}>
                    <Text style={styles.changeText}>
                        {change}%
                    </Text>
                </View>
            </View>
        </View>
    );
});

export const CryptoListHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Name</Text>
            <View style={styles.header2}>
                <Text style={styles.headerText}>Last Price</Text>
                <Text style={styles.headerText}>24h chg%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    header2: {
        width: '40%',
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
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    priceChangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%', // Adjust width to control space between price and change
    },
    priceText: {
        fontSize: 12,
        color: 'black',
        fontWeight: '600',

    },
    priceText2: {
        fontSize: 9,
        color: '#999',
    },
    priceTxt:{
       flexDirection: 'column',

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


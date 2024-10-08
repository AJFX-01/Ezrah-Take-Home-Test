import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FavoriteToken } from '../../types/types';

const Favorites : React.FC<FavoriteToken> = (data) => {

    return (
        <View style={styles.itemContainer}>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{data.name}</Text>
            </View>

            <View style={styles.priceChangeContainer}>
                <View style={styles.priceTxt}>
                    <Text style={styles.priceText}>{data.balance2}</Text>
                    <Text style={styles.priceText2}>${data.balance}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    nameContainer: {
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#ffb31a',
    },
    priceChangeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '40%', // Adjust width to control space between price and change
    },
    priceText: {
        fontSize: 12,
        color: 'black',
        fontWeight: '600',
        textAlign: 'left',

    },
    priceText2: {
        fontSize: 9,
        color: '#999',
        textAlign: 'left',
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

export default Favorites;

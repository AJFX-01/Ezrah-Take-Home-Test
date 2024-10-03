import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CryptoListItem = ({ name, price, change }) => {
  const getColor = (change) => change < 0 ? '#ff4d4d' : '#4CAF50';

  return (
    <View style={styles.itemContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.priceText}>${price}</Text>
      </View>
      <Text style={[styles.changeText, {color: getColor(change)}]}>
        {change}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nameContainer: {
    flexDirection: 'column',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    color: '#999',
  },
  changeText: {
    fontSize: 16,
  },
});

export default CryptoListItem;

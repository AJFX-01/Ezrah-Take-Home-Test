import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdvertisementBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerText}>
        Join the World’s Largest Crypto Exchange
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up / Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default AdvertisementBanner;

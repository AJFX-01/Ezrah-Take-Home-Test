/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');



const CustomCryptoChart = () => {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data: [50, 70, 50, 80, 60, 90, 70],
            },
          ],
        }}
        width={width - 40} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#2d1687',
          backgroundGradientTo: '#5a2ef7',
          decimalPlaces: 2, // optional, defaults to 2 decimal places
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const CryptoDashboard = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Icon name="moon" size={24} color="white" />
        <Icon name="notifications" size={24} color="white" />
      </View>

      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <LinearGradient
          colors={['#5a2ef7', '#2d1687']}
          style={styles.banner}>
          <Text style={styles.bannerTitle}>Top Most Trusted</Text>
          <Text style={styles.bannerSubtitle}>Cryptocurrency Exchange</Text>
          <TouchableOpacity style={styles.tradeButton}>
            <Text style={styles.tradeButtonText}>Trade Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceText}>$48,864.5</Text>
        <Text style={styles.percentageChange}>+313.39 (2.5%)</Text>
      </View>

      {/* Chart */}
      <CustomCryptoChart />

      {/* Time Interval Buttons */}
      <ScrollView horizontal style={styles.timeButtonContainer}>
        {['24H', '1W', '1M', '1Y', 'All'].map((label) => (
          <TouchableOpacity key={label} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Icons */}
      <View style={styles.footer}>
        <Icon name="swap-horizontal" size={24} color="white" />
        <Icon name="gift" size={24} color="white" />
        <Icon name="wallet" size={24} color="white" />
        <Icon name="person" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161625',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  banner: {
    borderRadius: 20,
    padding: 20,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 14,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
  tradeButton: {
    backgroundColor: '#8745f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  percentageChange: {
    fontSize: 16,
    color: '#00e676',
  },
  chartContainer: {
    height: 120,
    backgroundColor: '#2b2b4b',
    borderRadius: 20,
    marginBottom: 20,
  },
  timeButtonContainer: {
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: '#2b2b4b',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  timeButtonText: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default CryptoDashboard;

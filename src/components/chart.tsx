/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ChartData } from '../../types/types';

const screenWidth = Dimensions.get('window').width;

const CryptoLineChart : React.FC<ChartData[]> = (data) => {
  // Parse the ask_price and time_exchange from the response data
  const chartData = data.map(item => ({
    time: new Date(item.time_exchange).toLocaleTimeString(),
    askPrice: item.ask_price,
  }));

  const labels = chartData.map(item => item.time); // Time labels for x-axis
  const prices = chartData.map(item => item.askPrice); // Ask prices for y-axis

  return (
    <ScrollView>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>BTC/USDT Price Chart</Text>
      <LineChart
        data={{
          labels: labels, // X-axis labels (timestamps)
          datasets: [
            {
              data: prices, // Y-axis data (prices)
            },
          ],
        }}
        width={screenWidth} // Width of the chart
        height={220}
        yAxisLabel="$"
        yAxisInterval={1} // optional, set to 1 for better granularity
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
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
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

export default CryptoLineChart;

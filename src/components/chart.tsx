/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { CryptoLineChartProps } from '../../types/types';

const screenWidth = Dimensions.get('window').width;

const CryptoLineChart: React.FC<CryptoLineChartProps> = ({ data }) => {
    // Parse the ask_price and time_exchange from the response data
    const chartData = data.map((item) => ({
      askPrice: item.ask_price,
      time: new Date(item.time_exchange).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    }));

    const nth = 20;
    const filteredChartData = chartData.filter((_, index) => index % nth === 0);

    const labels = filteredChartData.map((item) => item.time); // Time labels for x-axis
    const prices = filteredChartData.map((item) => item.askPrice); // Ask prices for y-axis

    return (
      <ScrollView>
        <LineChart
          data={{
            labels: labels, // X-axis labels (timestamps)
            datasets: [
              {
                data: prices, // Y-axis data (prices)
              },
            ],
          }}
          width={screenWidth}
           // Width of the chart
          height={250}
          yAxisLabel="$"
          yAxisInterval={20} // optional, set to 1 for better granularity
          chartConfig={{
            backgroundColor: '#fff', // Change to white
            backgroundGradientFrom: '#fff', // White background gradient start
            backgroundGradientTo: '#fff', // White background gradient end
            decimalPlaces: 2, // optional, defaults to 2 decimal places
            color: (opacity = 1) => `rgba(34, 150, 243, ${opacity})`, // Blue line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '0',
              stroke: '#22A6F3', // Dot color
            },
            paddingTop: 20, // Add padding between chart and labels
          }}
          bezier // Make the line smooth and sinusoidal
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    );
  };

  export default CryptoLineChart;

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavoriteTokens = async () => {
    try {
        const favorites = await AsyncStorage.getItem('@favorites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.log('Error retrieving favorite tokens', error);
    }
};

export const getTextStyle = (value: number) => {
    // Return the color depending on the value
    return {
        color: value > 0 ? 'green' : 'red', // Green for positive, Red for negative
    };
};

export const formatValue = (value: number) => {
    // Add a plus sign if the value is greater than 0
    return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
};

export const formatLargeNumber = (num: number) => {
    if (num >= 1e9) {
      // Billions
      return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
      // Millions
      return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
      // Thousands
      return (num / 1e3).toFixed(2) + 'K';
    } else {
      // If less than 1000, just return the number
      return num.toFixed(2);
    }
  };

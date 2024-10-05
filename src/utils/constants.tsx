import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavoriteTokens = async () => {
    try {
        const favorites = await AsyncStorage.getItem('@favorites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.log('Error retrieving favorite tokens', error);
    }
};

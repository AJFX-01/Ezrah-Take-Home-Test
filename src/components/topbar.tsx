import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const TopBar = () => {

    const navigation = useNavigation();
    return (

        <View style={styles.topBarContainer}>
            <TouchableOpacity style={styles.icon}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
                <FontAwesome name="bars" size={15} color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.searchBar}
                placeholder="BTC"
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.icon}>
                <FontAwesome name="bell-o" size={15} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
                <FontAwesome name="user-o" size={15} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    searchBar: {
        flex: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginRight: 5,
        paddingVertical: 2,
        backgroundColor: '#f9f9f9',
    },
    icon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
});

export default TopBar;

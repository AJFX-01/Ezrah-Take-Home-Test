import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export const FavoriteHeader : React.FC = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Name</Text>
            <View style={styles.header2}>
                <Text style={styles.headerText}>Balance</Text>
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
        justifyContent: 'flex-end',
    },
});

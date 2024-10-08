import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type TapBARprops = {
    activeTab: string;
    onTabPress: (tab: string) => void;
  };

const TabBar : React.FC<TapBARprops> = ({ activeTab, onTabPress }) => {
  const tabs = ['Favorites', 'Hot', 'Gainers', 'Losers', 'New Listings'];
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onTabPress(tab)}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  tabText: {
    fontSize: 10,
    color: '#333',
  },
});

export default TabBar;

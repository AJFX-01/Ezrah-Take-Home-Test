import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="yellow" />
      <Text style={styles.texx}>Please Wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texx: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Loader;

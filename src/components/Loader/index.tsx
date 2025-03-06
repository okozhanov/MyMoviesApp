import React from 'react';
import {
  ActivityIndicator,
  type ActivityIndicatorProps,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS} from '../../constants/colors';

const Loader = (props: ActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.grey} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;

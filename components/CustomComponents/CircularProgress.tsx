import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import { color } from '../../constants/Styles';

interface LoadingIndicatorProps {
  loading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={color.secondaryColor} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 9999,
  },
});

export default LoadingIndicator;

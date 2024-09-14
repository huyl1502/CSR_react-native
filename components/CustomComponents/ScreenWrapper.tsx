import React from 'react';
import { NavigationProp } from '@react-navigation/native';

interface ScreenWrapperProps {
  component: React.ComponentType<any>;
  navigation: NavigationProp<any>;
  route: any;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ component: Component, navigation, route }) => {
  return <Component navigation={navigation} route={route} extraProp="extraValue" />;
};

export default ScreenWrapper;

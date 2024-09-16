import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../../constants/Styles';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/RouteConfig';

type ThanksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
interface ThanksProps {
  navigation: ThanksScreenNavigationProp;
}

const ThanksForm: React.FC<ThanksProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Waiting');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.text}>Trân trọng cảm ơn quý khách!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primaryColor,
  },
  text: {
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default ThanksForm;

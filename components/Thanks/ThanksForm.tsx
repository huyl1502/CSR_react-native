import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '../../constants/Styles';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/RouteConfig';

type ThanksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
interface ThanksProps {
  navigation: ThanksScreenNavigationProp;
}

const ThanksForm: React.FC<ThanksProps> = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Waiting');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handlePress}
        activeOpacity={1} // Prevent color change on tap
      >
        <Text variant="displaySmall" style={styles.text}>Trân trọng cảm ơn quý khách!</Text>
      </TouchableOpacity>
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
  touchableOpacity: {
    width: '100%',
    height: '100%',
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

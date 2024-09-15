import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { color } from '../../constants/Styles';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/RouteConfig';

type WaitingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
interface WaitingProps {
  navigation: WaitingScreenNavigationProp;
}

const WaitingForm: React.FC<WaitingProps> = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Rating');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handlePress}
        activeOpacity={1} // Prevent color change on tap
      >
        <Text variant="displaySmall" style={styles.text}>QUÝ KHÁCH VUI LÒNG CHO BIẾT</Text>
        <Text variant="displaySmall" style={styles.text}>MỨC ĐỘ HÀI LÒNG VỀ DỊCH VỤ CỦA CHÚNG TÔI</Text>
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

export default WaitingForm;

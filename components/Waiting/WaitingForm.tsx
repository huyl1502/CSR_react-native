import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { color } from '../../constants/Styles';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/RouteConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { callApi } from '../../utils/Api';
import { ApiUrl, StorageStr } from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WaitingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Waiting'>;
interface WaitingProps {
  navigation: WaitingScreenNavigationProp;
}

const WaitingForm: React.FC<WaitingProps> = ({ navigation }) => {
  const handlePress = async () => {
    let loginInfoJson = await AsyncStorage.getItem(StorageStr.LoginInfo) ?? '{}';
    let loginInfo = JSON.parse(loginInfoJson);
    let data = { _id: loginInfo._id, Password: loginInfo.Password };
    let response = await callApi(ApiUrl.Login, data, navigation);
    await AsyncStorage.setItem(StorageStr.Account, JSON.stringify(response.value));
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
        <MaterialCommunityIcons
          name="hand-pointing-up"
          size={70}
          color={color.themeColor}
        />
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

import React from 'react';
import { StyleSheet, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/RouteConfig';
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
    <ImageBackground
      source={require('../../static/img/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={handlePress}
          activeOpacity={1} // Prevent color change on tap
        >
          <Image
            source={require('../../static/img/logo-top.png')}
            resizeMode="contain"
            style={styles.logoTop}
          />
          <Text variant="displaySmall" style={styles.text}>QUÝ KHÁCH VUI LÒNG CHO BIẾT</Text>
          <Text variant="displaySmall" style={styles.text}>MỨC ĐỘ HÀI LÒNG VỀ DỊCH VỤ CỦA CHÚNG TÔI</Text>
          {/* <MaterialCommunityIcons
            name="hand-pointing-up"
            size={70}
            color={color.themeColor}
          /> */}
          <Image
            source={require('../../static/img/arrow.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Image
            source={require('../../static/img/background-logo.png')}
            resizeMode="contain"
            style={styles.logoBottom}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 5,
  },
  image: {
    width: 75,
    height: 75,
    marginTop: 10,
  },
  logoTop: {
    width: 75,
    height: 75,
    position: 'absolute',
    top: 0,
    left: 20,
  },
  logoBottom: {
    width: 275,
    height: 275,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default WaitingForm;

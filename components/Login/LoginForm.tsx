/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, StyleSheet, ToastAndroid, Image} from 'react-native';
import {useLoading} from '../CustomComponents/LoadingContext';
import {Text, TextInput, Button} from 'react-native-paper';
import {
  buttonStyle,
  color,
  labelStyle,
  textInputStyle,
} from '../../constants/Styles';
import {callApi} from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl, StorageStr} from '../../constants/Constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../config/RouteConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../static/svg/logo.svg';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const LoginForm: React.FC<LoginProps> = ({navigation}) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const {showLoading, hideLoading} = useLoading();

  const onLoginPress = async () => {
    try {
      showLoading();
      let data = {_id: account, Password: password};
      let response = await callApi(ApiUrl.Login, data, navigation);
      await AsyncStorage.setItem(StorageStr.LoginInfo, JSON.stringify(data));
      await AsyncStorage.setItem(
        StorageStr.Account,
        JSON.stringify(response.value),
      );

      hideLoading();

      if (response.value.Role === 'Employee') {
        let dep = (await AsyncStorage.getItem(StorageStr.Department)) ?? '{}';
        let department = JSON.parse(dep);
        if (department.Id === undefined) {
          throw Error('Thiết bị chưa được cấu hình. Vui lòng liên hệ admin!');
        }
        let criteriaResponse = await callApi(ApiUrl.Criteria, {}, navigation);
        let lstCriteria = Object.entries(criteriaResponse.value).map(
          ([code, label]) => ({code, label}),
        );
        await AsyncStorage.setItem(
          StorageStr.Criteria,
          JSON.stringify(lstCriteria),
        );
        navigation.navigate('Waiting');
      }
      else if (
        response.value.Role === 'Admin' ||
        response.value.Role === 'Manager'
      ) {
        navigation.navigate('Setting');
      }
    } catch (ex: any) {
      hideLoading();
      ToastAndroid.show(ex + '', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image
          source={require('../../static/img/logo.png')}
          resizeMode="contain"
          style={styles.image}
        /> */}
        <Logo style={styles.image} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={labelStyle}>Tài khoản</Text>
        <TextInput
          mode="outlined"
          cursorColor={color.primaryColor}
          style={textInputStyle.input}
          outlineStyle={textInputStyle.outline}
          theme={textInputStyle.theme}
          value={account}
          onChangeText={setAccount}
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color={color.secondaryColor}
                />
              )}
            />
          }
        />
        <Text style={labelStyle}>Mật khẩu</Text>
        <TextInput
          mode="outlined"
          style={textInputStyle.input}
          outlineStyle={textInputStyle.outline}
          theme={textInputStyle.theme}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          left={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name="key-outline"
                  size={20}
                  color={color.secondaryColor}
                />
              )}
            />
          }
        />
        <Button
          onPress={onLoginPress}
          style={styles.button}
          textColor={color.primaryTextColor}>
          Đăng nhập
        </Button>
      </View>
      <Image
        source={require('../../static/img/background-logo.png')}
        resizeMode="contain"
        style={styles.logoBottom}
      />
      {/* <Flower style={styles.logoBottom} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.themeColor,
  },
  logoContainer: {
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '60%',
    alignSelf: 'center',
  },
  image: {
    width: 250,
    height: 100,
  },
  button: {
    ...buttonStyle.button,
    marginTop: 10,
    zIndex: 9999,
  },
  logoBottom: {
    width: 275,
    height: 275,
    position: 'absolute',
    bottom: -35,
    right: -25,
  },
});

export default LoginForm;

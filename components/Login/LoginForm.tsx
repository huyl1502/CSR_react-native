/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { View, StyleSheet, Image, ToastAndroid } from 'react-native';
import { useLoading } from '../CustomComponents/LoadingContext';
import { Text, TextInput, Button } from 'react-native-paper';
import { buttonStyle, color, labelStyle, textInputStyle } from '../../constants/Styles';
import { callApi } from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiUrl, StorageStr } from '../../constants/Constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/RouteConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const LoginForm: React.FC<LoginProps> = ({ navigation }) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const { showLoading, hideLoading } = useLoading();

  const onLoginPress = async () => {
    try {
      showLoading();
      let data = { _id: account, Password: password };
      let response = await callApi(ApiUrl.Login, data);
      await AsyncStorage.setItem(StorageStr.LoginInfo, JSON.stringify(data));
      await AsyncStorage.setItem(StorageStr.Account, JSON.stringify(response.value));

      let criteriaResponse = await callApi(ApiUrl.Criteria, {});
      let lstCriteria = Object.entries(criteriaResponse.value).map(([code, label]) => ({ code, label }));
      await AsyncStorage.setItem(StorageStr.Criteria, JSON.stringify(lstCriteria));
      hideLoading();

      navigation.navigate('Waiting');
    }
    catch (ex: any) {
      hideLoading();
      ToastAndroid.show(ex + '', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../static/img/logo.jpeg')}
          resizeMode="cover"
          style={styles.image}
        />
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
          left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={20} color={color.primaryColor} />} />}
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
          left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="key" size={20} color={color.primaryColor} />} />}
        />
        <Button
          onPress={onLoginPress}
          style={styles.button}
          textColor={color.primaryTextColor}
        >
          Đăng nhập
        </Button>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.themeColor,
  },
  inputContainer: {
    width: '60%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 175,
    marginBottom: 3,
  },
  button: {
    ...buttonStyle.button,
    marginTop: 10,
  },
});

export default LoginForm;

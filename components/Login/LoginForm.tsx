import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from '@react-native-material/core';
import {color} from '../../constants/Constants';
import BaseProps from '../../constants/BaseProps';

interface LoginFormProps extends BaseProps {}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    props.showLoading();
    setTimeout(() => {
      // Replace this with your actual login logic
      console.log('Email:', account);
      console.log('Password:', password);

      // After login is done, set loading to false
      props.hideLoading();
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        variant="outlined"
        label="Tài khoản"
        style={styles.input}
        value={account}
        onChangeText={setAccount}
      />
      <TextInput
        variant="outlined"
        label="Mật khẩu"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Đăng nhập"
        onPress={onLoginPress}
        style={styles.button}
        color={color.primaryColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    margin: 16,
  },
  button: {
    margin: 16,
  },
});

export default LoginForm;

/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { useLoading } from '../CustomComponents/LoadingContext';
import { Text, TextInput, Button } from 'react-native-paper';
import { buttonStyle, color, labelStyle, textInputStyle } from '../../constants/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiUrl, StorageStr } from '../../constants/Constants';
import { callApi } from '../../utils/Api';

const SettingForm: React.FC = () => {
  const [deviceId, setDeviceId] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const { showLoading, hideLoading } = useLoading();

  const setUpForm = async () => {
    let androidId = await AsyncStorage.getItem(StorageStr.DeviceId);
    let dep = await AsyncStorage.getItem(StorageStr.Department) ?? '{}';
    let department = JSON.parse(dep);
    setDepartmentCode(department.Id);
    setDepartmentName(department.Name);
    setDeviceId(androidId ?? '');
  };

  useEffect(() => {
    setUpForm();
  }, []);

  const onSettingPress = async () => {
    try {
      showLoading();
      let androidId = await AsyncStorage.getItem(StorageStr.DeviceId);
      let data = { _id: androidId, Department: departmentCode };
      let response = await callApi(ApiUrl.Setting, data);
      let depName = JSON.parse(JSON.stringify(response.value)).Department;
      setDepartmentName(depName);
      await AsyncStorage.setItem(StorageStr.Department, JSON.stringify({ Id: departmentCode, Name: depName }));
      hideLoading();
    }
    catch (ex: any) {
      hideLoading();
      ToastAndroid.show(ex + '', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={labelStyle}>Mã thiết bị</Text>
        <TextInput
          mode="outlined"
          disabled
          cursorColor={color.primaryColor}
          style={textInputStyle.input}
          outlineStyle={textInputStyle.outline}
          theme={textInputStyle.theme}
          value={deviceId}
          onChangeText={setDeviceId}
          left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="cellphone" size={20} color={color.secondaryColor} />} />}
        />
        <Text style={labelStyle}>Mã chi nhánh</Text>
        <TextInput
          mode="outlined"
          cursorColor={color.primaryColor}
          style={textInputStyle.input}
          outlineStyle={textInputStyle.outline}
          theme={textInputStyle.theme}
          value={departmentCode}
          onChangeText={setDepartmentCode}
          left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="office-building" size={20} color={color.secondaryColor} />} />}
        />
        <Text style={labelStyle}>Tên chi nhánh</Text>
        <TextInput
          mode="outlined"
          disabled
          cursorColor={color.primaryColor}
          style={textInputStyle.input}
          outlineStyle={textInputStyle.outline}
          theme={textInputStyle.theme}
          value={departmentName}
          onChangeText={setDepartmentName}
          left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="office-building" size={20} color={color.secondaryColor} />} />}
        />
        <Button
          onPress={onSettingPress}
          style={styles.button}
          textColor={color.primaryTextColor}
        >
          Lưu
        </Button>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.themeColor,
  },
  inputContainer: {
    width: '98%',
    margin: 5,
    alignSelf: 'center',
  },
  button: {
    ...buttonStyle.button,
    marginTop: 10,
  },
});

export default SettingForm;

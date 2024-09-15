import axios from 'axios';
import { StorageStr } from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DataRequest {
  url: string;
  value: object;
  token?: string;
}

const api = axios.create({
  baseURL: 'https://bidv.vst.edu.vn/api/all',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const callApi = async (url: string, data: object, isUseToken = true) => {
  let dataRequest: DataRequest = { url: url, value: data };
  if (isUseToken) {
    let account = await AsyncStorage.getItem(StorageStr.Account);
    let token = JSON.parse(account ?? '{"token": ""}').token;
    dataRequest = { ...dataRequest, token: token };
  }
  console.log(dataRequest);
  let response = await api.post('', dataRequest);
  let responseData = response.data;
  console.log(responseData);
  if (responseData.code !== undefined) {
    throw Error(responseData.message);
  }
  return responseData;
};

export { callApi };

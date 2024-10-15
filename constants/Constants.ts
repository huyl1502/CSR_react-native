
const StorageStr = {
  Account: 'account',
  LoginInfo: 'loginInfo',
  DeviceId: 'deviceId',
  Criteria: 'criteria',
  Department: 'department',
};
interface ErrorCodeType {
  SESSION: string;
  DEP: string;
  TokenError: string;
  PASSWORD: string;
  DEV: string;
  dictMessage: {
    [key: string]: string;
  };
}
const ErrorCode: ErrorCodeType = {
  SESSION: 'SESSION',
  DEP: 'DEP',
  TokenError: 'Token Error',
  PASSWORD: 'PASSWORD',
  DEV: 'DEV',
  dictMessage: {
    'Token Error': 'Tên đăng nhập hoặc mật khẩu không đúng',
    'PASSWORD': 'Tên đăng nhập hoặc mật khẩu không đúng',
    'DEP': 'Mã chi nhánh không đúng',
    'DEV': 'Mã thiết bị không đúng',
  },
};

const ApiUrl = {
  Login: 'login/check',
  Logout: 'login/end',
  Rating: 'rating/add',
  Setting: 'device/setting',
  Criteria: 'rating/criteria',
};

export {StorageStr, ApiUrl, ErrorCode};

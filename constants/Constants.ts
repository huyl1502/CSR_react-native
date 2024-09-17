const StorageStr = {
  Account: 'account',
  LoginInfo: 'loginInfo',
  DeviceId: 'deviceId',
  Criteria: 'criteria',
  Department: 'department',
};

const lstRatingIcon = [
  {
    point: 1,
    code: 'emoticon-cry-outline',
    label: 'Rất không hài lòng',
    color: '#ff1744',
  },
  {
    point: 2,
    code: 'emoticon-sad-outline',
    label: 'Không hài lòng',
    color: '#ff9100',
  },
  {
    point: 3,
    code: 'emoticon-neutral-outline',
    label: 'Bình thường',
    color: '#f2b320',
  },
  {
    point: 4,
    code: 'emoticon-happy-outline',
    label: 'Hài lòng',
    color: '#8bc34a',
  },
  {
    point: 5,
    code: 'emoticon-excited-outline',
    label: 'Rất hài lòng',
    color: '#14a37f',
  },
];

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

export {StorageStr, lstRatingIcon, ApiUrl, ErrorCode};

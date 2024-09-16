const StorageStr = {
    Account: 'account',
    LoginInfo: 'loginInfo',
    DeviceId: 'deviceId',
    Criteria: 'criteria',
    Department: 'department',
};

const lstRatingIcon = [
    {
        point: 5,
        code: 'emoticon-excited-outline',
        label: 'Rất hài lòng',
    },
    {
        point: 4,
        code: 'emoticon-happy-outline',
        label: 'Hài lòng',
    },
    {
        point: 3,
        code: 'emoticon-neutral-outline',
        label: 'Bình thường',
    },
    {
        point: 2,
        code: 'emoticon-sad-outline',
        label: 'Không hài lòng',
    },
    {
        point: 1,
        code: 'emoticon-cry-outline',
        label: 'Rất không hài lòng',
    },
];

const ApiUrl = {
    Login: 'login/check',
    Logout: 'login/end',
    Rating: 'rating/add',
    Setting: 'device/setting',
    Criteria: 'rating/criteria',
};

export { StorageStr, lstRatingIcon, ApiUrl };

const StorageStr = {
    Account: 'account',
    LoginInfo: 'loginInfo',
    DeviceId: 'deviceId',
    Criteria: 'criteria',
};

const lstRatingIcon = [
    {
        point: 5,
        code: 'happy',
        label: 'Rất hài lòng',
    },
    {
        point: 4,
        code: 'smile',
        label: 'Hài lòng',
    },
    {
        point: 3,
        code: 'neutral',
        label: 'Bình thường',
    },
    {
        point: 2,
        code: 'sad',
        label: 'Không hài lòng',
    },
    {
        point: 1,
        code: 'crying',
        label: 'Rất không hài lòng',
    },
];

const ApiUrl = {
    Login: 'login/check',
    Criteria: 'rating/criteria',
};

export { StorageStr, lstRatingIcon, ApiUrl };

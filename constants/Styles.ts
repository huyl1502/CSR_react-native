import { DefaultTheme } from 'react-native-paper';

const color = {
    themeColor: '#ffffff',
    primaryColor: '#006b68',
    secondaryColor: '#f2b320',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#000000',
};

const textInputStyle = {
    theme: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: color.primaryColor,
            background: color.themeColor,
        },
    },
    input: {
        margin: 3,
        height: 40,
    },
    outline: {
        borderRadius: 100,
    },
};

const buttonStyle = {
    button: {
        margin: 3,
        backgroundColor: color.primaryColor,
    },
};

const labelStyle = {
    margin: 3,
    color: color.primaryColor,
};

export { color, textInputStyle, buttonStyle, labelStyle };

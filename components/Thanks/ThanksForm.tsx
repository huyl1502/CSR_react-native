import React, {useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {color} from '../../constants/Styles';
import {Text} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../config/RouteConfig';
import WhiteLogo from '../../static/svg/whiteLogo.svg';

type ThanksScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Thanks'
>;
interface ThanksProps {
  navigation: ThanksScreenNavigationProp;
}

const ThanksForm: React.FC<ThanksProps> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Waiting');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <ImageBackground
      source={require('../../static/img/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      {/* <Image
        source={require('../../static/img/logo-top.png')}
        resizeMode="contain"
        style={styles.logoTop}
      /> */}
      <WhiteLogo style={styles.logoTop} />
      <View style={styles.container}>
        <Text variant="displaySmall" style={styles.text}>
          Trân trọng cảm ơn quý khách!
        </Text>
      </View>
      <Image
        source={require('../../static/img/background-logo.png')}
        resizeMode="contain"
        style={styles.logoBottom}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primaryColor,
  },
  text: {
    textAlign: 'center',
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
  },
  logoTop: {
    width: 75,
    height: 75,
    position: 'absolute',
    top: 0,
    left: 20,
  },
  logoBottom: {
    width: 275,
    height: 275,
    position: 'absolute',
    bottom: -35,
    right: -25,
  },
});

export default ThanksForm;

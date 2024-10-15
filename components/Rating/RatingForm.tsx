/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';
import {color} from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl, StorageStr} from '../../constants/Constants';
import Account from '../../models/Account';
import Criteria from '../../models/Criteria';
import RatingComponent from '../CustomComponents/RatingComponent';
import {useLoading} from '../CustomComponents/LoadingContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../config/RouteConfig';
import {callApi} from '../../utils/Api';
import CardSvg from '../../static/svg/card.svg';
import WhiteLogo from '../../static/svg/whiteLogo.svg';
import LinearGradient from 'react-native-linear-gradient';

type RatingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Rating'
>;
interface RatingProps {
  navigation: RatingScreenNavigationProp;
}

const RatingForm: React.FC<RatingProps> = ({navigation}) => {
  const [account, setAccount] = useState(new Account());
  const [listCriteria, setListCriteria] = useState(Array<Criteria>);
  const {showLoading, hideLoading} = useLoading();

  const getAccount = async () => {
    let accountJson = (await AsyncStorage.getItem(StorageStr.Account)) ?? '{}';
    let accountData: Account = JSON.parse(accountJson);
    setAccount(accountData);
  };

  const getListCriteria = async () => {
    let listCriteriaJson =
      (await AsyncStorage.getItem(StorageStr.Criteria)) ?? '{}';
    let listCriteriaData = JSON.parse(listCriteriaJson).map((cri: any) => {
      return {...cri, point: undefined};
    });
    setListCriteria(listCriteriaData);
  };

  useEffect(() => {
    getAccount();
    getListCriteria();
  }, []);

  const allPointsDefined = () => {
    return listCriteria.every(cri => cri.point !== undefined);
  };

  const submitRating = async () => {
    if (listCriteria.length > 0 && allPointsDefined()) {
      try {
        showLoading();
        let dictCriteria: {[key: string]: number} = {};
        listCriteria.forEach(cri => {
          if (cri.point !== undefined) {
            dictCriteria[cri.code] = cri.point;
          }
        });
        let androidId = await AsyncStorage.getItem(StorageStr.DeviceId);
        let data = {_id: androidId, Rating: dictCriteria};
        await callApi(ApiUrl.Rating, data, navigation);
        await callApi(ApiUrl.Logout, {}, navigation);
        hideLoading();
        navigation.navigate('Thanks');
      } catch (ex: any) {
        hideLoading();
        ToastAndroid.show(ex + '', ToastAndroid.SHORT);
      }
    }
  };

  const updateCriteriaPoint = (code: string, point: number) => {
    setListCriteria(prevListCriteria => {
      return prevListCriteria.map(cri =>
        cri.code === code ? {...cri, point} : cri,
      );
    });
  };

  useEffect(() => {
    if (allPointsDefined()) {
      submitRating();
    }
  }, [listCriteria]);

  return (
    <ImageBackground
      source={require('../../static/img/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <CardSvg style={styles.card} />
        <WhiteLogo style={styles.logoTop} />
        <Text style={styles.headerText} variant="titleMedium">
          {`Giao dịch viên: ${account._id} | ${account.Name}`}
        </Text>
        <View style={[styles.flexGrow]}>
          {listCriteria.filter(cri => cri.code !== 'TC1').map((cri, index) => (
            <View key={cri.code} style={styles.rowContainer}>
              <Text style={styles.label} variant="bodyLarge">
                {`${index + 1}. ${cri.label}`}
              </Text>
              <LinearGradient
                colors={['#009994', color.themeColor]}
                start={{ x: 0, y: 0 }} // Start at left
                end={{ x: 1, y: 0 }} // End at right
                style={styles.underline}
              />
              <RatingComponent
                criteria={cri}
                updatePoint={updateCriteriaPoint}
              />
            </View>
          ))}
        </View>
        <Image
          source={require('../../static/img/background-logo.png')}
          resizeMode="contain"
          style={styles.logoBottom}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 375,
    height: 70,
  },
  backgroundImage: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: color.primaryTextColor,
    position: 'absolute',
    bottom: 10,
  },
  headerText: {
    color: color.primaryColor,
    position: 'absolute',
    top: 22,
    left: 35,
  },
  image: {
    width: 75,
    height: 75,
    marginTop: 10,
  },
  logoTop: {
    width: 100,
    height: 75,
    position: 'absolute',
    top: 10,
    right: 60,
  },
  logoBottom: {
    width: 275,
    height: 275,
    position: 'absolute',
    bottom: -35,
    right: -25,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 35,
    marginTop: 115,
  },
  underline: {
    width: 210,
    height: 4,
    position: 'absolute',
    bottom: 0,
    borderRadius: 1,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 2, // Shadow blur
    elevation: 4, // Android shadow
  },
});

export default RatingForm;

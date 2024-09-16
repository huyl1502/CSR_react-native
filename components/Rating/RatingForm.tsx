/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { color } from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiUrl, StorageStr } from '../../constants/Constants';
import Account from '../../models/Account';
import Criteria from '../../models/Criteria';
import RatingComponent from '../CustomComponents/RatingComponent';
import { useLoading } from '../CustomComponents/LoadingContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/RouteConfig';
import { callApi } from '../../utils/Api';

type RatingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Rating'>;
interface RatingProps {
    navigation: RatingScreenNavigationProp;
}

const RatingForm: React.FC<RatingProps> = ({ navigation }) => {
    const [account, setAccount] = useState(new Account());
    const [listCriteria, setListCriteria] = useState(Array<Criteria>);
    const { showLoading, hideLoading } = useLoading();

    const getAccount = async () => {
        let accountJson = await AsyncStorage.getItem(StorageStr.Account) ?? '{}';
        let accountData: Account = JSON.parse(accountJson);
        setAccount(accountData);
    };

    const getListCriteria = async () => {
        let listCriteriaJson = await AsyncStorage.getItem(StorageStr.Criteria) ?? '{}';
        let listCriteriaData = JSON.parse(listCriteriaJson).map((cri: any) => {
            return { ...cri, point: undefined };
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
                let dictCriteria: { [key: string]: number } = {};
                listCriteria.forEach(cri => {
                    if (cri.point !== undefined) {
                        dictCriteria[cri.code] = cri.point;
                    }
                });
                let androidId = await AsyncStorage.getItem(StorageStr.DeviceId);
                let data = { _id: androidId, Rating: dictCriteria };
                await callApi(ApiUrl.Rating, data);
                await callApi(ApiUrl.Logout, {});
                hideLoading();
                navigation.navigate('Thanks');
            }
            catch (ex: any) {
                hideLoading();
                ToastAndroid.show(ex + '', ToastAndroid.SHORT);
            }
        }
    };

    const updateCriteriaPoint = (code: string, point: number) => {
        setListCriteria(prevListCriteria => {
            return prevListCriteria.map(cri =>
                cri.code === code ? { ...cri, point } : cri
            );
        });
    };

    useEffect(() => {
        if (allPointsDefined()) {
            submitRating();
        }
    }, [listCriteria]);

    return (
        <View style={styles.container}>
            <Card style={{ ...styles.cardHeader, marginTop: 5 }}>
                <Card.Content>
                    <Text style={styles.headerText} variant="headlineSmall">{`Giao dịch viên: ${account._id} - ${account.Name}`}</Text>
                </Card.Content>
            </Card>
            <Card style={[styles.card, styles.flexGrow]}>
                <Card.Content>
                    {
                        listCriteria.map((cri, index) => (
                            <View key={cri.code}>
                                <Text style={styles.label} variant="bodyLarge">{`${index + 1}. ${cri.label}`}</Text>
                                <RatingComponent criteria={cri} updatePoint={updateCriteriaPoint} />
                            </View>
                        ))
                    }
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.themeColor,
    },
    cardHeader: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: color.primaryColor,
    },
    card: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: color.themeColor,
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
        color: color.primaryColor,
    },
    headerText: {
        color: color.themeColor,
    },
});

export default RatingForm;

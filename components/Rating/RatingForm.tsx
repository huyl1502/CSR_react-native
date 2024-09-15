/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { color, labelStyle } from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lstRatingIcon, StorageStr } from '../../constants/Constants';
import Account from '../../models/Account';
import Criteria from '../../models/Criteria';
import RatingIcon from '../CustomComponents/RatingIcon';

const RatingForm: React.FC = () => {
    const [account, setAccount] = useState(new Account());
    const [listCriteria, setListCriteria] = useState(Array<Criteria>);

    const getAccount = async () => {
        let accountJson = await AsyncStorage.getItem(StorageStr.Account) ?? '{}';
        let accountData: Account = JSON.parse(accountJson);
        setAccount(accountData);
    };

    const getListCriteria = async () => {
        let listCriteriaJson = await AsyncStorage.getItem(StorageStr.Criteria) ?? '{}';
        let listCriteriaData = JSON.parse(listCriteriaJson);
        setListCriteria(listCriteriaData);
    };

    useEffect(() => {
        getAccount();
        getListCriteria();
    }, []);

    return (
        <View style={styles.container}>
            <Card style={{ ...styles.card, marginTop: 5 }}>
                <Card.Content>
                    <Text style={labelStyle} variant="bodyLarge">{`Giao dịch viên: ${account._id} - ${account.Name}`}</Text>
                </Card.Content>
            </Card>
            <Card style={[styles.card, styles.flexGrow]}>
                <Card.Content>
                    {
                        listCriteria.map((cri) => (
                            <>
                                <Text style={labelStyle} variant="bodyLarge">{`${cri.label}`}</Text>
                                {
                                    lstRatingIcon.map((icon) => (
                                        <RatingIcon point={icon.point} code={icon.code} label={icon.label} />
                                    ))
                                }
                            </>
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
    card: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: color.themeColor,
    },
    flexGrow: {
        flexGrow: 1,
    },
    headerText: {
        color: color.primaryColor,
        flexWrap: 'wrap',
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: color.primaryColor,
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: color.primaryColor,
    },
    cell: {
        color: color.primaryColor,
    },
});

export default RatingForm;

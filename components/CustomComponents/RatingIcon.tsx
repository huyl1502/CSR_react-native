import React from 'react';
import { color } from '../../constants/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

interface RatingIconProps {
    point: number;
    label: string;
    code: string;
    isSelected: boolean;
    onSelect: () => void;
}

const RatingIcon: React.FC<RatingIconProps> = (props) => {
    return (
        <MaterialCommunityIcons
            name={props.code}
            style={styles.icon}
            size={65}
            color={props.isSelected ? color.secondaryColor : color.primaryColor}
            onPress={props.onSelect}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 35,
    },
});

export default RatingIcon;

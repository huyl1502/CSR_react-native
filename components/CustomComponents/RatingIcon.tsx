import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { color } from '../../constants/Styles';
import { Text } from 'react-native-paper';

interface RatingIconProps {
    point: number;
    label: string;
    code: string;
}

const RatingIcon: React.FC<RatingIconProps> = (props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handlePress = () => {
        setIsSelected(true);
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: isSelected ? `../../static/img/selected${props.code}.png` : `../../static/img/${props.code}.png` }}
                resizeMode="cover"
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={handlePress}
                activeOpacity={1} // Prevent color change on tap
            >
                <Text variant="bodyMedium" style={styles.text}>{props.label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryColor,
    },
    touchableOpacity: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryColor,
    },
    text: {
        textAlign: 'center',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 175,
        marginBottom: 3,
    },
});

export default RatingIcon;

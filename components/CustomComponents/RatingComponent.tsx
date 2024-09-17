import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { lstRatingIcon } from '../../constants/Constants';
import RatingIcon from './RatingIcon';
import Criteria from '../../models/Criteria';

interface RatingProps {
    criteria: Criteria;
    updatePoint: (code: string, point: number) => void;
}

const RatingComponent: React.FC<RatingProps> = (props) => {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    return (
        <View style={styles.iconContainer}>
            {
                lstRatingIcon.map((icon) => (
                    <RatingIcon
                        key={`${props.criteria.code}-${icon.code}`}
                        icon={icon}
                        isSelected={selectedIcon === icon.code}
                        onSelect={() => {
                            props.updatePoint(props.criteria.code, icon.point);
                            setSelectedIcon(icon.code);
                        }} />
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RatingComponent;

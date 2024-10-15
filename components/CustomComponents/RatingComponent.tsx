import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RatingIcon from './RatingIcon';
import Criteria from '../../models/Criteria';
import CardSvg from '../../static/svg/cardRotate.svg';
import SadUnselected from '../../static/svg/sadUnselected.svg';
import SadSelected from '../../static/svg/sadSelected.svg';
import NeutralUnselected from '../../static/svg/neutralUnselected.svg';
import NeutralSelected from '../../static/svg/neutralSelected.svg';
import HappyUnselected from '../../static/svg/happyUnselected.svg';
import HappySelected from '../../static/svg/happySelected.svg';
import LoveUnselected from '../../static/svg/loveUnselected.svg';
import LoveSelected from '../../static/svg/loveSelected.svg';

interface RatingProps {
    criteria: Criteria;
    updatePoint: (code: string, point: number) => void;
}

const RatingComponent: React.FC<RatingProps> = (props) => {
    const lstRatingIcon = [
        {
          point: 1,
          code: 'emoticon-sad-outline',
          label: 'Không hài lòng',
          color: '#ff9100',
          unselected: <SadUnselected style={styles.icon} />,
          selected: <SadSelected style={styles.icon} />,
        },
        {
          point: 2,
          code: 'emoticon-neutral-outline',
          label: 'Bình thường',
          color: '#f2b320',
          unselected: <NeutralUnselected style={styles.icon} />,
          selected: <NeutralSelected style={styles.icon} />,
        },
        {
          point: 3,
          code: 'emoticon-happy-outline',
          label: 'Hài lòng',
          color: '#8bc34a',
          unselected: <HappyUnselected style={styles.icon} />,
          selected: <HappySelected style={styles.icon} />,
        },
        {
          point: 4,
          code: 'emoticon-excited-outline',
          label: 'Rất hài lòng',
          color: '#14a37f',
          unselected: <LoveUnselected style={styles.icon} />,
          selected: <LoveSelected style={styles.icon} />,
        },
      ];

    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    return (
        <View style={styles.iconContainer}>
            <CardSvg style={styles.card} />
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
        position: 'absolute',
        bottom: 0,
        right: 50,
    },
    card: {
        width: 400,
        height: 70,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
    },
    icon: {
        height: 50,
        width: 50,
        margin: 10,
    },
});

export default RatingComponent;

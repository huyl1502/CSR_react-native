import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
interface RatingIconProps {
  icon: any;
  isSelected: boolean;
  onSelect: () => void;
}

const RatingIcon: React.FC<RatingIconProps> = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} activeOpacity={1} style={styles.iconContainer}>
      {props.isSelected ? (
        props.icon.selected
      ) : (
        props.icon.unselected
      )}
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    zIndex: 2,
    marginRight: 17,
  },
});

export default RatingIcon;

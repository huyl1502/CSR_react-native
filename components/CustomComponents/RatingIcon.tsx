import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface RatingIconProps {
  icon: any;
  isSelected: boolean;
  onSelect: () => void;
}

const RatingIcon: React.FC<RatingIconProps> = props => {
  return (
    <View style={styles.iconContainer}>
      {props.isSelected && (
        <MaterialCommunityIcons
          name="check"
          style={styles.iconCheck}
          size={65}
          color="#52b202"
        />
      )}
      <MaterialCommunityIcons
        name={props.icon.code}
        style={props.isSelected ? styles.iconSelected : styles.icon}
        size={65}
        color={props.icon.color}
        onPress={props.onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
  },
  iconCheck: {
    position: 'absolute',
  },
  icon: {
    opacity: 1,
  },
  iconSelected: {
    opacity: 0.5,
  },
});

export default RatingIcon;

import { NavigationProp } from '@react-navigation/native';

interface BaseProps {
  navigation: NavigationProp<any>;
  showLoading: () => void;
  hideLoading: () => void;
}

export default BaseProps;

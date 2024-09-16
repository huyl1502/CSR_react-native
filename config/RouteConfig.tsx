import LoginForm from '../components/Login/LoginForm';
import RatingForm from '../components/Rating/RatingForm';
import SettingForm from '../components/Setting/SettingForm';
import ThanksForm from '../components/Thanks/ThanksForm';
import WaitingForm from '../components/Waiting/WaitingForm';

type RootStackParamList = {
  Login: undefined;
  Waiting: undefined;
  Rating: undefined;
  Thanks: undefined;
  Setting: undefined;
};

export const routes = [
  {
    name: 'Login',
    component: LoginForm,
  },
  {
    name: 'Waiting',
    component: WaitingForm,
  },
  {
    name: 'Thanks',
    component: ThanksForm,
  },
  {
    name: 'Rating',
    component: RatingForm,
  },
  {
    name: 'Setting',
    component: SettingForm,
  },
];

export default routes;
export type { RootStackParamList };

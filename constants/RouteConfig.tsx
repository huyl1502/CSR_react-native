/* eslint-disable react/react-in-jsx-scope */
import LoginForm from '../components/Login/LoginForm';
import ScreenWrapper from '../components/CustomComponents/ScreenWrapper';

export const routes = [
    {
      name: 'Login',
      component: (props: any) => <ScreenWrapper {...props} component={LoginForm} />,
    },
];

export default routes;

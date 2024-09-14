import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LoadingIndicator from './components/CustomComponents/CircularProgress';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import routes from './constants/RouteConfig';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <SafeAreaView style={styles.container}>
          <LoadingIndicator loading={loading} />
          {routes.map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
              initialParams={{showLoading, hideLoading}}
            />
          ))}
        </SafeAreaView>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;

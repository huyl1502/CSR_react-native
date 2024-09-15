import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoadingIndicator from './components/CustomComponents/CircularProgress';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingProvider, useLoading } from './components/CustomComponents/LoadingContext';
import { PaperProvider } from 'react-native-paper';
import routes from './config/RouteConfig';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageStr } from './constants/Constants';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { loading } = useLoading();

  const getAndroidId = async () => {
    const id = await DeviceInfo.getAndroidId();
    await AsyncStorage.setItem(StorageStr.DeviceId, id);
    console.log(id);
  };

  useEffect(() => {
    getAndroidId();
  }, []);

  return (
    <>
      <LoadingIndicator loading={loading} />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {routes.map((route, index) => (
          <Stack.Screen
            key={index}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </>
  );
};

const App: React.FC = () => {
  return (
    <PaperProvider>
      <LoadingProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <AppNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </LoadingProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;

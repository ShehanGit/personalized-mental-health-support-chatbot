// navigation/RootNavigator.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './auth/AuthNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';

export default function RootNavigator() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then(token => {
        setUserToken(token);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppDrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

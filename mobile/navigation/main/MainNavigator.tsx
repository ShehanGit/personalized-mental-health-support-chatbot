// navigation/main/MainNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/main/HomeScreen';
import ChatScreen from '../../screens/main/ChatScreen';
import MoodTrackerScreen from '../../screens/main/MoodTrackerScreen';
import AuthNavigator from '../auth/AuthNavigator';

const MainStack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Chat" component={ChatScreen} />
      <MainStack.Screen name="MoodTracker" component={MoodTrackerScreen} />
      <MainStack.Screen name="Auth" component={AuthNavigator} />
    </MainStack.Navigator>
  );
}

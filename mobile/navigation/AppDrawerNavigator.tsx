// navigation/AppDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/main/HomeScreen';
import ChatScreen from '../screens/main/ChatScreen';
import NewSessionScreen from '../screens/main/NewSessionScreen';
import MoodTrackerScreen from '../screens/main/MoodTrackerScreen';
import CustomDrawerContent from './CustomDrawerContent';
import YourNewScreen from '../screens/main/YourNewScreen';
import ProfileScreen from '../screens/main/ProfileScreen';


const Drawer = createDrawerNavigator();

export default function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'MindCompanion' }} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="NewSession" component={NewSessionScreen} options={{ title: 'New Session' }} />
      <Drawer.Screen name="MoodTracker" component={MoodTrackerScreen} options={{ title: 'Mood Tracker' }} />
      <Drawer.Screen name="YourNew" component={YourNewScreen} options={{ title: 'My New Page' }}/>
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />


    </Drawer.Navigator>
  );
}

// screens/main/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Navigate back to the Auth flow
      navigation.replace('Auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to MindCompanion!</Text>
      <Button title="Go to Chat" onPress={() => navigation.navigate('Chat')} />
      <Button title="Go to Mood Tracker" onPress={() => navigation.navigate('MoodTracker')} />
      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} color="#d9534f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

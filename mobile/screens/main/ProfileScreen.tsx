// screens/main/ProfileScreen.tsx
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const jsonValue = await AsyncStorage.getItem('userData');
          if (jsonValue !== null) {
            setUserData(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error('Error retrieving user data:', e);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No profile data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      <Text style={styles.label}>Nickname:</Text>
      <Text style={styles.value}>{userData.nickname}</Text>
      
      <Text style={styles.label}>Age Range:</Text>
      <Text style={styles.value}>{userData.ageRange}</Text>
      
      <Text style={styles.label}>Preferred Language:</Text>
      <Text style={styles.value}>{userData.preferredLanguage}</Text>
      
      <Text style={styles.label}>Primary Concern:</Text>
      <Text style={styles.value}>{userData.primaryConcern}</Text>
      
      <Text style={styles.label}>Goal:</Text>
      <Text style={styles.value}>{userData.goal}</Text>
      
      <Text style={styles.label}>Check-In Frequency:</Text>
      <Text style={styles.value}>{userData.checkInFrequency}</Text>
      
      <Text style={styles.label}>Mood Triggers:</Text>
      <Text style={styles.value}>{userData.moodTriggers}</Text>
      
      <Text style={styles.label}>Coping Style:</Text>
      <Text style={styles.value}>{userData.copingStyle}</Text>
      
      <Text style={styles.label}>Tone Preference:</Text>
      <Text style={styles.value}>{userData.tone}</Text>
      
      <Text style={styles.label}>Busy Times:</Text>
      <Text style={styles.value}>{userData.busyTimes}</Text>
      
      <Text style={styles.label}>Free Time Activities:</Text>
      <Text style={styles.value}>{userData.freeTimeActivities}</Text>
      
      <Text style={styles.label}>Sleep Pattern:</Text>
      <Text style={styles.value}>{userData.sleep}</Text>
      
      <Text style={styles.label}>Support Preference:</Text>
      <Text style={styles.value}>{userData.supportPreference}</Text>
      
      <Text style={styles.label}>Emergency Contact:</Text>
      <Text style={styles.value}>{userData.emergencyContact}</Text>
      
      <Text style={styles.label}>Boundaries:</Text>
      <Text style={styles.value}>{userData.boundaries}</Text>
      
      <Text style={styles.label}>Theme Preference:</Text>
      <Text style={styles.value}>{userData.theme}</Text>
      
      <Text style={styles.label}>Text Size:</Text>
      <Text style={styles.value}>{userData.textSize}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

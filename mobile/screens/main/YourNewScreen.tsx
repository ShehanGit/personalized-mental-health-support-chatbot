// screens/OnboardingScreen.tsx
import React, { useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  nickname: string;
  ageRange: string;
  preferredLanguage: string;
  primaryConcern: string;
  goal: string;
  checkInFrequency: string;
  moodTriggers: string;
  copingStyle: string;
  tone: string;
  busyTimes: string;
  freeTimeActivities: string;
  sleep: string;
  supportPreference: string;
  emergencyContact: string;
  boundaries: string;
  theme: string;
  textSize: string;
}

const defaultUserData: UserData = {
  nickname: '',
  ageRange: '',
  preferredLanguage: '',
  primaryConcern: '',
  goal: '',
  checkInFrequency: '',
  moodTriggers: '',
  copingStyle: '',
  tone: '',
  busyTimes: '',
  freeTimeActivities: '',
  sleep: '',
  supportPreference: '',
  emergencyContact: '',
  boundaries: '',
  theme: '',
  textSize: '',
};

export default function OnboardingScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const steps = [
    'Basic Personal Context',
    'Mental Health Goals',
    'Emotional & Behavioral Preferences',
    'Daily Life Context',
    'Support System & Safety',
    'Accessibility & Comfort',
    'Confirmation',
  ];

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Success', 'Your data has been saved successfully.');
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save your data.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Basic Personal Context</Text>
            <TextInput
              style={styles.input}
              placeholder="What should I call you? (nickname)"
              value={userData.nickname}
              onChangeText={(text) => handleChange('nickname', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Age Range (e.g., 18-25)"
              value={userData.ageRange}
              onChangeText={(text) => handleChange('ageRange', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Preferred Language"
              value={userData.preferredLanguage}
              onChangeText={(text) => handleChange('preferredLanguage', text)}
            />
          </View>
        );
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Mental Health Goals</Text>
            <TextInput
              style={styles.input}
              placeholder="Primary Concern (e.g., anxiety)"
              value={userData.primaryConcern}
              onChangeText={(text) => handleChange('primaryConcern', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="What do you want to feel more of? (e.g., calm, motivated)"
              value={userData.goal}
              onChangeText={(text) => handleChange('goal', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Check-In Frequency (e.g., daily, weekly)"
              value={userData.checkInFrequency}
              onChangeText={(text) => handleChange('checkInFrequency', text)}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Emotional & Behavioral Preferences</Text>
            <TextInput
              style={styles.input}
              placeholder="Mood Triggers (comma separated)"
              value={userData.moodTriggers}
              onChangeText={(text) => handleChange('moodTriggers', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Coping Style (e.g., distractions, talking it out)"
              value={userData.copingStyle}
              onChangeText={(text) => handleChange('copingStyle', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tone Preference (e.g., warm, upbeat)"
              value={userData.tone}
              onChangeText={(text) => handleChange('tone', text)}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Daily Life Context</Text>
            <TextInput
              style={styles.input}
              placeholder="Busy Times (mornings, evenings, etc.)"
              value={userData.busyTimes}
              onChangeText={(text) => handleChange('busyTimes', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Free Time Activities (comma separated)"
              value={userData.freeTimeActivities}
              onChangeText={(text) => handleChange('freeTimeActivities', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Sleep Pattern (e.g., great, struggling)"
              value={userData.sleep}
              onChangeText={(text) => handleChange('sleep', text)}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Support System & Safety</Text>
            <TextInput
              style={styles.input}
              placeholder="Support Preference (e.g., friend, professional)"
              value={userData.supportPreference}
              onChangeText={(text) => handleChange('supportPreference', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Emergency Contact (optional)"
              value={userData.emergencyContact}
              onChangeText={(text) => handleChange('emergencyContact', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Topics to avoid (comma separated)"
              value={userData.boundaries}
              onChangeText={(text) => handleChange('boundaries', text)}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Accessibility & Comfort</Text>
            <TextInput
              style={styles.input}
              placeholder="Theme Preference (light, dark, calming)"
              value={userData.theme}
              onChangeText={(text) => handleChange('theme', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Text Size (standard, large)"
              value={userData.textSize}
              onChangeText={(text) => handleChange('textSize', text)}
            />
          </View>
        );
      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Confirmation</Text>
            <Text>Please review your details:</Text>
            <Text>Nickname: {userData.nickname}</Text>
            <Text>Age Range: {userData.ageRange}</Text>
            <Text>Language: {userData.preferredLanguage}</Text>
            <Text>Primary Concern: {userData.primaryConcern}</Text>
            <Text>Goal: {userData.goal}</Text>
            <Text>Check-In Frequency: {userData.checkInFrequency}</Text>
            <Text>Mood Triggers: {userData.moodTriggers}</Text>
            <Text>Coping Style: {userData.copingStyle}</Text>
            <Text>Tone Preference: {userData.tone}</Text>
            <Text>Busy Times: {userData.busyTimes}</Text>
            <Text>Free Time Activities: {userData.freeTimeActivities}</Text>
            <Text>Sleep: {userData.sleep}</Text>
            <Text>Support Preference: {userData.supportPreference}</Text>
            <Text>Emergency Contact: {userData.emergencyContact}</Text>
            <Text>Boundaries: {userData.boundaries}</Text>
            <Text>Theme: {userData.theme}</Text>
            <Text>Text Size: {userData.textSize}</Text>
            <Button title="Save Data" onPress={saveData} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderStep()}
      <View style={styles.navigationButtons}>
        {currentStep > 0 && <Button title="Previous" onPress={prevStep} />}
        {currentStep < steps.length - 1 && <Button title="Next" onPress={nextStep} />}
        {isSaved && (
          <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  stepContainer: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

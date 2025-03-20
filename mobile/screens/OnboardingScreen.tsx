// screens/OnboardingScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingData {
  nickname?: string;
  ageRange?: string;
  preferredLanguage?: string;
  primaryConcern?: string;
  goal?: string;
  checkInFrequency?: string;
  moodTriggers?: string;
  copingStyle?: string;
  tonePreference?: string;
  busyTimes?: string;
  freeTimeActivities?: string;
  sleepPattern?: string;
  supportPreference?: string;
  emergencyContact?: string;
  boundaries?: string;
  themePreference?: string;
  textSize?: string;
}

const OnboardingScreen = ({ navigation }: any) => {
  // Step index (0-5)
  const [step, setStep] = useState<number>(0);
  // Object holding answers
  const [data, setData] = useState<OnboardingData>({});

  // Array of step titles (categories)
  const steps = [
    'Basic Personal Context',
    'Mental Health Goals',
    'Emotional and Behavioral Preferences',
    'Daily Life Context',
    'Support System and Safety',
    'Accessibility and Comfort',
  ];

  // Advance to the next step, or finish onboarding on the last step
  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      try {
        // Save the onboarding data in AsyncStorage
        await AsyncStorage.setItem('onboardingData', JSON.stringify(data));
        // Mark onboarding as complete
        await AsyncStorage.setItem('onboardingComplete', 'true');
        // Navigate to the main app (adjust the route as needed)
        navigation.replace('Main');
      } catch (error) {
        console.error('Error saving onboarding data:', error);
      }
    }
  };

  // Optionally go back to the previous step
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Update a specific field in the data object
  const handleChange = (field: keyof OnboardingData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Render the form for the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{steps[0]}</Text>
            <Text>What should I call you? (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Nickname"
              value={data.nickname || ''}
              onChangeText={text => handleChange('nickname', text)}
            />
            <Text>Which age group are you in? (e.g., 18-25, 26-35, 36+)</Text>
            <TextInput
              style={styles.input}
              placeholder="Age Range"
              value={data.ageRange || ''}
              onChangeText={text => handleChange('ageRange', text)}
            />
            <Text>What language do you feel most comfortable with?</Text>
            <TextInput
              style={styles.input}
              placeholder="Preferred Language"
              value={data.preferredLanguage || ''}
              onChangeText={text => handleChange('preferredLanguage', text)}
            />
          </View>
        );
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{steps[1]}</Text>
            <Text>
              What's your biggest mental health challenge right now? (e.g., stress, anxiety, sleep, loneliness, motivation)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Primary Concern"
              value={data.primaryConcern || ''}
              onChangeText={text => handleChange('primaryConcern', text)}
            />
            <Text>
              What would you like to feel more of? (e.g., calm, motivated, connected, rested)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Goal"
              value={data.goal || ''}
              onChangeText={text => handleChange('goal', text)}
            />
            <Text>
              How often would you like me to check in with you? (e.g., daily, every other day, weekly)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Check-In Frequency"
              value={data.checkInFrequency || ''}
              onChangeText={text => handleChange('checkInFrequency', text)}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{steps[2]}</Text>
            <Text>
              What tends to affect your mood the most? (e.g., work, relationships, lack of sleep, social media)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Mood Triggers"
              value={data.moodTriggers || ''}
              onChangeText={text => handleChange('moodTriggers', text)}
            />
            <Text>
              When you're feeling down, what usually helps? (e.g., talking it out, distractions, physical activity, quiet time)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Coping Style"
              value={data.copingStyle || ''}
              onChangeText={text => handleChange('copingStyle', text)}
            />
            <Text>
              How would you like me to talk to you? (e.g., warm and gentle, upbeat and encouraging, straightforward)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Tone Preference"
              value={data.tonePreference || ''}
              onChangeText={text => handleChange('tonePreference', text)}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{steps[3]}</Text>
            <Text>
              When are you usually busiest during the day? (e.g., mornings, afternoons, evenings)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Busy Times"
              value={data.busyTimes || ''}
              onChangeText={text => handleChange('busyTimes', text)}
            />
            <Text>
              What do you enjoy doing when you have a moment to relax? (e.g., reading, music, walking)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Free Time Activities"
              value={data.freeTimeActivities || ''}
              onChangeText={text => handleChange('freeTimeActivities', text)}
            />
            <Text>
              How’s your sleep lately? (e.g., great, okay, struggling)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Sleep Pattern"
              value={data.sleepPattern || ''}
              onChangeText={text => handleChange('sleepPattern', text)}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{steps[4]}</Text>
            <Text>
              If you're feeling really low, would you rather talk to me, a friend, or a professional?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Support Preference"
              value={data.supportPreference || ''}
              onChangeText={text => handleChange('supportPreference', text)}
            />
            <Text>
              Would you like to save a trusted contact or helpline number for tough moments? (Optional)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Emergency Contact"
              value={data.emergencyContact || ''}
              onChangeText={text => handleChange('emergencyContact', text)}
            />
            <Text>
              Are there any topics you'd rather I avoid? (Optional)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Boundaries"
              value={data.boundaries || ''}
              onChangeText={text => handleChange('boundaries', text)}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{steps[5]}</Text>
            <Text>Would you prefer a light, dark, or calming color theme?</Text>
            <TextInput
              style={styles.input}
              placeholder="Theme Preference"
              value={data.themePreference || ''}
              onChangeText={text => handleChange('themePreference', text)}
            />
            <Text>Do you prefer standard or larger text for easier reading?</Text>
            <TextInput
              style={styles.input}
              placeholder="Text Size"
              value={data.textSize || ''}
              onChangeText={text => handleChange('textSize', text)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderStep()}
        <View style={styles.buttonContainer}>
          {step > 0 && <Button title="Back" onPress={handleBack} />}
          <Button title={step === steps.length - 1 ? 'Finish' : 'Next'} onPress={handleNext} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 12,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default OnboardingScreen;

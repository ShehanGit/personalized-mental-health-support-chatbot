// screens/HomeScreen.tsx
import React from 'react';
import { Button, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to MindCompanion!</Text>
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate('Chat')}
      />
    </View>
  );
}

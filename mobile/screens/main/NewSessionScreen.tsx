// screens/main/NewSessionScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../services/api';

export default function NewSessionScreen({ navigation }: any) {
  const [sessionName, setSessionName] = useState('');

  const createSession = async () => {
    try {
      const response = await api.post('/chat/new-session', { sessionName });
      // Expect backend to return { sessionId, message }
      const { sessionId } = response.data;
      // Navigate to Chat screen with new session ID
      navigation.navigate('Chat', { sessionId });
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Session</Text>
      <TextInput
        style={styles.input}
        placeholder="Session Name"
        value={sessionName}
        onChangeText={setSessionName}
      />
      <Button title="Create Session" onPress={createSession} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10, borderRadius: 5 },
});

// Example: in ChatScreen to send a message
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../services/api';

export default function ChatScreen() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      const sessionId = 'your-session-id'; // Retrieve from context or backend
      const response = await api.post('/chat/message', {
        sessionId,
        message,
      });
      console.log('Chat response:', response.data);
      // Update your chat UI with response.data.response
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Chat with MindCompanion!</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        style={{ width: '80%', borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

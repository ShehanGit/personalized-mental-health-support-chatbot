// screens/main/ChatScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import api from '../../services/api';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
}

export default function ChatScreen() {
  // Use your dynamic session ID as needed
  const sessionId = '67db5f1db692a978b6bb1a42';
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch chat history once on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get(`/chat/history/${sessionId}`);
        // Assuming response.data is an array of records with userMessage and chatResponse
        const historyData: ChatMessage[] = [];
        response.data.forEach((record: any) => {
          if (record.userMessage) {
            historyData.push({
              id: record._id + '_user',
              text: record.userMessage,
              isUser: true,
            });
          }
          if (record.chatResponse) {
            historyData.push({
              id: record._id + '_bot',
              text: record.chatResponse,
              isUser: false,
            });
          }
        });
        // Save the history in chronological order (oldest first)
        setChatHistory(historyData);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [sessionId]);

  // Function to send a message
  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user's message immediately
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
    };
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      const response = await api.post('/chat/message', { sessionId, message });
      const newBotMessage: ChatMessage = {
        id: Date.now().toString() + '_bot',
        text: response.data.response,
        isUser: false,
      };
      setChatHistory(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
    } finally {
      setMessage('');
    }
  };

  // Memoize reversed chat history to avoid recalculating on each render
  const reversedChatHistory = useMemo(() => {
    return [...chatHistory].reverse();
  }, [chatHistory]);

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjust as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <FlatList
            // Using inverted so that new messages appear at the bottom
            inverted
            data={reversedChatHistory}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.chatList}
            contentContainerStyle={{ paddingVertical: 10 }}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            getItemLayout={(data, index) => ({
              length: 70, // Approximate fixed height per item; adjust as needed
              offset: 70 * index,
              index,
            })}
          />
          <View style={styles.inputArea}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '75%',
  },
  userBubble: {
    backgroundColor: '#4a90e2',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  botBubble: {
    backgroundColor: '#7b7b7b',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

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
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
}

export default function ChatScreen() {
  const route = useRoute();
  const { sessionId: routeSessionId } = route.params || {};
  const sessionId = routeSessionId || '67db5f1db692a978b6bb1a42';

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get(`/chat/history/${sessionId}`);
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
        setChatHistory(historyData);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [sessionId]);

  // Fetch user's personal data from AsyncStorage
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('userData');
        if (storedProfile) {
          setProfileData(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
    };
    setChatHistory(prev => [...prev, newUserMessage]);
  
    try {
      // Build the payload with userProfile
      const payload = {
        sessionId,
        message,
        userProfile: profileData,
      };
      //console.log('Sending payload to /chat/message:', payload); // LOG for debugging
  
      const response = await api.post('/chat/message', payload);
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

  // Memoize reversed chat history for performance
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
      <Text
        style={[
          styles.messageText,
          item.isUser ? styles.userText : styles.botText,
        ]}
      >
        {item.text}
      </Text>
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <FlatList
              inverted
              data={reversedChatHistory}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={styles.chatList}
              contentContainerStyle={styles.chatListContent}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={true}
              getItemLayout={(data, index) => ({
                length: 70,
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  chatListContent: {
    paddingVertical: 10,
  },
  messageBubble: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginVertical: 6,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4a90e2',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#E4E6EB',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#333333',
  },
  inputArea: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,  
    height: 44,
    paddingHorizontal: 12,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    color: '#333333',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

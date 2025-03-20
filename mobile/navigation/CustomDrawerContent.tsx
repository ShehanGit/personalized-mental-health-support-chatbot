// navigation/CustomDrawerContent.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import api from '../services/api';

export default function CustomDrawerContent(props: any) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/chat/sessions'); // Backend should return an array of sessions
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <Text style={styles.drawerHeader}>Chat Sessions</Text>
        {isLoading ? (
          <ActivityIndicator size="small" color="#4a90e2" />
        ) : (
          sessions.map(session => (
            <TouchableOpacity
              key={session._id}
              style={styles.sessionItem}
              onPress={() => {
                // Navigate to Chat screen with selected session ID
                props.navigation.navigate('Chat', { sessionId: session._id });
              }}
            >
              <Text style={styles.sessionText}>{session.sessionName || 'Untitled Session'}</Text>
            </TouchableOpacity>
          ))
        )}
        <TouchableOpacity
          style={styles.newSessionButton}
          onPress={() => props.navigation.navigate('NewSession')}
        >
          <Text style={styles.newSessionText}>+ New Session</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { flex: 1, padding: 10 },
  drawerHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  sessionItem: { paddingVertical: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#ccc' },
  sessionText: { fontSize: 16 },
  newSessionButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    alignItems: 'center',
  },
  newSessionText: { color: '#fff', fontSize: 16 },
});

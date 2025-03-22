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
        const response = await api.get('/chat/sessions');
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
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MindCompanion</Text>
      </View>
      {/* Home Navigation Button */}
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => props.navigation.navigate('Home')}
      >
        <Text style={styles.navButtonText}>Home</Text>
      </TouchableOpacity>
      {/* Chat Sessions Section */}
      <Text style={styles.sectionHeader}>Chat Sessions</Text>
      {isLoading ? (
        <ActivityIndicator size="small" color="#333" style={{ marginVertical: 10 }} />
      ) : (
        sessions.map(session => (
          <TouchableOpacity
            key={session._id}
            style={styles.sessionItem}
            onPress={() => props.navigation.navigate('Chat', { sessionId: session._id })}
          >
            <Text style={styles.sessionText}>{session.sessionName || 'Untitled Session'}</Text>
          </TouchableOpacity>
        ))
      )}
      {/* New Session Button */}
      <TouchableOpacity
        style={styles.newSessionButton}
        onPress={() => props.navigation.navigate('NewSession')}
      >
        <Text style={styles.newSessionButtonText}>+ New Session</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // light grey background for a clean look
    paddingVertical: 40,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // dark text for contrast
  },
  navButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  navButtonText: {
    fontSize: 18,
    color: '#333',
  },
  sectionHeader: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  sessionItem: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  sessionText: {
    fontSize: 16,
    color: '#555',
  },
  newSessionButton: {
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#4a90e2', 
    borderRadius: 8,
    alignItems: 'center',
  },
  newSessionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

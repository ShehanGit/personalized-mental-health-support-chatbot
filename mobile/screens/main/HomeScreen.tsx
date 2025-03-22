// screens/main/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

// If using Expo's linear-gradient:
import { LinearGradient } from 'expo-linear-gradient';
// If you're NOT using Expo, install `react-native-linear-gradient` and do:
// import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Auth' as never);
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Error', 'Something went wrong while logging out');
    }
  };

  // Fallback if running on Web or a platform that doesn't support gradient
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.fallbackBackground, { justifyContent: 'center' }]}>
        <Text style={styles.title}>MindCompanion</Text>
        <Text style={styles.subtitle}>[Web fallback: white background]</Text>
      </View>
    );
  }

  return (
    // Light Gray Gradient from top to bottom for subtle depth
    <LinearGradient
      colors={['#FFFFFF', '#F9F9F9']}
      style={styles.gradientContainer}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>MindCompanion</Text>
        <Text style={styles.subtitle}>Your Calm Sphere</Text>
      </View>

      {/* Cards Row #1 */}
      <View style={styles.cardsContainer}>
        <Animatable.View
          style={styles.card}
          animation="fadeInUp"
          delay={100}
          useNativeDriver
        >
          <TouchableOpacity
            style={styles.cardInner}
            onPress={() => navigation.navigate('Chat' as never)}
          >
            <Icon name="chatbubbles-outline" size={30} color="#333" />
            <Text style={styles.cardText}>Chat</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          style={styles.card}
          animation="fadeInUp"
          delay={200}
          useNativeDriver
        >
          <TouchableOpacity
            style={styles.cardInner}
            onPress={() => navigation.navigate('MoodTracker' as never)}
          >
            <Icon name="stats-chart-outline" size={30} color="#333" />
            <Text style={styles.cardText}>Mood Tracker</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {/* Cards Row #2 */}
      <View style={styles.cardsContainer}>
        <Animatable.View
          style={styles.card}
          animation="fadeInUp"
          delay={300}
          useNativeDriver
        >
          <TouchableOpacity
            style={styles.cardInner}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <Icon name="person-circle-outline" size={30} color="#333" />
            <Text style={styles.cardText}>My Profile</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          style={styles.card}
          animation="fadeInUp"
          delay={400}
          useNativeDriver
        >
          <TouchableOpacity
            style={styles.cardInner}
            onPress={() => navigation.navigate('YourNew' as never)}
          >
            <Icon name="create-outline" size={30} color="#333" />
            <Text style={styles.cardText}>Personal Info</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {/* Additional Future Feature Cards */}
      <View style={styles.smallCardsContainer}>
        <Animatable.View
          style={styles.smallCard}
          animation="fadeInUp"
          delay={500}
          useNativeDriver
        >
          <TouchableOpacity
            style={styles.cardInner}
            onPress={() => Alert.alert('Coming Soon', 'Guided Meditation')}
          >
            <Icon name="leaf-outline" size={26} color="#333" />
            <Text style={styles.smallCardText}>Meditation</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          style={styles.smallCard}
          animation="fadeInUp"
          delay={600}
          useNativeDriver
        >
          <TouchableOpacity
            style={styles.cardInner}
            onPress={() => Alert.alert('Coming Soon', 'Daily Journal')}
          >
            <Icon name="book-outline" size={26} color="#333" />
            <Text style={styles.smallCardText}>Journal</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          style={styles.smallCard}
          animation="fadeInUp"
          delay={700}
          useNativeDriver
        >
          <TouchableOpacity
            style={styles.cardInner}
            onPress={() => Alert.alert('Coming Soon', 'Community Forum')}
          >
            <Icon name="people-outline" size={26} color="#333" />
            <Text style={styles.smallCardText}>Forum</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {/* Logout */}
      <Animatable.View
        style={styles.logoutButton}
        animation="fadeInUp"
        delay={800}
        useNativeDriver
      >
        <TouchableOpacity style={styles.logoutTouch} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#333" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fallbackBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#333',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 4,
    borderRadius: 14,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  cardInner: {
    alignItems: 'center',
  },
  cardText: {
    color: '#333',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  smallCardsContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  smallCard: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 4,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  smallCardText: {
    color: '#333',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 'auto',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 6,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

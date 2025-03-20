// screens/main/MoodTrackerScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function MoodTrackerScreen() {
  const [moods, setMoods] = useState<number[]>([3, 5, 4, 2, 4, 5]);
  // For real usage, retrieve from your backend or local storage

  const addMood = (value: number) => {
    setMoods(prev => [...prev, value]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>
      <Button title="Add Good Mood (5)" onPress={() => addMood(5)} />
      <Button title="Add Bad Mood (1)" onPress={() => addMood(1)} />

      <LineChart
        data={{
          labels: moods.map((_, i) => (i + 1).toString()),
          datasets: [{ data: moods }]
        }}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fafafa',
          backgroundGradientTo: '#fafafa',
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 20 },
  title: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' }
});

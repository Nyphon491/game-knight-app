import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

export default function TimerFinishScreen() {
  const router = useRouter();
  const flashAnim = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(true);

  useEffect(() => {
    Vibration.vibrate([0, 300, 150, 300, 150, 300]);

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flashAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
        Animated.timing(flashAnim, { toValue: 0, duration: 200, useNativeDriver: false }),
      ])
    );
    loop.start();

    const stopTimeout = setTimeout(() => {
      setActive(false);
      loop.stop();
      flashAnim.setValue(0);
    }, 2800);

    return () => {
      clearTimeout(stopTimeout);
      loop.stop();
      flashAnim.setValue(0);
    };
  }, []);

  const bgColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#ffdddd'],
  });

  return (
    <Animated.View style={[styles.fill, { backgroundColor: bgColor }]}>
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>Time's up!</Text>
          <Text style={styles.subtitle}>Great job. Ready to go again?</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.primaryButton]}
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/timer', params: { game: 'Timer' } })}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Restart Timer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton]}
              activeOpacity={0.8}
              onPress={() => router.push('/choose-game')}
            >
              <Text style={styles.secondaryButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 48, fontWeight: '800', color: '#d32f2f', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#333', marginBottom: 24 },
  buttonsRow: { gap: 12, width: '80%' },
  primaryButton: {
    backgroundColor: '#00AEEF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  secondaryButtonText: { color: '#00AEEF', fontSize: 16, fontWeight: '700' },
});

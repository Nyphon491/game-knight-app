import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function RandomFirstLetterScreen() {
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const gameName = typeof game === 'string' ? game : 'Random First Letter';

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [current, setCurrent] = useState<string>('A');
  const rollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => setDimensions(window));
    const lock = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        await new Promise((r) => setTimeout(r, 100));
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch {}
    };
    lock();
    return () => subscription?.remove();
  }, []);

  const rollOnce = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];

  const startRoll = () => {
    // animate scale
    anim.setValue(0);
    Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: true }).start(() => anim.setValue(0));
    // spin letters briefly
    let ticks = 0;
    if (rollingRef.current) clearInterval(rollingRef.current);
    rollingRef.current = setInterval(() => {
      ticks += 1;
      setCurrent(rollOnce());
      if (ticks > 16) {
        if (rollingRef.current) clearInterval(rollingRef.current);
        rollingRef.current = null;
      }
    }, 40);
  };

  const handleTap = () => {
    startRoll();
  };

  const scale = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.15, 1] });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.gameName}>{gameName}</Text>
      </View>
      <TouchableOpacity style={styles.fill} activeOpacity={0.8} onPress={handleTap}>
        <View style={styles.centerArea}>
          <Animated.Text style={[styles.letter, { transform: [{ scale }] }]}>{current}</Animated.Text>
          <Text style={styles.hint}>Tap to roll</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.backRow}>
        <TouchableOpacity onPress={() => router.push('/choose-game')} activeOpacity={0.8}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: { alignItems: 'center', paddingTop: 12 },
  gameName: { fontSize: 20, fontWeight: '700', color: '#00AEEF' },
  fill: { flex: 1 },
  centerArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  letter: { fontSize: 160, fontWeight: '900', color: '#333' },
  hint: { marginTop: 12, fontSize: 16, color: '#666' },
  backRow: { alignItems: 'center', marginBottom: 20 },
  backText: { fontSize: 18, fontWeight: '600', color: '#00AEEF' },
});

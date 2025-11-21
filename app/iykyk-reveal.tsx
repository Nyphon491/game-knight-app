import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IykykRevealScreen() {
  const router = useRouter();
  const { data } = useLocalSearchParams<{ data?: string }>();

  type Entry = { question: string; answer: string; playerIndex: number };
  const entries = useMemo<Entry[]>(() => {
    try {
      const parsed: Entry[] = data ? JSON.parse(data) : [];
      // shuffle
      for (let i = parsed.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [parsed[i], parsed[j]] = [parsed[j], parsed[i]];
      }
      return parsed;
    } catch {
      return [];
    }
  }, [data]);

  const [index, setIndex] = useState(0);
  const [showWho, setShowWho] = useState(false);

  const done = index >= entries.length;
  const current = entries[index];

  const handleTap = () => {
    if (done) {
      router.push('/choose-game');
      return;
    }
    if (!showWho) setShowWho(true);
    else {
      setShowWho(false);
      setIndex((i) => i + 1);
    }
  };

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', () => {});
    const lock = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        await new Promise((r) => setTimeout(r, 100));
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch {}
    };
    lock();
    return () => sub?.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.gameName}>IYKYK • Reveal</Text>
        <Image source={require('@/assets/images/game-knight-logo.png')} style={styles.logoImage} resizeMode="contain" />
      </View>
      <TouchableOpacity style={styles.fill} activeOpacity={0.9} onPress={handleTap}>
        <View style={styles.centerArea}>
          {done ? (
            <>
              <Text style={styles.doneTitle}>All done!</Text>
              <Text style={styles.doneSub}>Tap to return</Text>
            </>
          ) : (
            <>
              <Text style={styles.question}>{current?.question}</Text>
              <Text style={styles.answer}>{current?.answer || '—'}</Text>
              <Text style={styles.who}>{showWho ? `Answered by Player ${String((current?.playerIndex ?? 0) + 1)}` : 'Tap to reveal who'}</Text>
              <Text style={styles.counter}>{index + 1} / {entries.length}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.backRow}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  fill: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E6E6E6' },
  logoImage: { width: 40, height: 40 },
  gameName: { fontSize: 18, fontWeight: '700', color: '#00AEEF' },
  centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, gap: 12 },
  question: { fontSize: 24, fontWeight: '800', color: '#333', textAlign: 'center' },
  answer: { fontSize: 22, color: '#00AEEF', textAlign: 'center' },
  who: { marginTop: 10, fontSize: 16, color: '#666' },
  counter: { marginTop: 8, fontSize: 14, color: '#999' },
  doneTitle: { fontSize: 28, fontWeight: '900', color: '#00AEEF' },
  doneSub: { fontSize: 16, color: '#333' },
  backRow: { alignItems: 'center', marginBottom: 16 },
  backText: { fontSize: 18, fontWeight: '600', color: '#00AEEF' },
});

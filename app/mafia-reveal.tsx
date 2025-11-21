import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function buildDeck(rolesObj: Record<string, number>) {
  const deck: string[] = [];
  Object.entries(rolesObj).forEach(([role, count]) => {
    for (let i = 0; i < count; i += 1) deck.push(role);
  });
  // Shuffle
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function MafiaRevealScreen() {
  const router = useRouter();
  const { roles } = useLocalSearchParams<{ roles?: string }>();
  const parsedRoles = useMemo(() => {
    try {
      return roles ? (JSON.parse(roles) as Record<string, number>) : {};
    } catch {
      return {} as Record<string, number>;
    }
  }, [roles]);

  const deck = useMemo(() => buildDeck(parsedRoles), [parsedRoles]);
  const [index, setIndex] = useState(0);
  const [covered, setCovered] = useState(true);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', () => {});
    const lock = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        await new Promise((r) => setTimeout(r, 100));
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch {}
    };
    lock();
    return () => {
      sub?.remove();
    };
  }, []);

  const done = index >= deck.length;

  const handleTap = () => {
    if (done) {
      router.push('/choose-game');
      return;
    }
    if (covered) {
      setCovered(false); // reveal the card
    } else {
      // hide and move to next
      setCovered(true);
      setIndex((i) => i + 1);
    }
  };

  const currentRole = deck[index] ?? '';

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.fill} activeOpacity={0.9} onPress={handleTap}>
        <View style={styles.centerArea}>
          {done ? (
            <>
              <Text style={styles.finishedTitle}>All cards revealed</Text>
              <Text style={styles.finishedSub}>Tap to return</Text>
            </>
          ) : covered ? (
            <>
              <Text style={styles.coverTitle}>Tap to see next card</Text>
              <Text style={styles.counter}>{index + 1} / {deck.length}</Text>
            </>
          ) : (
            <>
              <Text style={styles.roleText}>{currentRole}</Text>
              <Text style={styles.counterSmall}>Tap again to hide</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  fill: { flex: 1 },
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  coverTitle: { fontSize: 28, fontWeight: '800', color: '#00AEEF', textAlign: 'center' },
  roleText: { fontSize: 64, fontWeight: '900', color: '#333', textAlign: 'center' },
  counter: { marginTop: 12, fontSize: 18, color: '#333' },
  counterSmall: { marginTop: 12, fontSize: 16, color: '#666' },
  finishedTitle: { fontSize: 32, fontWeight: '900', color: '#00AEEF', textAlign: 'center' },
  finishedSub: { marginTop: 8, fontSize: 16, color: '#333', textAlign: 'center' },
});

import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getRankSlidesForLevel, getRankThemeForLevel } from './data/rankItLevels';

export default function RankItGameScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    const lockOrientation = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        await new Promise(resolve => setTimeout(resolve, 100));
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch {}
    };

    lockOrientation();
    return () => subscription?.remove();
  }, []);

  const router = useRouter();
  const { game, level, players } = useLocalSearchParams<{ game?: string; level?: string; players?: string }>();
  const levelNumber = level ? Number(level) : 1;

  const slides = useMemo(() => getRankSlidesForLevel(levelNumber), [levelNumber]);
  const theme = useMemo(() => getRankThemeForLevel(levelNumber), [levelNumber]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = slides[currentIndex % slides.length];

  const handleCenterPress = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      setShowAnswer(false);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  const playerCount = players ? Math.min(Math.max(Number(players) || 2, 2), 4) : 2;
  const [scores, setScores] = useState<number[]>(() => Array.from({ length: playerCount }, () => 0));
  const SCORE_COLORS = ['#FF6B8B', '#4CAF50', '#2196F3', '#FFC107'];
  const handleIncrement = (index: number) => setScores((prev) => prev.map((v, i) => (i === index ? v + 1 : v)));
  const handleDecrement = (index: number) => setScores((prev) => prev.map((v, i) => (i === index ? Math.max(0, v - 1) : v)));
  const leftPlayers: number[] = []; const rightPlayers: number[] = [];
  scores.forEach((_, i) => { if (i % 2 === 0) leftPlayers.push(i); else rightPlayers.push(i); });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image
            source={require('@/assets/images/game-knight-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Game Knight</Text>
        </View>
        <Text style={styles.gameName}>{theme}</Text>
      </View>

      <View style={styles.mainRow}>
        <View style={styles.sideColumn}>
          {leftPlayers.map((index) => (
            <View key={index} style={styles.scoreBlock}>
              <TouchableOpacity style={[styles.scoreCircle, { backgroundColor: SCORE_COLORS[index % SCORE_COLORS.length] }]} activeOpacity={0.8} onPress={() => handleIncrement(index)}>
                <Text style={styles.scoreText}>{scores[index]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.minusButton} activeOpacity={0.8} onPress={() => handleDecrement(index)}>
                <Text style={styles.minusText}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Pressable style={styles.centerArea} onPress={handleCenterPress}>
          <View style={styles.promptBlock}>
            <Text style={styles.promptText}>{current.prompt}</Text>
          </View>
          <View style={styles.itemsBlock}>
            {current.items.map((it) => (
              <Text key={it} style={styles.itemText}>• {it}</Text>
            ))}
          </View>
          {showAnswer && (
            <View style={styles.answerBlock}>
              <Text style={styles.answerTitle}>Correct Order</Text>
              {current.correctOrder.map((it, idx) => (
                <Text key={it} style={styles.answerItem}>{idx + 1}. {it}</Text>
              ))}
            </View>
          )}
        </Pressable>

        <View style={styles.sideColumn}>
          {rightPlayers.map((index) => (
            <View key={index} style={styles.scoreBlock}>
              <TouchableOpacity style={[styles.scoreCircle, { backgroundColor: SCORE_COLORS[index % SCORE_COLORS.length] }]} activeOpacity={0.8} onPress={() => handleIncrement(index)}>
                <Text style={styles.scoreText}>{scores[index]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.minusButton} activeOpacity={0.8} onPress={() => handleDecrement(index)}>
                <Text style={styles.minusText}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.backRow}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E6E6E6',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 40, height: 40, marginRight: 8 },
  appName: { fontSize: 24, fontWeight: '600', color: '#333' },
  gameName: { fontSize: 18, fontWeight: '500', color: '#00AEEF' },
  mainRow: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  sideColumn: { width: 120, alignItems: 'center', gap: 12 },
  scoreBlock: { alignItems: 'center', gap: 8 },
  scoreCircle: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  minusButton: { marginTop: 6, width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#333', alignItems: 'center', justifyContent: 'center' },
  minusText: { fontSize: 22, fontWeight: '800', color: '#333' },
  centerArea: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  promptBlock: { marginBottom: 12 },
  promptText: { fontSize: 22, fontWeight: '800', textAlign: 'center', color: '#333' },
  itemsBlock: { gap: 6 },
  itemText: { fontSize: 18, color: '#333' },
  answerBlock: { marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  answerTitle: { fontSize: 18, fontWeight: '800', color: '#00AEEF', marginBottom: 6 },
  answerItem: { fontSize: 16, color: '#333' },
  backRow: { alignItems: 'center', marginBottom: 16 },
  backText: { fontSize: 18, fontWeight: '600', color: '#00AEEF' },
});

import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';
import { getEmojiSlidesForLevel, getEmojiThemeForLevel } from './data/emojiLevels';

export default function EmojiGameScreen() {
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
  const gameName = typeof game === 'string' ? game : 'Emoji Guess That';
  const levelNumber = level ? Number(level) : 1;

  const slides = useMemo(() => getEmojiSlidesForLevel(levelNumber), [levelNumber]);
  const theme = useMemo(() => getEmojiThemeForLevel(levelNumber), [levelNumber]);

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
      <Header isGameScreen gameName={gameName} />

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
          <Text style={styles.emojiText}>{current.emojis}</Text>
          <Text style={styles.answerText}>{showAnswer ? current.answer : ' '}</Text>
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

      {/* Back button removed per request */}
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
  centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  emojiText: { fontSize: 64, textAlign: 'center' },
  answerText: { fontSize: 28, marginTop: 16, color: '#333', textAlign: 'center' },
  
});

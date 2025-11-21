import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getAnagramThemeForLevel, getAnagramWordsForLevel } from './data/anagramsLevels';

function scrambleWord(word: string): string {
  const chars = word.replace(/\s+/g, '').split('');
  // Fisher-Yates shuffle
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  // Insert random spaces every 3-4 characters on average
  const result: string[] = [];
  let countSinceSpace = 0;
  chars.forEach((ch, index) => {
    result.push(ch.toUpperCase());
    countSinceSpace += 1;
    const remaining = chars.length - index - 1;
    if (remaining > 0 && countSinceSpace >= 3) {
      if (Math.random() < 0.4) {
        result.push(' ');
        countSinceSpace = 0;
      }
    }
  });

  return result.join('').trim();
}

export default function AnagramsGameScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
  const subscription = Dimensions.addEventListener('change', ({ window }) => {
    console.log('Dimensions changed:', window.width, 'x', window.height);
    setDimensions(window);
  });

  const lockOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      console.log('✅ Locked to landscape');
    } catch (error) {
      console.log('❌ Lock failed:', error);
    }
  };
  
  lockOrientation();
  
  return () => {
    subscription?.remove();
    ScreenOrientation.unlockAsync().catch(() => {});
  };
}, []);
  
  const router = useRouter();
  const { game, level, players } = useLocalSearchParams<{
    game?: string;
    level?: string;
    players?: string;
  }>();

  const gameName = typeof game === 'string' ? game : 'Anagrams';
  const levelNumber = level ? Number(level) : 1;
  const playerCount = players ? Number(players) || 2 : 2;

  const allWords = useMemo(() => {
    const fromLevel = getAnagramWordsForLevel(levelNumber);
    return fromLevel.length > 0 ? fromLevel : ['example'];
  }, [levelNumber]);

  const theme = useMemo(() => {
    return getAnagramThemeForLevel(levelNumber);
  }, [levelNumber]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const baseWord = allWords[currentIndex % allWords.length];
  const scrambled = useMemo(() => scrambleWord(baseWord), [baseWord]);

  const [scores, setScores] = useState<number[]>(() =>
    Array.from({ length: Math.min(Math.max(playerCount, 2), 4) }, () => 0),
  );

  const SCORE_COLORS = ['#FF6B8B', '#4CAF50', '#2196F3', '#FFC107'];

  const handleIncrement = (index: number) => {
    setScores((prev) => prev.map((v, i) => (i === index ? v + 1 : v)));
  };

  const handleDecrement = (index: number) => {
    setScores((prev) => prev.map((v, i) => (i === index ? Math.max(0, v - 1) : v)));
  };

  const handleCenterPress = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      setShowAnswer(false);
      setCurrentIndex((prev) => (prev + 1) % allWords.length);
    }
  };

  const visibleScores = scores;

  const leftPlayers: number[] = [];
  const rightPlayers: number[] = [];
  visibleScores.forEach((_, i) => {
    if (i % 2 === 0) leftPlayers.push(i);
    else rightPlayers.push(i);
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image
            source={require('@/assets/images/game-knight-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Game Knight</Text>
        </View>
        <Text style={styles.gameName}>{gameName}</Text>
      </View>

      {/* Main content in a horizontal layout */}
      <View style={styles.mainRow}>
        <View style={styles.sideColumn}>
          {leftPlayers.map((index) => (
            <View key={index} style={styles.scoreBlock}>
              <TouchableOpacity
                style={[styles.scoreCircle, { backgroundColor: SCORE_COLORS[index % SCORE_COLORS.length] }]}
                activeOpacity={0.8}
                onPress={() => handleIncrement(index)}
              >
                <Text style={styles.scoreText}>{visibleScores[index]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.minusButton}
                activeOpacity={0.8}
                onPress={() => handleDecrement(index)}
              >
                <Text style={styles.minusText}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Pressable style={styles.centerArea} onPress={handleCenterPress}>
          <Text style={styles.themeText}>{theme}</Text>
          <Text style={styles.wordText}>{showAnswer ? baseWord : scrambled}</Text>
        </Pressable>

        <View style={styles.sideColumn}>
          {rightPlayers.map((index) => (
            <View key={index} style={styles.scoreBlock}>
              <TouchableOpacity
                style={[styles.scoreCircle, { backgroundColor: SCORE_COLORS[index % SCORE_COLORS.length] }]}
                activeOpacity={0.8}
                onPress={() => handleIncrement(index)}
              >
                <Text style={styles.scoreText}>{visibleScores[index]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.minusButton}
                activeOpacity={0.8}
                onPress={() => handleDecrement(index)}
              >
                <Text style={styles.minusText}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Back button */}
      <View style={styles.backRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const SCORE_CIRCLE_SIZE = 96;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
  },
  gameName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00AEEF',
  },
  mainRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideColumn: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  scoreBlock: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: SCORE_CIRCLE_SIZE,
    height: SCORE_CIRCLE_SIZE,
    borderRadius: SCORE_CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE4E8',
  },
  scoreCircleLeft: {
    backgroundColor: '#FFE4E8',
  },
  scoreCircleRight: {
    backgroundColor: '#E6FFE2',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '600',
  },
  minusButton: {
    marginTop: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusText: {
    fontSize: 20,
    fontWeight: '700',
  },
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  wordText: {
    fontSize: 56,
    fontWeight: '700',
    textAlign: 'center',
  },
  backRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
  },
  themeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
    marginBottom: 16,
  },
});

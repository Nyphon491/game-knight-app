import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getTriviaCategoryForLevel, getTriviaQuestionsForLevel } from './data/triviaLevels';

// Conditionally import only on native (not web)
let ExternalDisplay: any = null;
let useExternalDisplay: any = null;

if (Platform.OS !== 'web') {
  const externalDisplayModule = require('react-native-external-display');
  ExternalDisplay = externalDisplayModule.default;
  useExternalDisplay = externalDisplayModule.useExternalDisplay;
}

export default function TriviaGameScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isLandscape, setIsLandscape] = useState(false);
  
  const screens = Platform.OS !== 'web' && useExternalDisplay ? useExternalDisplay({
  onScreenConnect: (screenId: string) => {
    console.log('✅ Screen connected:', screenId);
  },
  onScreenDisconnect: (screenId: string) => {
    console.log('❌ Screen disconnected:', screenId);
  },
  onScreenChange: (screenId: string) => {
    console.log('🔄 Screen changed:', screenId);
  },
}) : {};
  
  const screenKeys = Object.keys(screens || {});
  const targetScreen = screenKeys[0];
  const presenterMode = screenKeys.length > 0;
  
  console.log('📺 Raw screens object:', screens);
  console.log('🔑 Screen keys:', screenKeys);
  console.log('🎯 Target screen:', targetScreen);
  console.log('🎬 Presenter mode:', presenterMode);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      console.log('Dimensions changed:', window.width, 'x', window.height);
      setDimensions(window);
      setIsLandscape(window.width > window.height);
    });
    
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        await new Promise(resolve => setTimeout(resolve, 100));
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        console.log('✅ Locked to landscape');
        const orientation = await ScreenOrientation.getOrientationAsync();
        console.log('Current orientation:', orientation);
        setIsLandscape(dimensions.width > dimensions.height);
      } catch (error) {
        console.log('❌ Lock failed:', error);
      }
    };
    
    lockOrientation();
    
    return () => {
      subscription?.remove();
    };
  }, []);
  
  const router = useRouter();
  const { game, level, players } = useLocalSearchParams<{
    game?: string;
    level?: string;
    players?: string;
  }>();

  const gameName = typeof game === 'string' ? game : 'Common Knowledge Trivia';
  const levelNumber = level ? Number(level) : 1;
  const playerCount = players ? Number(players) || 2 : 2;

  const allQuestions = useMemo(() => {
    const fromLevel = getTriviaQuestionsForLevel(levelNumber);
    return fromLevel.length > 0 ? fromLevel : [{ question: 'Sample question?', answer: 'Sample answer' }];
  }, [levelNumber]);

  const category = useMemo(() => {
    return getTriviaCategoryForLevel(levelNumber);
  }, [levelNumber]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = allQuestions[currentIndex % allQuestions.length];

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
    console.log('🎯 Center pressed! showAnswer:', showAnswer);
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      setShowAnswer(false);
      setCurrentIndex((prev) => (prev + 1) % allQuestions.length);
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
      {/* External Display content (TV) - renders FIRST so it doesn't capture touches */}
      {presenterMode && Platform.OS !== 'web' && ExternalDisplay && (
        <ExternalDisplay 
          fallbackInMainScreen={false} 
          screen={targetScreen}
          pointerEvents="none"  // KEY FIX: Don't capture touch events
        >
          <SafeAreaView style={styles.tvContainer}>
            <View style={styles.tvHeaderRow}>
              <View style={styles.headerLeft}>
                <Image
                  source={require('@/assets/images/game-knight-logo.png')}
                  style={styles.tvLogoImage}
                  resizeMode="contain"
                />
                <Text style={styles.tvAppName}>Game Knight</Text>
              </View>
              <Text style={styles.tvGameName}>{gameName}</Text>
            </View>

            <View style={styles.mainRow}>
              <View style={styles.sideColumn}>
                {leftPlayers.map((index) => (
                  <View key={index} style={styles.scoreBlock}>
                    <View
                      style={[styles.tvScoreCircle, { backgroundColor: SCORE_COLORS[index % SCORE_COLORS.length] }]}
                    >
                      <Text style={styles.tvScoreText}>{visibleScores[index]}</Text>
                    </View>
                    <View style={styles.tvMinusButton}>
                      <Text style={styles.tvMinusText}>-</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.centerArea}>
                <Text style={styles.tvLabelText}>Question:</Text>
                <Text style={styles.tvQuestionText}>{currentQuestion.question}</Text>
                {showAnswer && (
                  <>
                    <View style={{ height: 24 }} />
                    <Text style={styles.tvLabelText}>Answer:</Text>
                    <Text style={styles.tvQuestionText}>{currentQuestion.answer}</Text>
                  </>
                )}
              </View>

              <View style={styles.sideColumn}>
                {rightPlayers.map((index) => (
                  <View key={index} style={styles.scoreBlock}>
                    <View
                      style={[styles.tvScoreCircle, { backgroundColor: SCORE_COLORS[index % SCORE_COLORS.length] }]}
                    >
                      <Text style={styles.tvScoreText}>{visibleScores[index]}</Text>
                    </View>
                    <View style={styles.tvMinusButton}>
                      <Text style={styles.tvMinusText}>-</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.backRow}>
              <Text style={styles.tvBackText}>Back</Text>
            </View>
          </SafeAreaView>
        </ExternalDisplay>
      )}

      {/* Phone Display - Header */}
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

      {/* Phone Display - Main content */}
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
          {presenterMode ? (
            <>
              <Text style={styles.labelText}>Question:</Text>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              <View style={{ height: 16 }} />
              <Text style={styles.labelText}>Answer:</Text>
              <Text style={styles.questionText}>{currentQuestion.answer}</Text>
            </>
          ) : (
            <>
              <Text style={styles.labelText}>{showAnswer ? 'Answer:' : 'Question:'}</Text>
              <Text style={styles.questionText}>
                {showAnswer ? currentQuestion.answer : currentQuestion.question}
              </Text>
            </>
          )}
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

      {/* Phone Display - Back button */}
      <View style={styles.backRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            console.log('Presenter mode:', presenterMode, 'screens:', screenKeys);
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
const TV_SCORE_CIRCLE_SIZE = 140; // Larger for TV

const styles = StyleSheet.create({
  // Phone styles
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
  questionText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
  },
  labelText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00AEEF',
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

  // TV styles (larger text and elements)
  tvContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 24,
  },
  tvHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  tvLogoImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  tvAppName: {
    fontSize: 36,
    fontWeight: '600',
  },
  tvGameName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#00AEEF',
  },
  tvScoreCircle: {
    width: TV_SCORE_CIRCLE_SIZE,
    height: TV_SCORE_CIRCLE_SIZE,
    borderRadius: TV_SCORE_CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tvScoreText: {
    fontSize: 48,
    fontWeight: '600',
  },
  tvMinusButton: {
    marginTop: 6,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tvMinusText: {
    fontSize: 30,
    fontWeight: '700',
  },
  tvQuestionText: {
    fontSize: 52,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
  tvLabelText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#00AEEF',
  },
  tvBackText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#00AEEF',
  },
});
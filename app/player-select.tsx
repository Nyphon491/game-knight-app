import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';

const GAME_PLAYER_OPTIONS: Record<string, number[]> = {
  'Common Knowledge Trivia': [2, 3, 4],
  Anagrams: [2, 3, 4],
  'Flow State': [2, 3],
  'If You Know, You Know': [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  'Audience Meter': [2, 3],
  'Emoji Guess That': [2, 3, 4],
  'Wave Length': [2, 3, 4, 5],
  'Top Boards Feud': [2],
  Password: [2],
  Babble: [2, 3, 4],
  'Head 2 Head Bands': [2, 3],
  'Rank It!': [2, 3, 4],
  Impostor: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  'Wrong Answers Only': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  'Visual Riddles': [2, 3, 4],
  Charades: [2, 3],
  Pictionary: [2, 3],
};

export default function PlayerSelectScreen() {
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();

  const gameName = typeof game === 'string' ? game : '';

  const options = useMemo(() => {
    if (!gameName) return [];
    return GAME_PLAYER_OPTIONS[gameName] ?? [];
  }, [gameName]);

  const [selected, setSelected] = useState<number | null>(null);

  const isNextEnabled = selected != null;

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {gameName ? (
        <Text style={styles.gameName}>{gameName}</Text>
      ) : (
        <Text style={styles.gameName}>Select Game</Text>
      )}

      <View style={styles.questionContainer}>
        <Text style={styles.questionLine}>How Many</Text>
        <Text style={styles.questionLine}>Players / Teams?</Text>
      </View>

      <View style={styles.optionsGrid}>
        {options.map((value) => {
          const isSelected = selected === value;
          return (
            <TouchableOpacity
              key={value}
              style={[styles.optionCircle, isSelected && styles.optionCircleSelected]}
              activeOpacity={0.8}
              onPress={() => setSelected(value)}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
  style={[styles.nextButton, !isNextEnabled && styles.nextButtonDisabled]}
  activeOpacity={isNextEnabled ? 0.8 : 1}
  disabled={!isNextEnabled}
  onPress={() => {
    if (!isNextEnabled || !gameName || selected == null) return;
    router.push({
      pathname: '/level-select',
      params: {
        game: gameName,
        players: String(selected),
      },
    });
  }}
>
  <Text style={styles.nextButtonText}>Next →</Text>
</TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const CIRCLE_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  gameName: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
  },
  questionContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  questionLine: {
    fontSize: 22,
    fontWeight: '700',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 32,
    gap: 20,
  },
  optionCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  optionCircleSelected: {
    backgroundColor: '#000000',
  },
  optionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000000',
  },
  optionTextSelected: {
    color: '#ffffff',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nextButton: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#000000',
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: '#c9c9c9ff',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

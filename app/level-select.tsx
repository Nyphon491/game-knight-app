import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ANAGRAM_LEVELS, getAnagramThemeForLevel } from './data/anagramsLevels';
import { EMOJI_TOTAL_LEVELS, getEmojiThemeForLevel } from './data/emojiLevels';
import { IYKYK_TOTAL_LEVELS } from './data/iykykLevels';
import { RANK_TOTAL_LEVELS, getRankThemeForLevel } from './data/rankItLevels';
import { TRIVIA_LEVELS } from './data/triviaLevels';

import { getPlayedLevels, toggleLevelPlayed } from './state/levelProgress';

export default function LevelSelectScreen() {
  const router = useRouter();
  const { game, players } = useLocalSearchParams<{ game?: string; players?: string }>();

  const gameName = typeof game === 'string' ? game : '';
  const playerCount = typeof players === 'string' ? players : undefined;

  const TOTAL_LEVELS =
    gameName === 'Common Knowledge Trivia'
      ? TRIVIA_LEVELS.length
      : gameName === 'Anagrams'
      ? ANAGRAM_LEVELS.length
      : gameName === 'Emoji Guess That'
      ? EMOJI_TOTAL_LEVELS()
      : gameName === 'Rank It!'
      ? RANK_TOTAL_LEVELS()
      : gameName === 'If You Know, You Know'
      ? IYKYK_TOTAL_LEVELS()
      : 10;

  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [playedLevelsLocal, setPlayedLevelsLocal] = useState<Set<number>>(
    () => new Set(gameName ? getPlayedLevels(gameName) : []),
  );

  const isPlayed = (level: number) => playedLevelsLocal.has(level);

  const handleTogglePlayed = (level: number) => {
    if (!gameName) return;
    const next = new Set(playedLevelsLocal);
    if (next.has(level)) {
      next.delete(level);
    } else {
      next.add(level);
    }
    setPlayedLevelsLocal(next);
    // keep shared session store in sync
    toggleLevelPlayed(gameName, level);
  };

  const levels = useMemo(() => Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1), []);

  const isStartEnabled = selectedLevel != null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.logoTapArea}
          activeOpacity={0.8}
          onPress={() => {
            router.push('/choose-game');
          }}
        >
          <Image
            source={require('@/assets/images/game-knight-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.appName}>Game Knight</Text>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="return-up-back" size={24} color="#00AEEF" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {gameName ? <Text style={styles.gameName}>{gameName}</Text> : null}

          <View style={styles.levelList}>
            {levels.map((level) => {
              const isSelected = selectedLevel === level;
              const played = isPlayed(level);
              return (
                <View key={level} style={styles.levelRow}>
                  <TouchableOpacity
                    style={[styles.levelPill, isSelected && styles.levelPillSelected]}
                    activeOpacity={0.8}
                    onPress={() => {
                      setSelectedLevel((prev) => (prev === level ? null : level));
                    }}
                  >
                    <Text style={[styles.levelText, isSelected && styles.levelTextSelected]}>
                      {gameName === 'Anagrams'
                        ? getAnagramThemeForLevel(level)
                        : gameName === 'Emoji Guess That'
                        ? getEmojiThemeForLevel(level)
                        : gameName === 'Rank It!'
                        ? getRankThemeForLevel(level)
                        : gameName === 'If You Know, You Know'
                        ? `Set ${level}`
                        : `Deck ${level}`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.playedCheckbox, played && styles.playedCheckboxChecked]}
                    activeOpacity={0.8}
                    onPress={() => handleTogglePlayed(level)}
                  >
                    {played ? <Text style={styles.checkmark}>✓</Text> : null}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {isStartEnabled && (
          <View style={styles.bottomSection}>
            <View style={styles.bottomPanel}>
              <TouchableOpacity
                style={styles.startButton}
                activeOpacity={0.8}
                onPress={() => {
                  if (!gameName || selectedLevel == null) return;
                  if (gameName === 'Anagrams') {
                    router.push({
                      pathname: '/anagrams-game',
                      params: {
                        game: gameName,
                        level: String(selectedLevel),
                        players: playerCount ?? '',
                      },
                    });
                  } else if (gameName === 'Common Knowledge Trivia') {
                    router.push({
                      pathname: '/trivia-game',
                      params: {
                        game: gameName,
                        level: String(selectedLevel),
                        players: playerCount ?? '',
                      },
                    });
                  } else if (gameName === 'Emoji Guess That') {
                    router.push({
                      pathname: '/emoji-game',
                      params: {
                        game: gameName,
                        level: String(selectedLevel),
                        players: playerCount ?? '',
                      },
                    });
                  } else if (gameName === 'Rank It!') {
                    router.push({
                      pathname: '/rank-it-game',
                      params: {
                        game: gameName,
                        level: String(selectedLevel),
                        players: playerCount ?? '',
                      },
                    });
                  } else if (gameName === 'If You Know, You Know') {
                    router.push({
                      pathname: '/iykyk-collect',
                      params: {
                        game: gameName,
                        level: String(selectedLevel),
                        players: playerCount ?? '',
                      },
                    });
                  }
                }}
              >
                <Text style={styles.startButtonText}>Start →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const LEVEL_BUTTON_SIZE = 64;
const CHECKBOX_SIZE = 28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingBottom: 12,
  },
  logoTapArea: {
    padding: 4,
    marginRight: 4,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  gameName: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#00AEEF',
  },
  levelList: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  levelPill: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  levelPillSelected: {
    backgroundColor: '#000000',
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  levelTextSelected: {
    color: '#ffffff',
  },
  playedCheckbox: {
    marginLeft: 12,
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: CHECKBOX_SIZE / 2,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  playedCheckboxChecked: {
    borderColor: '#C0C0C0',
    backgroundColor: '#F2F2F2',
  },
  checkmark: {
    fontSize: 18,
    color: '#A0A0A0',
  },
  bottomSection: {
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  bottomPanel: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 30,
    paddingBottom: 4,
    alignItems: 'center',
    // Top-edge shadow over the scrolling content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  startButton: {
    width: '80%',
    paddingVertical: 19,
    borderRadius: 999,
    backgroundColor: '#00AEEF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

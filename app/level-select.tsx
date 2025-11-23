import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';
import { ANAGRAM_LEVELS, getAnagramThemeForLevel } from './data/anagramsLevels';
import { EMOJI_TOTAL_LEVELS, getEmojiThemeForLevel } from './data/emojiLevels';
import { IYKYK_TOTAL_LEVELS } from './data/iykykLevels';
import { RANK_TOTAL_LEVELS, getRankThemeForLevel } from './data/rankItLevels';
import { TRIVIA_LEVELS } from './data/triviaLevels';

import { getPlayedLevels, toggleLevelPlayed } from './state/levelProgress';
import { getPremium } from './state/premium';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [playedLevelsLocal, setPlayedLevelsLocal] = useState<Set<number>>(
    () => new Set(gameName ? getPlayedLevels(gameName) : []),
  );
  const [afterKnightUnlocked, setAfterKnightUnlocked] = useState(getPremium());

  useFocusEffect(
    React.useCallback(() => {
      setAfterKnightUnlocked(getPremium());
      return () => {};
    }, [])
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

  const levels = useMemo(() => Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1), [TOTAL_LEVELS]);

  // Trivia-specific splits
  const triviaGeneralLevels = useMemo(() => {
    if (gameName !== 'Common Knowledge Trivia') return [] as number[];
    return TRIVIA_LEVELS.filter((l) => !l.afterKnight).map((l) => l.level);
  }, [gameName]);

  const triviaAfterKnightLevels = useMemo(() => {
    if (gameName !== 'Common Knowledge Trivia') return [] as number[];
    return TRIVIA_LEVELS.filter((l) => l.afterKnight).map((l) => l.level);
  }, [gameName]);

  const anagramGeneralLevels = useMemo(() => {
    if (gameName !== 'Anagrams') return [] as number[];
    return ANAGRAM_LEVELS.filter((l) => !(l as any).afterKnight).map((l) => l.level);
  }, [gameName]);

  const anagramAfterKnightLevels = useMemo(() => {
    if (gameName !== 'Anagrams') return [] as number[];
    return ANAGRAM_LEVELS.filter((l) => (l as any).afterKnight).map((l) => l.level);
  }, [gameName]);

  // We will render 3 pages:
  // 1) General Levels (levels 1..TOTAL_LEVELS)
  // 2) After Knight Levels (renumbered starting at 1)
  // 3) Player Created Levels (coming soon)

  const isStartEnabled = selectedLevel != null;

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.contentWrapper}>
        {gameName ? <View style={styles.headerContainer}><Text style={styles.gameName}>{gameName}</Text></View> : null}
        <View style={styles.scrollView}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={currentPage !== 2}
          >
            <View style={styles.horizontalPager} onLayout={(e: LayoutChangeEvent) => setPageWidth(e.nativeEvent.layout.width)}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                  const x = e.nativeEvent.contentOffset.x;
                  const w = pageWidth || e.nativeEvent.layoutMeasurement.width;
                  const page = Math.round(x / w);
                  setCurrentPage(page);
                }}
              >
                {/* Page 1: General Levels */}
                <View style={[styles.page, { width: pageWidth || '100%' }]}>
                  <Text style={styles.pageHeader}>General Levels</Text>
                  <View style={styles.levelList}>
                    {(gameName === 'Common Knowledge Trivia'
                      ? triviaGeneralLevels
                      : gameName === 'Anagrams'
                      ? anagramGeneralLevels
                      : levels).map((level) => {
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
                </View>
                {/* Page 2: After Knight Levels (locked until unlocked for Trivia) */}
                <View style={[styles.page, { width: pageWidth || '100%' }]}>
                  <Text style={styles.pageHeader}>After Knight Levels</Text>
                  <View style={styles.levelList}>
                    {(gameName === 'Common Knowledge Trivia'
                      ? triviaAfterKnightLevels
                      : gameName === 'Anagrams'
                      ? anagramAfterKnightLevels
                      : []).map((actualLevel, idx) => {
                      const displayNumber = (gameName === 'Common Knowledge Trivia' || gameName === 'Anagrams') ? idx + 1 : actualLevel;
                      const isSelected = selectedLevel === actualLevel;
                      const played = isPlayed(actualLevel);
                      const disabled = (gameName === 'Common Knowledge Trivia' || gameName === 'Anagrams') && !afterKnightUnlocked;
                      return (
                        <View key={`ak-${actualLevel}`} style={styles.levelRow}>
                          <TouchableOpacity
                            style={[styles.levelPill, isSelected && styles.levelPillSelected, disabled && styles.levelPillDisabled]}
                            activeOpacity={disabled ? 1 : 0.8}
                            onPress={() => {
                              if (disabled) return;
                              setSelectedLevel((prev) => (prev === actualLevel ? null : actualLevel));
                            }}
                          >
                            <Text style={[styles.levelText, isSelected && styles.levelTextSelected]}>
                              {(gameName === 'Common Knowledge Trivia' || gameName === 'Anagrams') ? `After Knight ${displayNumber}` : `Deck ${displayNumber}`}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.playedCheckbox, played && styles.playedCheckboxChecked]}
                            activeOpacity={disabled ? 1 : 0.8}
                            onPress={() => { if (!disabled) handleTogglePlayed(actualLevel); }}
                          >
                            {played ? <Text style={styles.checkmark}>✓</Text> : null}
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                  {(gameName === 'Common Knowledge Trivia' || gameName === 'Anagrams') && !afterKnightUnlocked ? (
                    <View pointerEvents="auto" style={styles.lockOverlay}>
                      <View style={styles.lockCard}>
                        <Ionicons name="lock-closed-outline" size={44} color="#000000" style={styles.lockIcon} />
                        <Text style={styles.lockTitle}>After Knight Locked</Text>
                        <Text style={styles.lockSubtitle}>Become a member to access these levels</Text>
                        <TouchableOpacity
                          style={styles.unlockButton}
                          onPress={() => router.push('/gameknightplus')}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.unlockButtonText}>Game Knight +</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                </View>

                {/* Page 3: Player Created Levels (Coming Soon) */}
                <View style={[styles.page, { width: pageWidth || '100%' }]}>
                  <Text style={styles.pageHeader}>Player Created Levels</Text>
                  <View style={styles.comingSoonContainer}>
                    <Image
                      source={require('../assets/images/game-knight-logo.png')}
                      style={styles.comingSoonImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.comingSoonText}>Coming Soon</Text>
                  </View>
                  {(gameName === 'Common Knowledge Trivia' || gameName === 'Anagrams') && !afterKnightUnlocked ? (
                    <View pointerEvents="auto" style={styles.lockOverlay}>
                      <View style={styles.lockCard}>
                        <Ionicons name="lock-closed-outline" size={44} color="#000000" style={styles.lockIcon} />
                        <Text style={styles.lockTitle}>After Knight Locked</Text>
                        <Text style={styles.lockSubtitle}>Become a member to access these levels</Text>
                        <TouchableOpacity
                          style={styles.unlockButton}
                          onPress={() => router.push('/gameknightplus')}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.unlockButtonText}>Game Knight +</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.bottomPanel}>
            <View style={styles.pageDotsContainer}>
              <View style={[styles.dot, currentPage === 0 && styles.dotActive]} />
              <View style={[styles.dot, currentPage === 1 && styles.dotActive]} />
              <View style={[styles.dot, currentPage === 2 && styles.dotActive]} />
            </View>
            <TouchableOpacity
              style={[
                styles.startButton,
                !isStartEnabled && styles.startButtonDisabled
              ]}
              activeOpacity={isStartEnabled ? 0.8 : 1}
              onPress={() => {
                if (!isStartEnabled || !gameName || selectedLevel == null) return;
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
              disabled={!isStartEnabled}
            >
              <Text style={[
                styles.startButtonText,
                !isStartEnabled && styles.startButtonTextDisabled
              ]}>Start →</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 10,
  },
  contentWrapper: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#ffffff',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  horizontalPager: {
    width: '100%',
  },
  page: {
    flex: 1,
  },
  pageHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 15,
  },
  gameName: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    paddingVertical: 6,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00AEEF',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 15,
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
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
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
  levelPillDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E5E7EB',
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
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: 'center',
  },
  bottomPanel: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 26,
    paddingBottom: 0,
    borderRadius: 24,
    alignItems: 'center',
    // Top-edge shadow over the scrolling content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 6,
  },
  pageDotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#00AEEF',
  },
  comingSoonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 130,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  comingSoonImage: {
    width: '70%',
    height: 160,
    opacity: 0.2,
  },
  comingSoonText: {
    fontSize: 40,
    fontWeight: '300',
    color: '#00AEEF',
    opacity: 0.2,
  },
  startButton: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#000000',
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
  startButtonDisabled: {
    backgroundColor: '#333333',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonTextDisabled: {
    color: '#999999',
  },
  // Lock overlay for After Knight page
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 190,
  },
  lockCard: {
    width: '86%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  lockIcon: {
    marginBottom: 8,
  },
  lockTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827',
  },
  lockSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  unlockButton: {
    marginTop: 6,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    backgroundColor: '#00AEEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  unlockButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

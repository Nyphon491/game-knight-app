import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from './components/Header';
import { GAMES, GameItem } from './data/games';

// Descriptions and icons are now provided per-game in the shared data file

export default function ChooseGame() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const { all } = useLocalSearchParams<{ all?: string }>();
  const isAll = all === '1' || all === 'true';

  const CATEGORY_CHIPS = [
    'Teams',
    'Trending',
    'Puzzles',
    'Close Friends',
    'Pop Culture',
    'Disscussion',
    'Sit in a Circle',
    'After Knight',
  ];

  const toggleChip = (label: string) => {
    setActiveChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const bySearch = (g: GameItem) =>
    searchQuery.trim().length === 0 || g.name.toLowerCase().includes(searchQuery.toLowerCase());
  const byChips = (g: GameItem) =>
    activeChips.length === 0 || activeChips.every((a) => g.attrs.includes(a));

  const filteredGames = GAMES.filter((g) => bySearch(g) && byChips(g));

  const SectionHeader = ({ title, onSeeAll }: { title: string; onSeeAll: () => void }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See All</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGameRow = (game: GameItem & { isLast?: boolean }, index: number, arr: GameItem[]) => (
    <View key={game.name}>
      <TouchableOpacity
        style={styles.rowCard}
        activeOpacity={0.8}
        onPress={() => {
          if (game.name === 'Mafia') {
            router.push({ pathname: '/mafia-settings', params: { game: 'Mafia' } });
          } else if (game.name === 'Random First Letter') {
            router.push({ pathname: '/random-first-letter', params: { game: 'Random First Letter' } });
          } else {
            router.push({ pathname: '/player-select', params: { game: game.name } });
          }
        }}
      >
        <View style={[styles.rowIconBox, { backgroundColor: game.color }]}>
          <MaterialCommunityIcons
            name={(game.icon as any) ?? 'dice-multiple-outline'}
            size={32}
            color="#ffffff"
            style={styles.rowIcon}
          />
        </View>
        <View style={styles.rowContent}>
          <View style={styles.rowHeaderLine}>
            <Text style={styles.rowTitle}>{game.name}</Text>
            <TouchableOpacity
              style={styles.rowInfoButton}
              activeOpacity={0.7}
              onPress={() => setSelectedGame(game.name)}
            >
              <Ionicons name="information-circle-outline" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.rowAttrs}>{game.attrs.join(' • ')}</Text>
        </View>
      </TouchableOpacity>
      {!game.isLast && index < arr.length - 1 && <View style={styles.rowDivider} />}
    </View>
  );

  const handleSuggestGame = () => {
    Linking.openURL('mailto:gameknightshop.info@gmail.com?subject=Game Suggestion&body=I would like to suggest a new game:');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.listScrollContent} showsVerticalScrollIndicator={false}>
          {!isAll && (
            <>
              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search games"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#999"
                  returnKeyType="search"
                />
              </View>

              {/* Category Chips with right fade */}
              <View style={styles.chipsWrapper}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipsRow}
                >
                  {CATEGORY_CHIPS.map((label) => {
                    const active = activeChips.includes(label);
                    return (
                      <TouchableOpacity key={label} style={[styles.chip, active && styles.chipActive]} onPress={() => toggleChip(label)}>
                        <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <LinearGradient
                  pointerEvents="none"
                  colors={["rgba(255,255,255,0)", "#ffffff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.chipsFadeRight}
                />
              </View>
            </>
          )}

          {/* Content */}
          <View style={styles.listSection}>
            {isAll ? (
              <>
                <Text style={styles.sectionTitle}>All Games</Text>
                {GAMES.map((g, i, arr) => renderGameRow(g, i, arr))}
              </>
            ) : searchQuery.trim().length > 0 || activeChips.length > 0 ? (
              filteredGames.map((g, i, arr) => renderGameRow(g, i, arr))
            ) : (
              <>
                <View style={styles.popularSection}>
                  <SectionHeader 
                    title="Most Popular" 
                    onSeeAll={() => router.push({ pathname: '/choose-game', params: { all: '1', filter: 'popular' } })}
                  />
                  {(() => {
                    const popularGames = ['If You Know, You Know', 'Mafia', 'Impostor', 'Visual Riddles']
                      .map((name) => GAMES.find((g) => g.name.toLowerCase() === name.toLowerCase()))
                      .filter((g): g is GameItem => Boolean(g));
                    return popularGames.map((g, i, arr) => renderGameRow({ ...g, isLast: i === arr.length - 1 }, i, arr));
                  })()}
                </View>

                <View style={styles.ourPicksSection}>
                  <SectionHeader 
                    title="Our Picks" 
                    onSeeAll={() => router.push({ pathname: '/choose-game', params: { all: '1', filter: 'picks' } })}
                  />
                </View>
                {['Common Knowledge Trivia', 'Emoji Guess That', 'Password']
                  .map((name) => GAMES.find((g) => g.name.toLowerCase() === name.toLowerCase())!)
                  .filter(Boolean)
                  .map((g, i, arr) => renderGameRow(g, i, arr))}
                <View style={styles.rowDivider} />

                <View style={styles.topDecksSection}>
                  <SectionHeader 
                    title="Top Decks" 
                    onSeeAll={() => router.push({ pathname: '/choose-game', params: { all: '1', filter: 'decks' } })}
                  />
                  {['Babble', 'Top Boards Feud']
                    .map((name) => GAMES.find((g) => g.name.toLowerCase() === name.toLowerCase())!)
                    .filter(Boolean)
                    .map((g, i, arr) => renderGameRow(g, i, arr))}
                </View>

                <TouchableOpacity
                  style={styles.viewAllButton}
                  activeOpacity={0.8}
                  onPress={() => router.push({ pathname: '/choose-game', params: { all: '1' } })}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.suggestGameButton}
                  activeOpacity={0.8}
                  onPress={handleSuggestGame}
                >
                  <Text style={styles.gameButtonText}>Suggest a Game</Text>
                  <MaterialCommunityIcons name="email-outline" size={24} color="#000000" style={styles.suggestGameIcon} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.8}
              onPress={() => {
                router.push('/white-board?game=White Board');
              }}
            >
              <Ionicons name="create-outline" size={24} color="#000000" />
              <Text style={styles.actionLabel}>Draw</Text>
            </TouchableOpacity>

            <View style={styles.actionSpacerSmall} />

            <TouchableOpacity
              style={[styles.actionItem, styles.actionItemMiddle, styles.actionItemTimer]}
              activeOpacity={0.8}
              onPress={() => {
                router.push({ pathname: '/timer', params: { game: 'Timer' } });
              }}
            >
              <Ionicons name="time-outline" size={24} color="#000000" />
              <Text style={styles.actionLabel}>Timer</Text>
            </TouchableOpacity>

            <View style={styles.actionSpacerLarge} />

            <TouchableOpacity
              style={[styles.actionItem, styles.actionItemMiddle, styles.actionItemSpin]}
              activeOpacity={0.8}
              onPress={() => {
                router.push('/wheel-spin?game=Wheel Spin');
              }}
            >
              <Ionicons name="disc-outline" size={24} color="#000000" />
              <Text style={styles.actionLabel}>Spin</Text>
            </TouchableOpacity>

            <View style={styles.actionSpacerSmall} />

            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.8}
              onPress={() => {
                router.push({ pathname: '/rng', params: { game: 'RNG' } });
              }}
            >
              <MaterialCommunityIcons name="dice-multiple-outline" size={24} color="#000000" />
              <Text style={styles.actionLabel}>RNG</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centerNotchWrapper} pointerEvents="box-none">
            <View style={styles.centerNotchBackground} />
            <TouchableOpacity
              style={styles.qrButton}
              activeOpacity={0.8}
              onPress={() => {
                router.push('/qr-code-scanner');
              }}
            >
              <Ionicons name="qr-code" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={selectedGame !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedGame(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedGame}</Text>
            <Text style={styles.modalDescription}>
              {selectedGame ? (GAMES.find(g => g.name === selectedGame)?.description ?? '') : ''}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedGame(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
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
  title: {
    marginTop: 24,
    marginBottom: 16,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  listScrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 14,
    backgroundColor: '#FAFAFA',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  chipsRow: {
    paddingTop: 10,
    gap: 2,
    paddingRight: 40,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 4,
    backgroundColor: '#FFFFFF',
  },
  chipText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  chipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  actionIcon: {
    color: '#000000',
  },
  chipsWrapper: {
    position: 'relative',
  },
  chipsFadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
  },
  gameList: {
    gap: 12,
  },
  listSection: {
    paddingTop: 8,
  },
  popularSection: {
    backgroundColor: '#f0f8ff',
    borderWidth: 0.75,
    borderColor: '#e6e6e6ff',
    borderRadius: 0,
    marginTop: 12,
    marginBottom: 8,
    marginHorizontal: -20,  // Extend beyond container padding
    paddingHorizontal: 20,  // Match container padding + some extra
    paddingTop: 8,
    paddingBottom: 8,
  },
  ourPicksSection: {
    marginTop: 4,  // Reduced from the default 12px
  },
  topDecksSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,  // Increased from 20
    fontWeight: '700',
    textAlign: 'left',
  },
  seeAllText: {
    color: '#00AEEF',
    fontSize: 14,
    fontWeight: '600',
  },
  viewAllButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 12,
    marginBottom: 12,
  },
  viewAllText: {
    color: '#00AEEF',
    fontSize: 16,
    fontWeight: '600',
  },
  // New row list styles
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 0,  // Reduce left padding to move content left
    paddingRight: 8,
  },
  rowIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    opacity: 1, // Background opacity
  },
  rowIcon: {
    opacity: 1, // Icon opacity
  },
  rowContent: {
    flex: 1,
  },
  rowHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  rowInfoButton: {
    padding: 6,
  },
  rowAttrs: {
    marginTop: 4,
    fontSize: 14,
    color: '#555555',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#E9E9E9',
    marginLeft: 68,
  },
  gameButton: {
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  gameButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 8,
  },
  suggestGameIcon: {
    marginLeft: 'auto',
  },
  iconButton: {
    position: 'absolute',
    left: 12,
    top: 8,
    zIndex: 1,
  },
  infoIcon: {
    opacity: 0.7,
  },
  gameIcon: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    opacity: 0.5,
  },
  suggestGameButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 32,
    marginBottom: 16,
  },
  dividerLine: {
    width: '80%',
    height: 1,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007affff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    paddingTop: 0,
    paddingBottom: 10,
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    zIndex: 1,
    
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 8,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginHorizontal: 2,
    height: 50,
  },
  actionItemMiddle: {
    marginHorizontal: 16,
  },
  actionItemTimer: {
    marginRight: 12,
  },
  actionItemSpin: {
    marginLeft: 12,
  },
  actionSpacerSmall: {
    width: 16,
  },
  actionSpacerLarge: {
    width: 56,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#00AEEF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00AEEF',
  },
  centerNotchWrapper: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerNotchBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ecececff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  qrButton: {
    position: 'absolute',
    top: 4,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00AEEF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});

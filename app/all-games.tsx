import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GAMES, GameItem } from './data/games';

const AllGamesScreen = () => {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  const renderGameRow = (game: GameItem, index: number, arr: GameItem[]) => {
    if (!game) return null;
    
    return (
      <React.Fragment key={game.name}>
        <TouchableOpacity
          style={styles.rowCard}
          activeOpacity={0.8}
          onPress={() => {
            if (game.name === 'Common Knowledge Trivia' || game.name === 'Emoji Guess That') {
              router.push({
                pathname: '/player-select',
                params: { game: game.name },
              });
            } else {
              setSelectedGame(game);
            }
          }}
        >
          <View style={[styles.rowIconBox, { backgroundColor: `${game.color}33` }]}>
            <MaterialCommunityIcons name={(game.icon as any) ?? 'dice-multiple-outline'} size={32} color={game.color} style={styles.rowIcon} />
          </View>
          <View style={styles.rowContent}>
            <View style={styles.rowHeaderLine}>
              <Text style={styles.rowTitle}>{game.name}</Text>
              <TouchableOpacity
                style={styles.rowInfoButton}
                onPress={() => setSelectedGame(game)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="information-circle-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {game.attrs && game.attrs.length > 0 && (
              <View style={styles.rowAttrs}>
                {game.attrs.map((attr: string, i: number) => (
                  <Text key={attr} style={styles.rowAttr}>
                    {i > 0 && <Text style={styles.rowDivider}> • </Text>}
                    {attr}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </TouchableOpacity>
        {index < arr.length - 1 && <View style={styles.rowDivider} />}
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Games</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>All Games</Text>
        
        {GAMES.map((game, i, arr) => renderGameRow(game, i, arr))}
        
        <TouchableOpacity
          style={styles.suggestGameButton}
          activeOpacity={0.8}
          onPress={() => {
            // Handle suggest a game
          }}
        >
          <Text style={styles.gameButtonText}>Suggest a Game</Text>
          <MaterialCommunityIcons name="email-outline" size={24} color="#000000" style={styles.suggestGameIcon} />
        </TouchableOpacity>
      </ScrollView>

      {/* Game Info Modal */}
      {selectedGame && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedGame.name}</Text>
            <Text style={styles.modalDescription}>
              {selectedGame.description}
            </Text>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                router.push({
                  pathname: '/player-select',
                  params: { game: selectedGame.name },
                });
                setSelectedGame(null);
              }}
            >
              <Text style={styles.playButtonText}>Play Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedGame(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  rowIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowIcon: {
    opacity: 1,
  },
  rowContent: {
    flex: 1,
  },
  rowHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  rowInfoButton: {
    padding: 4,
  },
  rowAttrs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowAttr: {
    fontSize: 12,
    color: '#666',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
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
    marginTop: 16,
    marginBottom: 32,
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
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AllGamesScreen;

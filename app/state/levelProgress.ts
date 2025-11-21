type GameKey = string;

// Simple in-memory store to track which levels have been played per game.
// This is kept for the lifetime of the app session.
const levelProgress: Record<GameKey, Set<number>> = {};

export function getPlayedLevels(game: GameKey): number[] {
  const set = levelProgress[game];
  if (!set) return [];
  return Array.from(set).sort((a, b) => a - b);
}

export function toggleLevelPlayed(game: GameKey, level: number) {
  if (!levelProgress[game]) {
    levelProgress[game] = new Set<number>();
  }
  const set = levelProgress[game]!;
  if (set.has(level)) {
    set.delete(level);
  } else {
    set.add(level);
  }
}

export function isLevelPlayed(game: GameKey, level: number): boolean {
  const set = levelProgress[game];
  return !!set && set.has(level);
}

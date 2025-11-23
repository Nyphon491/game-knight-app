
export type RootStackParamList = {
  '/(tabs)': undefined;
  '/(tabs)/index': undefined;
  '/(tabs)/explore': undefined;
  '/(tabs)/profile': undefined;
  '/(tabs)/settings': undefined;
  '/choose-game': { all?: string } | undefined;
  '/gameknightplus': undefined;
  '/all-games': { game?: string; players?: string };
  '/anagrams-game': { game: string; level: string; players?: string };
  // Add other routes as needed
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

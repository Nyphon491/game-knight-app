// Shared game data for ChooseGame and AllGames screens

export type GameItem = {
  name: string;
  color: string;
  attrs: string[];
  icon?: string;
  description?: string;
};

export const normalizeAttr = (s: string) => {
  const t = s.trim().toLowerCase();
  if (t.includes('team')) return 'Teams';
  if (t.includes('trend')) return 'Trending';
  if (t.includes('puzz')) return 'Puzzles';
  if (t.includes('close')) return 'Close Friends';
  if (t.includes('pop')) return 'Pop Culture';
  if (t.includes('after')) return 'After Knight';
  if (t.includes('sit') || t.includes('site')) return 'Sit in a Circle';
  if (t.includes('disc')) return 'Disscussion';
  return s;
};

export const COLORS = [
  '#A4262C', '#CA5010', '#8F7034', '#407855',
  '#038387', '#0078d4', '#40587C', '#4052AB',
  '#854085', '#8764BB', '#737373', '#867365'
];

export const GAMES: GameItem[] = [
  {
    name: 'Common Knowledge Trivia',
    color: COLORS[0],
    attrs: ['Teams', 'Pop Culture', 'After Knight'].map(normalizeAttr),
    icon: 'trophy-outline',
    description: 'Test your knowledge with general trivia questions that everyone should know!'
  },
  {
    name: 'Emoji Guess That',
    color: COLORS[1],
    attrs: ['Teams', 'Puzzles'].map(normalizeAttr),
    icon: 'emoticon-outline',
    description: 'Guess the phrase or word represented by emojis!'
  },
  {
    name: 'If You Know, You Know',
    color: COLORS[2],
    attrs: ['Trending', 'Pop Culture'].map(normalizeAttr),
    icon: 'lightbulb-on-outline',
    description: 'Specialized trivia for those in the know - test your niche knowledge!'
  },
  {
    name: 'Mafia',
    color: COLORS[3],
    attrs: ['Teams', 'Social Deduction'].map(normalizeAttr),
    icon: 'account-group-outline',
    description: 'A social deduction game of survival between informed minorities and uninformed majorities.'
  },
  {
    name: 'Impostor',
    color: COLORS[4],
    attrs: ['Teams', 'Social Deduction'].map(normalizeAttr),
    icon: 'account-question-outline',
    description: "Find the imposter among you before it's too late!"
  },
  {
    name: 'Visual Riddles',
    color: COLORS[5],
    attrs: ['Puzzles', 'Visual'].map(normalizeAttr),
    icon: 'image-filter-none',
    description: 'Solve these visual puzzles that will challenge your perception!'
  },
  {
    name: 'Password',
    color: COLORS[6],
    attrs: ['Teams', 'Word Game'].map(normalizeAttr),
    icon: 'form-textbox-password',
    description: 'Give your team the right clues to guess the secret word!'
  },
  {
    name: 'Babble',
    color: COLORS[7],
    attrs: ['Word Game'].map(normalizeAttr),
    icon: 'alphabetical',
    description: 'A fast-paced word game where every second counts!'
  },
  {
    name: 'Top Boards Feud',
    color: COLORS[8],
    attrs: ['Teams', 'Pop Culture'].map(normalizeAttr),
    icon: 'gamepad-variant-outline',
    description: 'Can you guess the top answers in this family feud style game?'
  },
  {
    name: 'Sit in a Circle',
    color: COLORS[9],
    attrs: ['Social', 'Party Game'].map(normalizeAttr),
    icon: 'account-group',
    description: 'A collection of fun party games perfect for groups!'
  },
  {
    name: 'Flow State',
    color: COLORS[2],
    attrs: ['Trending', 'Pop Culture'].map(normalizeAttr),
    icon: 'waveform',
    description: 'Enter a state of focused concentration with this engaging challenge.'
  },
];

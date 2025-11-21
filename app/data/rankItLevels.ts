export type RankSlide = { prompt: string; items: string[]; correctOrder: string[] };
export type RankLevel = { theme: string; slides: RankSlide[] };

const BASE_RANK_LEVELS: RankLevel[] = [
  {
    theme: 'Sports',
    slides: [
      { prompt: 'Most goals in soccer (career)', items: ['Pelé', 'Cristiano Ronaldo', 'Lionel Messi', 'Romário', 'Ferenc Puskás'], correctOrder: ['Cristiano Ronaldo', 'Lionel Messi', 'Pelé', 'Romário', 'Ferenc Puskás'] },
      { prompt: 'Most followers on Instagram', items: ['LeBron James', 'David Beckham', 'Neymar', 'Cristiano Ronaldo', 'Lionel Messi'], correctOrder: ['Cristiano Ronaldo', 'Lionel Messi', 'Neymar', 'LeBron James', 'David Beckham'] },
      { prompt: 'Fastest 100m (men)', items: ['Usain Bolt', 'Tyson Gay', 'Yohan Blake', 'Asafa Powell', 'Justin Gatlin'], correctOrder: ['Usain Bolt', 'Yohan Blake', 'Justin Gatlin', 'Tyson Gay', 'Asafa Powell'] },
      { prompt: 'Most NBA titles (teams)', items: ['Bulls', 'Warriors', 'Lakers', 'Celtics', 'Spurs'], correctOrder: ['Celtics', 'Lakers', 'Warriors', 'Bulls', 'Spurs'] },
      { prompt: 'Most Grand Slams (tennis, men)', items: ['Nadal', 'Federer', 'Djokovic', 'Murray', 'Wawrinka'], correctOrder: ['Djokovic', 'Nadal', 'Federer', 'Murray', 'Wawrinka'] },
    ],
  },
  {
    theme: 'Geography',
    slides: [
      { prompt: 'Largest countries by area', items: ['Russia', 'Canada', 'China', 'USA', 'Brazil'], correctOrder: ['Russia', 'Canada', 'USA', 'China', 'Brazil'] },
      { prompt: 'Most populous cities', items: ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mexico City'], correctOrder: ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mexico City'] },
      { prompt: 'Longest rivers', items: ['Nile', 'Amazon', 'Yangtze', 'Mississippi', 'Yellow River'], correctOrder: ['Nile', 'Amazon', 'Yangtze', 'Mississippi', 'Yellow River'] },
      { prompt: 'Highest mountains', items: ['K2', 'Everest', 'Kangchenjunga', 'Lhotse', 'Makalu'], correctOrder: ['Everest', 'K2', 'Kangchenjunga', 'Lhotse', 'Makalu'] },
      { prompt: 'Largest lakes', items: ['Caspian Sea', 'Superior', 'Victoria', 'Huron', 'Michigan'], correctOrder: ['Caspian Sea', 'Superior', 'Victoria', 'Huron', 'Michigan'] },
    ],
  },
];

export const RANK_IT_LEVELS: RankLevel[] = Array.from({ length: 20 }, (_, i) => {
  const src = BASE_RANK_LEVELS[i % BASE_RANK_LEVELS.length];
  return {
    theme: `${src.theme} ${Math.floor(i / BASE_RANK_LEVELS.length) + 1}`,
    slides: src.slides,
  };
});

export const getRankThemeForLevel = (level: number) => {
  const idx = (level - 1) % RANK_IT_LEVELS.length;
  return RANK_IT_LEVELS[idx].theme;
};

export const getRankSlidesForLevel = (level: number) => {
  const idx = (level - 1) % RANK_IT_LEVELS.length;
  return RANK_IT_LEVELS[idx].slides;
};

export const RANK_TOTAL_LEVELS = () => RANK_IT_LEVELS.length;

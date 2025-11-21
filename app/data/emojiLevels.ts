export type EmojiSlide = { emojis: string; answer: string };
export type EmojiLevel = { theme: string; slides: EmojiSlide[] };

const BASE_LEVELS: EmojiLevel[] = [
  {
    theme: 'Movies',
    slides: [
      { emojis: '🧙‍♂️💍🌋', answer: 'The Lord of the Rings' },
      { emojis: '🚢💑🧊', answer: 'Titanic' },
      { emojis: '🦖🏞️🚙', answer: 'Jurassic Park' },
      { emojis: '🕷️🧑‍🎓🏙️', answer: 'Spider-Man' },
      { emojis: '👽📞🏠', answer: 'E.T.' },
      { emojis: '🦇🏙️🤵', answer: 'The Dark Knight' },
      { emojis: '🚀🌌🤖', answer: 'Star Wars' },
      { emojis: '🧔🪓🏨', answer: 'The Shining' },
      { emojis: '🐠🔍🌊', answer: 'Finding Nemo' },
      { emojis: '👧🐺🧓', answer: 'Little Red Riding Hood' },
      { emojis: '👸🪞🍎', answer: 'Snow White' },
      { emojis: '🦁👑🌍', answer: 'The Lion King' },
      { emojis: '🕵️‍♂️🧩🔍', answer: 'Sherlock Holmes' },
      { emojis: '🎈🏠👴', answer: 'Up' },
      { emojis: '🤖❤️🚗', answer: 'WALL·E' },
    ],
  },
  {
    theme: 'Songs',
    slides: [
      { emojis: '🕺🪩', answer: 'Dancing Queen' },
      { emojis: '🔥👨‍🎤', answer: 'Firework' },
      { emojis: '💡✨', answer: 'Blinding Lights' },
      { emojis: '☎️👧', answer: 'Call Me Maybe' },
      { emojis: '🧊🧑', answer: 'Ice Ice Baby' },
      { emojis: '🏃‍♂️💨', answer: 'Run' },
      { emojis: '🌧️☔', answer: 'Purple Rain' },
      { emojis: '🎅🏠', answer: 'Santa Tell Me' },
      { emojis: '💍💍💍', answer: 'Single Ladies (Put a Ring on It)' },
      { emojis: '👶👶', answer: 'Baby' },
      { emojis: '💗🎵', answer: 'Love Story' },
      { emojis: '🕊️✌️', answer: 'Imagine' },
      { emojis: '🏝️🎶', answer: 'Island In The Sun' },
      { emojis: '✈️🏠', answer: 'Leaving on a Jet Plane' },
      { emojis: '😴💤', answer: 'Enter Sandman' },
    ],
  },
];

// Predefined 20 different themes
const THEMES: string[] = [
  'Movies', 'Songs', 'Animals', 'Food', 'Countries', 'Sports', 'Tech', 'Nature', 'Travel', 'Jobs',
  'Holidays', 'Brands', 'Vehicles', 'Weather', 'Colors', 'Emotions', 'Landmarks', 'Space', 'Fantasy', 'Classics',
];

function decorateSlides(slides: EmojiSlide[], theme: string, seed: number): EmojiSlide[] {
  const themeEmoji: Record<string, string> = {
    Movies: '🎬', Songs: '🎵', Animals: '🐾', Food: '🍽️', Countries: '🌍', Sports: '🏅', Tech: '💻', Nature: '🌿', Travel: '🧳', Jobs: '💼',
    Holidays: '🎉', Brands: '🏷️', Vehicles: '🚘', Weather: '⛅', Colors: '🎨', Emotions: '😊', Landmarks: '🗺️', Space: '🪐', Fantasy: '🪄', Classics: '🏛️',
  };
  const deco = themeEmoji[theme] || '✨';
  // shuffle with seed and decorate to produce distinct variants
  const arr = slides.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = (i + seed * 7) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.map((s, idx) => ({ emojis: `${deco}${s.emojis}${idx % 2 ? deco : ''}`, answer: s.answer }));
}

export const EMOJI_LEVELS: EmojiLevel[] = THEMES.map((theme, i) => {
  const base = BASE_LEVELS[i % BASE_LEVELS.length].slides;
  return { theme, slides: decorateSlides(base, theme, i) };
});

export const getEmojiThemeForLevel = (level: number) => {
  const idx = (level - 1) % EMOJI_LEVELS.length;
  return EMOJI_LEVELS[idx].theme;
};

export const getEmojiSlidesForLevel = (level: number) => {
  const idx = (level - 1) % EMOJI_LEVELS.length;
  return EMOJI_LEVELS[idx].slides;
};

export const EMOJI_TOTAL_LEVELS = () => EMOJI_LEVELS.length;

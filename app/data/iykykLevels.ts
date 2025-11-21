export type IykykLevel = { name: string; questions: string[] };

const BASE_PROMPTS: string[] = [
  'What is the first thing you do in the morning?',
  'What is your favorite exercise?',
  'What snack do you always buy?',
  'What time do you usually go to bed?',
  'What is your go-to coffee/tea order?',
  'What song do you listen to on repeat lately?',
  'What is your weekend ritual?',
  'What is a hobby you wish you had more time for?',
  'What app do you open first each day?',
  'What is your favorite breakfast?',
  'What is your favorite way to relax?',
  'What chore do you dislike the most?',
  'What is a movie you rewatch often?',
  'What is your comfort TV show?',
  'What is your favorite cuisine?',
  'What is your favorite dessert?',
  'What is your dream travel destination?',
  'What is your most-used emoji?',
  'What is your favorite season?',
  'What is your favorite board game?',
  'What is your current phone wallpaper?',
  'What is your favorite smell?',
  'What is a talent you have?',
  'What is a talent you want?',
  'What is your least favorite food?',
  'What time of day are you most productive?',
  'What is your favorite outdoor activity?',
  'What is your favorite indoor activity?',
  'What is your favorite pizza topping?',
  'What is your go-to karaoke song?',
  'What is a routine you never skip?',
  'What is your favorite footwear?',
  'What is your favorite drink?',
  'What is your favorite social media platform?',
  'What is your favorite type of weather?',
  'What is your favorite ice cream flavor?',
  'What is your favorite snack combo?',
  'What is your favorite fruit?',
  'What is your favorite vegetable?',
  'What is your favorite holiday?',
  'What is your favorite book genre?',
  'What is a skill you’re learning?',
  'What is your current obsession?',
  'What is your morning beverage?',
  'What is your evening wind-down?',
  'What is your favorite workout music?',
  'What is your favorite sandwich?',
  'What is your favorite way to commute?',
  'What is your favorite plant?',
  'What is your favorite breakfast cereal?',
  'What is your favorite tech gadget?',
  'What is your favorite podcast topic?',
  'What is your favorite time of year?',
  'What is your favorite city you’ve visited?',
  'What is your favorite soup?',
  'What is your favorite sauce?',
  'What is a habit you’re proud of?',
  'What is your screen time like?',
  'What is a goal you’re working on?',
  'What is your favorite way to learn?',
  'What is your favorite candy?',
  'What is your favorite cereal topping?',
  'What is your favorite midnight snack?',
];

const LEVEL_COUNT = 20;
const PER_LEVEL = 28;

export const IYKYK_LEVELS: IykykLevel[] = Array.from({ length: LEVEL_COUNT }, (_, i) => {
  const offset = (i * PER_LEVEL) % BASE_PROMPTS.length;
  const questions: string[] = [];
  for (let j = 0; j < PER_LEVEL; j += 1) {
    const idx = (offset + j) % BASE_PROMPTS.length;
    questions.push(BASE_PROMPTS[idx]);
  }
  return { name: `Set ${i + 1}`, questions };
});

export const getIykykNameForLevel = (level: number) => IYKYK_LEVELS[(level - 1) % IYKYK_LEVELS.length].name;
export const getIykykQuestionsForLevel = (level: number) => IYKYK_LEVELS[(level - 1) % IYKYK_LEVELS.length].questions;
export const IYKYK_TOTAL_LEVELS = () => IYKYK_LEVELS.length;

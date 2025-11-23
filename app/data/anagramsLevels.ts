export type AnagramLevel = {
  level: number;
  theme: string;
  words: string[];
  afterKnight?: boolean;
};

export const ANAGRAM_LEVELS: AnagramLevel[] = [
  {
    level: 1,
    theme: "Fruits",
    words: [
      "APPLE", "BANANA", "ORANGE", "GRAPE", "MANGO",
      "PINEAPPLE", "STRAWBERRY", "WATERMELON", "BLUEBERRY", "RASPBERRY",
      "KIWI", "PEACH", "CHERRY", "LEMON", "PAPAYA"
    ]
  },
  {
    level: 2,
    theme: "Cars",
    words: [
      "FERRARI", "PORSCHE", "LAMBORGHINI", "TESLA", "MUSTANG",
      "CORVETTE", "CAMARO", "BUGATTI", "MCLAREN", "ASTON MARTIN",
      "JAGUAR", "BENTLEY", "MASERATI", "LOTUS", "KOENIGSEGG"
    ]
  },
  {
    level: 3,
    theme: "Colors",
    words: [
      "RED", "BLUE", "GREEN", "YELLOW", "PURPLE",
      "ORANGE", "PINK", "TURQUOISE", "MAGENTA", "CRIMSON",
      "VIOLET", "INDIGO", "SCARLET", "EMERALD", "SAPPHIRE"
    ]
  },
  {
    level: 4,
    theme: "Animals",
    words: [
      "ELEPHANT", "GIRAFFE", "RHINOCEROS", "HIPPOPOTAMUS", "CHEETAH",
      "LEOPARD", "KANGAROO", "PENGUIN", "DOLPHIN", "OCTOPUS",
      "BUTTERFLY", "DRAGONFLY", "FLAMINGO", "PEACOCK", "CHAMELEON"
    ]
  },
  {
    level: 5,
    theme: "Countries",
    words: [
      "AUSTRALIA", "ARGENTINA", "SWITZERLAND", "NETHERLANDS", "PHILIPPINES",
      "INDONESIA", "THAILAND", "MALAYSIA", "SINGAPORE", "PORTUGAL",
      "VENEZUELA", "COLOMBIA", "ETHIOPIA", "MADAGASCAR", "GUATEMALA"
    ]
  },
  {
    level: 6,
    theme: "Sports",
    words: [
      "BASKETBALL", "FOOTBALL", "VOLLEYBALL", "BADMINTON", "CRICKET",
      "BASEBALL", "SWIMMING", "GYMNASTICS", "WRESTLING", "ARCHERY",
      "FENCING", "ROWING", "CYCLING", "MARATHON", "TRIATHLON"
    ]
  },
  {
    level: 7,
    theme: "Instruments",
    words: [
      "PIANO", "GUITAR", "VIOLIN", "SAXOPHONE", "TRUMPET",
      "CLARINET", "TROMBONE", "HARMONICA", "ACCORDION", "XYLOPHONE",
      "TAMBOURINE", "MARACAS", "UKULELE", "BANJO", "MANDOLIN"
    ]
  },
  {
    level: 8,
    theme: "Food",
    words: [
      "SPAGHETTI", "LASAGNA", "BURRITO", "QUESADILLA", "ENCHILADA",
      "CROISSANT", "BAGUETTE", "HAMBURGER", "SANDWICH", "PANCAKE",
      "WAFFLE", "PRETZEL", "DUMPLING", "RAVIOLI", "MACARONI"
    ]
  },
  {
    level: 9,
    theme: "Ocean Life",
    words: [
      "WHALE", "SHARK", "DOLPHIN", "OCTOPUS", "JELLYFISH",
      "SEAHORSE", "STARFISH", "CLOWNFISH", "SWORDFISH", "BARRACUDA",
      "STINGRAY", "MANATEE", "WALRUS", "PENGUIN", "SEAL"
    ]
  },
  {
    level: 10,
    theme: "Weather",
    words: [
      "THUNDER", "LIGHTNING", "HURRICANE", "TORNADO", "BLIZZARD",
      "RAINBOW", "SUNSHINE", "DRIZZLE", "SNOWFLAKE", "HAILSTONE",
      "AVALANCHE", "MONSOON", "CYCLONE", "TYPHOON", "FORECAST"
    ]
  },
  {
    level: 11,
    theme: "Space",
    words: [
      "GALAXY", "PLANET", "METEOR", "ASTEROID", "COMET",
      "NEBULA", "SUPERNOVA", "SATELLITE", "TELESCOPE", "ASTRONAUT",
      "MOONLIGHT", "STARLIGHT", "UNIVERSE", "CONSTELLATION", "ECLIPSE"
    ]
  },
  {
    level: 12,
    theme: "Technology",
    words: [
      "COMPUTER", "SMARTPHONE", "KEYBOARD", "MONITOR", "PROCESSOR",
      "ALGORITHM", "DATABASE", "SOFTWARE", "HARDWARE", "INTERNET",
      "BLUETOOTH", "DOWNLOAD", "UPLOAD", "PASSWORD", "FIREWALL"
    ]
  },
  {
    level: 13,
    theme: "Buildings",
    words: [
      "SKYSCRAPER", "CATHEDRAL", "PYRAMID", "LIGHTHOUSE", "CASTLE",
      "MANSION", "COTTAGE", "BUNGALOW", "APARTMENT", "PENTHOUSE",
      "TEMPLE", "MOSQUE", "SYNAGOGUE", "PAGODA", "OBSERVATORY"
    ]
  },
  {
    level: 14,
    theme: "Professions",
    words: [
      "ARCHITECT", "ENGINEER", "SCIENTIST", "PHYSICIAN", "SURGEON",
      "LAWYER", "DETECTIVE", "JOURNALIST", "PHOTOGRAPHER", "ELECTRICIAN",
      "PLUMBER", "CARPENTER", "ASTRONAUT", "VETERINARIAN", "PHARMACIST"
    ]
  },
  {
    level: 15,
    theme: "Nature",
    words: [
      "MOUNTAIN", "VOLCANO", "WATERFALL", "GLACIER", "FOREST",
      "MEADOW", "CANYON", "VALLEY", "PRAIRIE", "TUNDRA",
      "SAVANNA", "RAINFOREST", "DESERT", "SWAMP", "REEF"
    ]
  },
  {
    level: 16,
    theme: "Emotions",
    words: [
      "HAPPINESS", "EXCITEMENT", "SURPRISE", "CONFUSION", "FRUSTRATION",
      "DISAPPOINTMENT", "ENTHUSIASM", "CURIOSITY", "GRATITUDE", "CONFIDENCE",
      "EMBARRASSMENT", "NERVOUSNESS", "JEALOUSY", "COMPASSION", "CONTENTMENT"
    ]
  },
  {
    level: 17,
    theme: "Mythology",
    words: [
      "DRAGON", "PHOENIX", "UNICORN", "GRIFFIN", "CENTAUR",
      "MERMAID", "MINOTAUR", "PEGASUS", "HYDRA", "KRAKEN",
      "BASILISK", "CHIMERA", "SPHINX", "CERBERUS", "VALKYRIE"
    ]
  },
  {
    level: 18,
    theme: "After Knight — Cities",
    afterKnight: true,
    words: [
      "LONDON", "PARIS", "TOKYO", "DUBLIN", "BERLIN",
      "MADRID", "ROME", "VIENNA", "PRAGUE", "OSLO",
      "ZURICH", "LISBON", "ATHENS", "WARSAW", "BUDAPEST"
    ]
  },
  {
    level: 19,
    theme: "After Knight — Technology",
    afterKnight: true,
    words: [
      "QUANTUM", "BLOCKCHAIN", "CYBERSECURITY", "NEURAL", "ROBOTICS",
      "DRONES", "SENSOR", "WEARABLE", "CLOUD", "SERVER",
      "CLIENT", "BROWSER", "STREAMING", "ENCODING", "PAYMENTS"
    ]
  },
  {
    level: 20,
    theme: "After Knight — Animals",
    afterKnight: true,
    words: [
      "PANDA", "LEMUR", "MEERKAT", "BUFFALO", "ANTELOPE",
      "RACCOON", "ARMADILLO", "SQUIRREL", "HAMSTER", "HEDGEHOG",
      "OSTRICH", "EMU", "PLATYPUS", "PORCUPINE", "ALPACA"
    ]
  },
  {
    level: 21,
    theme: "After Knight — Food",
    afterKnight: true,
    words: [
      "SUSHI", "TACOS", "CURRY", "PAELLA", "RISOTTO",
      "GAZPACHO", "FALAFEL", "HUMMUS", "BIBIMBAP", "KIMCHI",
      "RAMEN", "UDON", "QUICHE", "FONDUE", "TIRAMISU"
    ]
  },
  {
    level: 22,
    theme: "After Knight — Space",
    afterKnight: true,
    words: [
      "ORBIT", "APOLLO", "COSMOS", "GALACTIC", "EXOPLANET",
      "ASTRONAUTICS", "ROVER", "LANDER", "BOOSTER", "PAYLOAD",
      "LAUNCHPAD", "STARSHIP", "TELESCOPE", "OBSERVATORY", "ASTEROID"
    ]
  },
  {
    level: 23,
    theme: "After Knight — Music",
    afterKnight: true,
    words: [
      "MELODY", "HARMONY", "RHYTHM", "CHORD", "SCALE",
      "TEMPO", "OCTAVE", "CONCERTO", "SYMPHONY", "OPERA",
      "ARIA", "BALLAD", "CHORUS", "VERSE", "BRIDGE"
    ]
  },
  {
    level: 24,
    theme: "After Knight — Nature",
    afterKnight: true,
    words: [
      "LAGOON", "ESTUARY", "MANGROVE", "HEADLAND", "BUTTE",
      "MESA", "ISTHMUS", "ARCHIPELAGO", "FJORD", "GEYSER",
      "CAVERN", "CANYON", "PLATEAU", "DELTA", "BASIN"
    ]
  },
  {
    level: 25,
    theme: "After Knight — Professions",
    afterKnight: true,
    words: [
      "PROGRAMMER", "DESIGNER", "SCULPTOR", "PASTRYCHEF", "FIREFIGHTER",
      "PARAMEDIC", "BIOCHEMIST", "STATISTICIAN", "ECONOMIST", "THERAPIST",
      "PSYCHOLOGIST", "BARISTA", "FLORIST", "LIBRARIAN", "CURATOR"
    ]
  },
  {
    level: 26,
    theme: "After Knight — Transportation",
    afterKnight: true,
    words: [
      "AIRPLANE", "HELICOPTER", "SUBMARINE", "BICYCLE", "SCOOTER",
      "SKATEBOARD", "TRAM", "SUBWAY", "RAILWAY", "MOTORCYCLE",
      "SPACESHIP", "SHUTTLE", "KAYAK", "CATAMARAN", "DIRIGIBLE"
    ]
  },
  {
    level: 27,
    theme: "After Knight — Mythology",
    afterKnight: true,
    words: [
      "ODIN", "ZEUS", "HERA", "APHRODITE", "ARES",
      "POSEIDON", "HEPHAESTUS", "APOLLO", "ARTEMIS", "DEMETER",
      "HERMES", "DIONYSUS", "HADES", "THOR", "LOKI"
    ]
  }
];

export function getAnagramWordsForLevel(level: number): string[] {
  const entry = ANAGRAM_LEVELS.find((l) => l.level === level);
  return entry ? entry.words : [];
}

export function getAnagramThemeForLevel(level: number): string {
  const entry = ANAGRAM_LEVELS.find((l) => l.level === level);
  return entry ? entry.theme : '';
}
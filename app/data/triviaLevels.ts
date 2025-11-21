export type TriviaLevel = {
  level: number;
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

export const TRIVIA_LEVELS: TriviaLevel[] = [
  {
    level: 1,
    category: "Physics & Science",
    questions: [
      { question: "32.2 ft/s^2 is the value of what fundamental force?", answer: "Gravity" },
      { question: "What animal as a baby is referred to as a kid?", answer: "Goat" },
      { question: "What is the National currency of Germany?", answer: "Euro" },
      { question: "This song becomes number 1 most listened to song every December?", answer: "Mariah Carey: All I Want For Christmas Is You" },
      { question: "0 kelvin or -273 celsius is also known as what temperature?", answer: "Absolute 0" },
      { question: "The Density of something is the ratio of what over what?", answer: "Mass / Volume" },
      { question: "What does AC and DC stand for?", answer: "Alternating Current and Direct Current" },
      { question: "What is the study of plants called?", answer: "Botany" },
      { question: "How many stripes are on the USA flag?", answer: "13" }
    ]
  },
  {
    level: 2,
    category: "General Knowledge",
    questions: [
      { question: "What is the name of non turbulent flow of a liquid?", answer: "Laminar Flow" },
      { question: "What is the only letter that does not show up in any state's name?", answer: "Q" },
      { question: "The flying birdie hit in the game of badminton also goes by what name?", answer: "Shuttlecock" },
      { question: "This catch signal allows the receiving team to get the ball at the location of the catch in American football?", answer: "Fair Catch" },
      { question: "The horizontal bar on the top of a goal in soccer is referred to as?", answer: "Crossbar" },
      { question: "What is the unit of speed planes are typically measured in?", answer: "Knots" },
      { question: "The longest day in a calendar year is called what?", answer: "Solstice" },
      { question: "Which historical figure appears on the 10$ bill?", answer: "Alexander Hamilton" },
      { question: "This biological chemical is responsible for the pigment of human skin?", answer: "Melanin" }
    ]
  },
  {
    level: 3,
    category: "Science & History",
    questions: [
      { question: "The diffusion of water across a semipermeable membrane is known as what process?", answer: "Osmosis" },
      { question: "Veni Vedi vici translates to what phrase made popular by Roman ruler Julius Caesar?", answer: "'I came, I saw, I conquered'" },
      { question: "This Jewish holiday is celebrated by kids when they are considered as crossing into adulthood?", answer: "Bhamitzva" },
      { question: "In sports, having two games back to back in the same day or in subsequent days is sometimes referred to as?", answer: "Double header" },
      { question: "This is the name of the process of removing the husk from the outside of raw corn?", answer: "Shucking" },
      { question: "A 5k is roughly how long in miles?", answer: "3.1 miles" },
      { question: "10^-6 and 10^-9 correspond to what prefixes in measurements?", answer: "Micro and Nano" },
      { question: "Binary is a numerical system with what base number?", answer: "2" },
      { question: "What is the 6th planet from the sun in our solar system?", answer: "Saturn" }
    ]
  },
  {
    level: 4,
    category: "Science & Nature",
    questions: [
      { question: "The conventional rainbow includes how many colors?", answer: "7" },
      { question: "What blood type is considered the universal Donor?", answer: "O Negative" },
      { question: "The Big Dipper is a constellation made up out of how many stars?", answer: "7" },
      { question: "What is the envelope of gasses surrounding the earth or another planet", answer: "Atmosphere" },
      { question: "What singer/songwriter is most known for their hit songs 'Yeah' and 'OMG'?", answer: "Usher" },
      { question: "This mission was the first manned mission to the moon?", answer: "Apollo 11" },
      { question: "What national holiday was added most recently?", answer: "Juneteenth" },
      { question: "The tune of 'Twinkle Twinkle Little Star' was composed by who?", answer: "Mozart" },
      { question: "This 19th century artist cut off his own ear?", answer: "Vincent Van Gogh" }
    ]
  },
  {
    level: 5,
    category: "History & Culture",
    questions: [
      { question: "This period of time was a period of European cultural, artistic, political and economic 'rebirth' following the Middle Ages?", answer: "Renaissance" },
      { question: "One side of a boat is called the starboard side, what is the other side called?", answer: "Port side" },
      { question: "Beans, lentils, and peas are all what type of plant?", answer: "Legumes" },
      { question: "This female scientist was the first girl to win a Nobel prize for her discovery of two elements?", answer: "Marie Curie" },
      { question: "The largest desert in the world is on what continent?", answer: "The Antarctic Polar Desert" },
      { question: "Neon, Argon, and Krypton, among others, are what types of gasses?", answer: "Noble Gas" },
      { question: "A second full moon to appear in the same calendar month is referred to as?", answer: "Blue Moon" },
      { question: "This move in chess allows the king to pass by the rook on either the king or queen side?", answer: "Castleling" },
      { question: "Who was the first American track and field athlete to win four gold medals at a single Olympic Games?", answer: "Jesse Owens" }
    ]
  },
  {
    level: 6,
    category: "History & Food",
    questions: [
      { question: "What is another name for the day (June 6, 1944) in World War II on which Allied forces invaded northern France by means of beach landings in Normandy", answer: "D-Day" },
      { question: "This master chef is best known for his abusive remarks about other rookie chef's works?", answer: "Gordon Ramsay" },
      { question: "What is a long high sea wave caused by an earthquake?", answer: "Tsunami" },
      { question: "What is a chemical bond that involves the sharing of electrons to form electron pairs between atoms?", answer: "Covalent Bond" },
      { question: "What is the name of the equation a^2 + b^2 = c^2?", answer: "Pythagorean Theorem" },
      { question: "What is a winged divine stallion, usually depicted as pure white in Greek mythology?", answer: "Pegasus" },
      { question: "This series of games first occurred in 776 BC and now happens every four years with the summer and winter versions occurring every two?", answer: "Olympics" },
      { question: "This program run by the United States Marine Corps Reserve, distributes toys to children whose parents cannot afford to buy them gifts for Christmas?", answer: "Toys for Tots" },
      { question: "What is a sugar-rich liquid produced by plants in glands?", answer: "Nectar" }
    ]
  },
  {
    level: 7,
    category: "Geography & Nature",
    questions: [
      { question: "This country has the most lakes in the world, totalling 879,800?", answer: "Canada" },
      { question: "The house dog, also known as a man's best friend, are descendants from what animal?", answer: "Wolves" },
      { question: "Which two states in the US do not observe the tradition of daylight savings?", answer: "Hawaii and Arizona" },
      { question: "This is a region in the western part of the North Atlantic Ocean and is also known as the Devil's Triangle?", answer: "The Bermuda Triangle" },
      { question: "What is the largest organ in the human body?", answer: "Skin" },
      { question: "What is the name of the famous speech made by Martin Luther King Jr. in Washington D.C. in 1963?", answer: "I Have a Dream" },
      { question: "What is the name of the document that established the basic principles of democracy in the United States?", answer: "The Constitution" },
      { question: "What is the most abundant gas in the Earth's atmosphere?", answer: "Nitrogen" },
      { question: "What is the name of the largest ocean in the world?", answer: "The Pacific Ocean" }
    ]
  },
  {
    level: 8,
    category: "Arts & Literature",
    questions: [
      { question: "What is the name of the smallest country in the world by land area?", answer: "Vatican City" },
      { question: "What is the name of the famous Greek epic poem about the journey of Odysseus?", answer: "The Odyssey" },
      { question: "What is the name of the famous Renaissance artist known for his paintings of the Sistine Chapel ceiling?", answer: "Michelangelo" },
      { question: "What is the term for the study of the relationships between organisms and their environment?", answer: "Ecology" },
      { question: "What is the name of the idea that states that the universe began as a singularity, and has been expanding since then?", answer: "Big Bang Theory" },
      { question: "Who was the first U.S. president to be impeached?", answer: "Andrew Johnson" },
      { question: "Pluto is now considered what kind of planet?", answer: "Dwarf Planet" },
      { question: "This US state is the only state to have a non-rectangular flag shape?", answer: "Ohio" },
      { question: "This movie was the first movie to be made in color?", answer: "The Wizard of Oz" }
    ]
  },
  {
    level: 9,
    category: "Food & Geography",
    questions: [
      { question: "What two fruits are often mistaken as vegetables?", answer: "Tomatoes and Avocados" },
      { question: "What percent of an adult's body is water?", answer: "70%" },
      { question: "French Fries are actually from what European nation?", answer: "Belgium" },
      { question: "This color is the most popular car color?", answer: "White" },
      { question: "What state has the longest coastline in the US?", answer: "Alaska" },
      { question: "How tall was Abraham Lincoln?", answer: "6,4" },
      { question: "What is the longest-running animated television show?", answer: "The Simpsons" },
      { question: "Which is the longest bone in the body?", answer: "Femur" },
      { question: "How many elements are in the periodic table?", answer: "188" }
    ]
  },
  {
    level: 10,
    category: "Technology & Pop Culture",
    questions: [
      { question: "When was the first Iphone released?", answer: "2007" },
      { question: "Doc, Sleepy, Dopey, Happy, Bashful, and Sneezy are the names of 6 of the 7 dwarfs, who is the 7th?", answer: "Grumpy" },
      { question: "How many rings are in the Olympic games?", answer: "5" },
      { question: "Optics is a branch of physics that studies what?", answer: "Light" },
      { question: "Animals that sleep during the day and are awake at night are called what?", answer: "Nocturnal" },
      { question: "When texting, what does the abbreviation BRB stand for?", answer: "Be Right Back" },
      { question: "Which country is both an island and a continent?", answer: "Australia" },
      { question: "Which country is known for inventing the sport of cricket?", answer: "England" },
      { question: "Who played the role of Jack Dawson in the movie 'Titanic'?", answer: "Leonardo DiCaprio" }
    ]
  },
  {
    level: 11,
    category: "Entertainment & Sports",
    questions: [
      { question: "What is the name of the fictional wizarding sport played on broomsticks in the 'Harry Potter' series?", answer: "Quidditch" },
      { question: "What is the iconic dance move associated with Michael Jackson?", answer: "The Moonwalk" },
      { question: "Which famous singer is often referred to as the 'Material Girl'?", answer: "Madonna" },
      { question: "What is the highest score achievable in a single game of bowling?", answer: "300" },
      { question: "Which American state is known as the 'Sunshine State'?", answer: "Florida" },
      { question: "What is the classification for the primary ingredient in beer?", answer: "Grain" },
      { question: "What is the term for a course that is not required but chosen by a student according to their interests?", answer: "Elective" },
      { question: "What is the name of the Italian plumber who is the main character of Nintendo's iconic game series?", answer: "Mario" },
      { question: "What does ROI stand for?", answer: "Return on investment" }
    ]
  },
  {
    level: 12,
    category: "Geography & Culture",
    questions: [
      { question: "Which iconic monument in South Dakota features the faces of four U.S. Presidents?", answer: "Mount Rushmore" },
      { question: "Which game series features the catchphrase 'Gotta catch 'em all'?", answer: "Pokemon" },
      { question: "What is the field of work that involves designing and creating buildings and structures?", answer: "Architecture" },
      { question: "In golf, what is the term for completing a hole in one stroke under par?", answer: "Birdie" },
      { question: "What is the national bird of the United States?", answer: "The Bald Eagle" },
      { question: "What is the national drink of Russia?", answer: "Vodka" },
      { question: "What is the name of the video game console released by Sony in 1994?", answer: "PlayStation" },
      { question: "Who holds the record for the most Olympic gold medals?", answer: "Michael Phelps" },
      { question: "What is the term for a traditional Scottish garment that consists of a patterned skirt and a belt?", answer: "Kilt" }
    ]
  },
  {
    level: 13,
    category: "Sports & Games",
    questions: [
      { question: "What is the term for a sudden death period at the end of many sports?", answer: "Overtime" },
      { question: "Which fruit is the main ingredient in the drink 'pina colada'?", answer: "Pineapple" },
      { question: "What is the diameter of a basketball hoop in inches?", answer: "18" },
      { question: "Which planet is known as the 'Red Planet'?", answer: "Mars" },
      { question: "Which game is known for its blocky graphics and survival gameplay, involving crafting and building structures?", answer: "Minecraft" },
      { question: "Which tennis player is known as the 'King of Clay'?", answer: "Rafael Nadal" },
      { question: "Suppose you have 5 dollars in quarters, how many quarters do you have?", answer: "20" },
      { question: "What do you call a relative that lived in the past?", answer: "An Ancestor" },
      { question: "Which legendary boxer is known for his catchphrase 'Float like a butterfly, sting like a bee'?", answer: "Muhammad Ali" }
    ]
  },
  {
    level: 14,
    category: "Science & Geography",
    questions: [
      { question: "What percent of earth's surface is water?", answer: "70%" },
      { question: "What is the name of Disney's mascot, often featured in the opening sequence of their films?", answer: "Mickey Mouse" },
      { question: "What is the maximum score achievable with a single throw of a dart in the game of darts?", answer: "60 (Triple 20)" },
      { question: "Hundreds of millions of years ago the earth was a giant single landmass called what?", answer: "Pangea" },
      { question: "What does the DC stand for in Washington DC?", answer: "District of Columbia" },
      { question: "What is the edible fungi that comes in various shapes, sizes, and flavors and is often used in cooking?", answer: "Mushrooms" },
      { question: "What is the smallest prime number?", answer: "2" },
      { question: "Which hard seltzer did America face a shortage of in 2019?", answer: "White Claw" },
      { question: "What is the Earth's outermost layer called?", answer: "Crust" }
    ]
  },
  {
    level: 15,
    category: "Nature & Science",
    questions: [
      { question: "What is the largest mammal in the world?", answer: "Blue Whale" },
      { question: "What is the cooking technique that involves immersing food in hot oil or fat?", answer: "Frying" },
      { question: "What is the process of converting a liquid into vapor by heating?", answer: "Evaporating" },
      { question: "What is the name of the wooden puppet who dreams of becoming a real boy in Disney's animated film?", answer: "Pinocchio" },
      { question: "What gas do plants absorb from the atmosphere and use in photosynthesis?", answer: "Carbon dioxide" },
      { question: "What is the capital city of Japan?", answer: "Tokyo" },
      { question: "What is the chemical symbol for gold?", answer: "Au" },
      { question: "Who is known as the 'Father of Modern Physics' for his theory of relativity?", answer: "Albert Einstein" },
      { question: "In which country was the game of chess believed to have originated?", answer: "India" }
    ]
  },
  {
    level: 16,
    category: "Arts & Music",
    questions: [
      { question: "What is the national flower of England and the US?", answer: "Rose" },
      { question: "What are the primary colors of light?", answer: "Blue, Red, and Green" },
      { question: "What family of musical instruments includes the flute, clarinet, and saxophone?", answer: "Woodwinds" },
      { question: "What is the main ingredient in traditional Mexican guacamole?", answer: "Avocado" },
      { question: "Which term is used to describe the first year of college or university education?", answer: "Freshman" },
      { question: "Which fabric is commonly used to make jeans?", answer: "Denim" },
      { question: "What is the term for a race in which participants run, swim, and cycle in succession?", answer: "Triathlon" },
      { question: "What is the term for a building designed for astronomical observation and study of the stars and planets?", answer: "Observatory" },
      { question: "What is the primary ingredient in the Middle Eastern dip known as hummus?", answer: "Chickpeas" }
    ]
  },
  {
    level: 17,
    category: "Culture & Technology",
    questions: [
      { question: "In which country can you find the iconic Sydney Opera House, known for its distinctive shell-like architecture?", answer: "Australia" },
      { question: "What is the name of the instrument that produces sound by shaking or striking metal discs or jingles?", answer: "Tambourine" },
      { question: "What is the traditional Japanese garment consisting of a robe with wide sleeves and an obi (belt)?", answer: "Kimono" },
      { question: "In which sport do athletes throw a heavy metal ball for distance, with the longest throw winning?", answer: "Shot Put" },
      { question: "Which mobile messaging app, known for its disappearing messages, was created by Evan Spiegel and Bobby Murphy?", answer: "Snapchat" },
      { question: "What is the term for the first ten amendments to the United States Constitution, which protect individual rights?", answer: "Bill of Rights" },
      { question: "What is the complementary color of yellow?", answer: "Purple" },
      { question: "How many chambers are there in the human heart?", answer: "Four" },
      { question: "Which plant, known for its long, slender leaves and soothing gel, is commonly used for medicinal and cosmetic purposes?", answer: "Aloe Vera" }
    ]
  },
  {
    level: 18,
    category: "History & Music",
    questions: [
      { question: "What stringed instrument is famous for its use in country and bluegrass music and typically has four strings?", answer: "Banjo" },
      { question: "Who was the Roman general and statesman known for his role in the downfall of the Roman Republic and the rise of the Roman Empire?", answer: "Julius Caesar" },
      { question: "Which social media platform, founded by Mark Zuckerberg, was originally launched for college students and later became a global phenomenon?", answer: "Facebook" },
      { question: "Which mobile messaging app, founded by Jan Koum and Brian Acton, was acquired by Facebook in 2014?", answer: "WhatsApp" },
      { question: "What is the medical term for the voice box?", answer: "Larynx" },
      { question: "What is the term for a document that outlines an individual's education, work experience, and skills for job applications?", answer: "Resume/CV" },
      { question: "Which plant, also known as maize, is a staple food crop in many parts of the world and has a variety of uses?", answer: "Corn" },
      { question: "What is the Italian word for 'coffee' and is often used to describe a type of coffee made with steamed milk?", answer: "Cappuccino" },
      { question: "In which country is the government divided into three separate branches: the executive, legislative, and judicial branches?", answer: "United States" }
    ]
  },
  {
    level: 19,
    category: "Entertainment & History",
    questions: [
      { question: "Who is known for the hit songs 'Thriller,' 'Billie Jean,' and 'Beat It'?", answer: "Michael Jackson" },
      { question: "Who was the Egyptian queen known for her romantic relationships with Julius Caesar and Mark Antony?", answer: "Cleopatra" },
      { question: "Which amendment to the U.S. Constitution abolished slavery?", answer: "Thirteenth Amendment" },
      { question: "What is the name of the fictional African country that serves as the setting for the 2018 film 'Black Panther'?", answer: "Wakanda" },
      { question: "What is the name of the woodwind instrument that is often associated with jazz music and has a curved shape?", answer: "Saxophone" },
      { question: "What is the name of the fictional paper company featured in the American version of 'The Office'?", answer: "Dunder Mifflin" },
      { question: "What is the term for a car with a removable or retractable roof, allowing for open-air driving?", answer: "Convertible" },
      { question: "Which TV show, created by Lorne Michaels, is known for its live comedy sketches and celebrity guest hosts?", answer: "'Saturday Night Live' (SNL)" },
      { question: "A single strand of grass is referred to as what?", answer: "A blade" }
    ]
  },
  {
    level: 20,
    category: "Politics & Sports",
    questions: [
      { question: "What is the term for the process of redrawing electoral district boundaries to favor one political party or group?", answer: "Gerrymandering" },
      { question: "Hitting a home run in baseball while the bases are loaded is called what?", answer: "Grand Slam" },
      { question: "Which Japanese automaker produces the popular 'Camry' and 'Corolla' models and is known for its hybrid technology?", answer: "Toyota" },
      { question: "Which musical instrument, commonly associated with Scottish culture, is played by blowing air into it to produce sound?", answer: "Bagpipes" },
      { question: "Similar to how google has spreadsheets, microsoft's table software is called what?", answer: "Excel" },
      { question: "The three axes of an aircraft are pitch, yaw, and what?", answer: "Roll" },
      { question: "What is the name of the personal audio device that you can stroll with in the 80s?", answer: "Walkman" },
      { question: "The People's Republic of China has a bi-color flag. What is the dominant color?", answer: "Red" },
      { question: "Sharks have several rows of teeth and the ability to grow more, how many sets of teeth do humans have?", answer: "2" }
    ]
  },
  {
    level: 21,
    category: "Science & History",
    questions: [
      { question: "The cross section of trees has many rings, what length of time does each of these rings correspond to?", answer: "1 year" },
      { question: "What decade did the US declare its independence?", answer: "1770s" },
      { question: "To determine the force of friction, you need to multiply the normal force times what?", answer: "Coefficient of Friction" },
      { question: "The popular gym franchise 'YMCA' stands for what?", answer: "Young Men's Christian Association" },
      { question: "Glass, among other things, is fairly transparent. What is the opposite of transparent?", answer: "Opaque" },
      { question: "This was a barrier built by East Germany in 1961 to physically and ideologically separate East from West?", answer: "Berlin Wall" },
      { question: "What city is often considered to have the highest concentration of museums in the United States?", answer: "Washington, D.C." },
      { question: "What is the scale of measurement used to classify earthquakes?", answer: "Richter Scale" },
      { question: "This rock band achieved worldwide fame in the 1960s stemming from Liverpool, England?", answer: "The Beatles" }
    ]
  },
  {
    level: 22,
    category: "Science & Sports",
    questions: [
      { question: "GE, the appliance company, stands for what?", answer: "General Electric" },
      { question: "For a right triangle, a squared plus b squared equals?", answer: "C squared" },
      { question: "Light exhibits properties of both particles and what?", answer: "Waves" },
      { question: "Hockey is a game, unlike soccer or football, with how many playing periods?", answer: "3" },
      { question: "This community of US people has a commitment to simple living, rejecting certain modern conveniences and technologies.", answer: "Amish" },
      { question: "In the judicial branch, the supreme court has how many justices?", answer: "9" },
      { question: "What is the largest continent by land area?", answer: "Asia" },
      { question: "What is the property of water that allows a cup to be filled above the brim without spilling?", answer: "Surface tension" },
      { question: "What component of a camera controls the duration of light exposure to the camera's image sensor or film?", answer: "Shutter" }
    ]
  },
  {
    level: 23,
    category: "Sports & Science",
    questions: [
      { question: "Also known as an overhead kick or scissors kick, what is a soccer move where a player kicks the ball while in mid-air?", answer: "Bicycle kick" },
      { question: "What is the derivative of velocity?", answer: "Acceleration" },
      { question: "Nitrile gloves are a common substitute for another type of glove made out of what material that some people are highly allergic to?", answer: "Latex" },
      { question: "Like soccer, what other national American sport has field sizes that vary between teams?", answer: "Baseball" },
      { question: "What is the largest food franchise in the world by number of locations?", answer: "Subway" },
      { question: "The natural log of something has what base number?", answer: "e" },
      { question: "Some museums like the national archives do not allow what is a common feature on most camera phones?", answer: "Flash Photography" },
      { question: "What TV show features an American football coach who takes over a British soccer team, using his positivity and wit to transform the team and those around him?", answer: "Ted Lasso" },
      { question: "What was the name of Microsoft's web browser that was a dominant force in the early days of the internet, before being replaced by Microsoft Edge?", answer: "Internet Explorer" }
    ]
  },
  {
    level: 24,
    category: "Food & Geography",
    questions: [
      { question: "What is the name of the colorful, fruit-flavored cereal that is often associated with the Flintstones?", answer: "Fruity Pebbles" },
      { question: "What is the currency of japan?", answer: "yen" },
      { question: "What is the largest city in australia?", answer: "Melbourne" },
      { question: "What is the hottest planet in our solar system?", answer: "Venus" },
      { question: "Which movie had the highest box office collections in the 2000s?", answer: "Avatar" },
      { question: "Around which museum does the film 'Night At The Museum' revolve?", answer: "The Museum of Natural History." },
      { question: "11 actors have played Batman onscreen. Can you name two (or more!)?", answer: "Robert Pattinson, Ben Affleck, Christian Bale, George Clooney, Val Kilmer, Michael Keaton, Adam West, Robert Lowery, Lewis G. Wilson, Iain Glen, and David Mazouz" },
      { question: "Name a movie that Taylor Swift has acted in", answer: "Valentine's Day, The Lorax, The Giver, Cats, and Amsterdam" },
      { question: "What hit Netflix series chronicles a family looking for love and happiness in London high society", answer: "Bridgerton" }
    ]
  },
  {
    level: 25,
    category: "Entertainment & Culture",
    questions: [
      { question: "What popular Friends star made a return to TV on The Morning Show", answer: "Jennifer Aniston" },
      { question: "What term describes the maneuver of lifting the front wheel of a bicycle or motorcycle off the ground and balancing on the rear wheel?", answer: "Wheelie" },
      { question: "What is the name of the traditional Spanish practice of taking a rest or nap in the early afternoon, especially during the hottest part of the day?", answer: "Siesta" },
      { question: "In which first-person shooter video game series can players engage in battles across different historical and futuristic settings, with titles including 'World at War,' 'Black Ops,' and 'Infinite Warfare'?", answer: "Call Of Duty" },
      { question: "What term is used to describe the internal framework of bones that supports the body of humans and other vertebrates?", answer: "Skeleton" },
      { question: "What mechanical components are characterized by their toothed edges, typically used in machinery to transmit torque and adjust the direction and speed of motion?", answer: "Gears" },
      { question: "Which country is known for its vast Amazon rainforest, iconic Christ the Redeemer statue in Rio de Janeiro, and as a powerhouse in international football?", answer: "Brazil" },
      { question: "What is the term for a small, rocky body that orbits the sun, primarily found in the belt between Mars and Jupiter?", answer: "Asteroid" },
      { question: "What term describes a place filled with video games, pinball machines, and various coin-operated entertainment machines, popular from the late 1970s through the 1980s as social hubs for gaming enthusiasts?", answer: "Arcade" }
    ]
  },
  {
    level: 26,
    category: "Games & Food",
    questions: [
      { question: "What is the term for an award, typically in the form of a statue or cup, given for an achievement, especially in sports or competitive events?", answer: "Trophy" },
      { question: "What is the name of the classic party game where players place their hands and feet on colored circles on a mat, according to a spinner's instructions, often resulting in players becoming entangled?", answer: "Twister" },
      { question: "What term describes the ethical and polite behavior participants are expected to show towards everyone involved in a sport, including respect for the rules, the officials, the opponents, and the fans?", answer: "Sportsmanship" },
      { question: "What is the name of the popular brand of flavored tortilla chips known for its bold taste, often associated with flavors like Nacho Cheese and Cool Ranch?", answer: "Doritos" },
      { question: "Which U.S. state is known for its vast desert landscapes, the Great Salt Lake, and national parks like Zion and Arches, offering a plethora of outdoor recreational activities?", answer: "Utah" },
      { question: "What is the chemical element with the symbol Cu and atomic number 29, known for its high thermal and electrical conductivity, and used in a wide range of applications, including electrical wiring and plumbing?", answer: "Copper" },
      { question: "What is the name of the hard-shelled nut that comes from any tree of the genus Juglans, known for its rich, distinctive flavor and is often used in cooking and baking?", answer: "Walnut" },
      { question: "What color is a deep, rich shade of reddish-brown, often associated with autumn and also part of the name of a popular pop music band?", answer: "Maroon" },
      { question: "What is the name of the racquet sport played with a shuttlecock across a net, either in singles or doubles format, known for its fast-paced action and requiring agility, reflexes, and precision?", answer: "Badminton" }
    ]
  },
  {
    level: 27,
    category: "Culture & Business",
    questions: [
      { question: "What term is used to describe a very young child, toddler, or baby, especially one that has not yet learned to walk or talk?", answer: "Infant" },
      { question: "What term refers to the buying and selling of goods and services over the internet, encompassing a wide range of online business activities for products and services?", answer: "Ecommerce" },
      { question: "What is the name of the candy bar that consists of a coconut-based filling topped with almonds, all enrobed in milk chocolate, known for its distinctive blue and white packaging?", answer: "Almond Joy" },
      { question: "What is the name of the brightly colored, often animal-shaped container filled with candy or toys, traditionally broken open during parties or celebrations as participants, usually blindfolded, take turns hitting it with a stick to release the treats inside?", answer: "Pinata" },
      { question: "What is the name of the large bear-like mammal native to China, recognized for its distinctive black and white coloring?", answer: "Panda" },
      { question: "In slang terms, what word is used to describe someone's skill or effectiveness in attracting and engaging with romantic interests, often implying a smooth, confident approach?", answer: "Rizz" },
      { question: "What is the name of the hand-operated cutting tool consisting of two blades joined in the middle, used for cutting various materials such as paper, cloth, and hair?", answer: "Scissors" },
      { question: "Which Caribbean island nation is known for its significant influence on music and culture, its historical ties to the Cold War through the Missile Crisis, and its capital, Havana, famous for its well-preserved Spanish colonial architecture?", answer: "Cuba" },
      { question: "What is the name of the hard, brittle material typically made from silica, soda, and lime, known for its transparency and ability to be molded into various shapes when heated?", answer: "Glass" }
    ]
  },
  {
    level: 28,
    category: "Science & Sports",
    questions: [
      { question: "What is the name of the toy that consists of a pole with a handle at the top and footrests near the bottom, on which a person stands and jumps off the ground in a series of hops, using a spring mechanism to propel themselves upward?", answer: "Pogo Stick" },
      { question: "What is the name of the small, tube-shaped pouch attached to the large intestine, located in the lower right abdomen, which has no known essential function in the human body but can become inflamed?", answer: "Appendix" },
      { question: "What South Korean company, known for its Galaxy series of smartphones and tablets, is also known sometimes for causing green bubbles over text?", answer: "Samsung" },
      { question: "What is the name of the precious gemstone made of carbon, known for its exceptional hardness and brilliant sparkle, often used in jewelry such as engagement rings and valued for its clarity, cut, color, and carat weight?", answer: "Diamond" },
      { question: "Who is the actor known for both comedic roles in 'Superbad' and '21 Jump Street' and acclaimed roles in 'Moneyball' and 'The Wolf of Wall Street,' earning him two Oscar nominations?", answer: "Jonah Hill" },
      { question: "What is the name of the Japanese wrestling sport where two competitors attempt to force each other out of a circular ring or to touch the ground with any body part other than the soles of their feet?", answer: "Sumo" },
      { question: "What is the name of the brand of candy known for its long, twisted, rope-like shape and cherry or strawberry flavor, often found in movie theaters and candy shops?", answer: "Twizzler" },
      { question: "What is the name of the luxury French fashion house and brand known for its leather goods, including handbags, luggage, and accessories, featuring a distinctive monogram, and founded in 1854?", answer: "Louis Vuitton" },
      { question: "What is the average male height in the US?", answer: "5' 9\"" }
    ]
  },
  {
    level: 29,
    category: "Science & Entertainment",
    questions: [
      { question: "What is the name of the celestial body that orbits the Earth, reflecting sunlight to provide illumination during nighttime?", answer: "Moon" },
      { question: "What is the name of the instrument used to measure atmospheric pressure, commonly used in weather forecasting?", answer: "Barometer" },
      { question: "What is the chemical symbol for the element lead?", answer: "Pb" },
      { question: "Who is the lead vocalist of the rock band Queen, known for hits such as 'Bohemian Rhapsody' and 'We Will Rock You'?", answer: "Freddie Mercury" },
      { question: "What is the name of the popular American sitcom featuring a group of six friends living in New York City, known for its iconic theme song 'I'll Be There for You'?", answer: "Friends" },
      { question: "What is the name of the fictional character who serves as the primary antagonist in the 'Star Wars' franchise, known for his iconic black helmet and heavy breathing?", answer: "Darth Vader" },
      { question: "What is the term for the round, weighted object thrown by athletes in track and field events?", answer: "Shot Put" },
      { question: "What is the name of the appliance used to store and preserve perishable food items at low temperatures?", answer: "Refrigerator" },
      { question: "What is the name of the fictional character played by Leonardo DiCaprio in the movie 'Titanic,' based on the tragic sinking of the RMS Titanic?", answer: "Jack Dawson" }
    ]
  },
  {
    level: 30,
    category: "Language & Science",
    questions: [
      { question: "What is the term for a person who speaks two languages fluently?", answer: "Bilingual" },
      { question: "What is the term for the pattern of beats or pulses in music, often organized into measures or bars?", answer: "Rhythm" },
      { question: "What is the term for the process of creating cartoon-like films by photographing individual drawings or objects?", answer: "Animation" },
      { question: "What is the term for the layer of the Earth's atmosphere above the troposphere, where temperature generally increases with altitude?", answer: "Stratosphere" },
      { question: "What is the name of the language spoken by the ancient Romans?", answer: "Latin" },
      { question: "What is the term for the process of protecting computer systems and networks from unauthorized access or attacks?", answer: "Cybersecurity" },
      { question: "What is the term for a film genre characterized by its use of exaggerated characters, extravagant sets, and lavish singing numbers?", answer: "Musical" },
      { question: "What is the name of the traditional Japanese dish consisting of vinegared rice topped with raw fish or seafood?", answer: "Sushi" },
      { question: "What is the name of the process by which a star exhausts its nuclear fuel and collapses under its own gravity, resulting in a catastrophic explosion?", answer: "Supernova" }
    ]
  },
  {
    level: 31,
    category: "Fitness & Science",
    questions: [
      { question: "What is the name of the exercise that involves bending the knees and lowering the body into a seated position, typically targeting the quadriceps muscles?", answer: "Squat" },
      { question: "What is the term for the imaginary line that extends from the North Pole to the South Pole, around which the Earth rotates?", answer: "Axis" },
      { question: "What is the term for the musical technique of singing or playing two or more different notes simultaneously?", answer: "Harmony" },
      { question: "What is the term for the occurrence of heavy snowfall accompanied by strong winds, resulting in reduced visibility and hazardous travel conditions?", answer: "Blizzard" },
      { question: "What is the name of the French dish consisting of a thin pancake made from flour, eggs, and milk, typically filled and folded before serving?", answer: "Crepe" },
      { question: "What is the term for a film genre focused on depicting real-life events and figures, often in a dramatic or biographical style?", answer: "Documentary" },
      { question: "What is the name of the popular open-source operating system based on the Linux kernel, known for its customizable interface and wide range of applications, predominantly on phones?", answer: "Android" },
      { question: "What is the name of the virtual currency that operates on a decentralized network of computers, using cryptography to secure transactions and control the creation of new units?", answer: "Bitcoin" },
      { question: "What is the name of the device used to produce percussive sounds by striking metal strings with small hammers?", answer: "Piano" }
    ]
  },
  {
    level: 32,
    category: "Entertainment & Nature",
    questions: [
      { question: "What is the name of the meteorological phenomenon characterized by an extended period of hot, dry weather, often leading to drought conditions?", answer: "Heatwave" },
      { question: "What is the name of the film franchise based on a series of novels by J.R.R. Tolkien, set in the fictional world of Middle-earth?", answer: "The Lord of the Rings" },
      { question: "What is the technical term for a single strand of grass?", answer: "Blade" },
      { question: "What ancient calendar system ended in 2012?", answer: "Mayan Calendar" },
      { question: "What sea is famously crossed by Moses in the Bible?", answer: "Red Sea" },
      { question: "What type of drum in a drum kit has a wire or cord stretched across the bottom to create a sharp or rattle sound?", answer: "Snare drum" },
      { question: "What's the term for a baseball player taking an extra base without being tagged or forced?", answer: "Steal a base" },
      { question: "Who is the Canadian pop star known for hits like 'Baby' and 'Sorry'?", answer: "Justin Bieber" },
      { question: "What is the name of the anti-hero in Marvel Comics known for breaking the fourth wall and his regenerative healing factor?", answer: "Deadpool" }
    ]
  },
  {
    level: 33,
    category: "Science & Sports",
    questions: [
      { question: "What is the 5th planet from the sun?", answer: "Jupiter" },
      { question: "What is the term for the period of partial darkness between day and night? And is opposite Dawn", answer: "Dusk" },
      { question: "How many kicks are taken by a single team in a single penalty shootout at the end of a tied game of soccer?", answer: "5" },
      { question: "Besides H2O, What is the chemical name for water?", answer: "Dihydrogen monoxide" },
      { question: "What social media company did facebook buy in 2012", answer: "Instagram" },
      { question: "What was the name of the 6-second video platform that gained popularity before TikTok?", answer: "Vine" },
      { question: "What is the southernmost country in Africa?", answer: "South Africa" },
      { question: "What is a type of bacteria that causes food poisoning, often associated with raw poultry or eggs?", answer: "Salmonella" },
      { question: "What is the third name for the 'pound' sign and the 'number' sign?", answer: "Hashtag" }
    ]
  },
  {
    level: 34,
    category: "Science & Food",
    questions: [
      { question: "The term for deformation where the material returns to its original shape is called elastic deformation. What type of deformation is it if it does not return?", answer: "Inelastic deformation" },
      { question: "What is the Key ingredient in Marinara Sauce?", answer: "Tomatoes" },
      { question: "What was the drink called before it changed names to starry?", answer: "Sierra Mist" },
      { question: "What key on the keyboard turns into a dollar sign when hitting shift?", answer: "4" },
      { question: "In sandwiches, what does BLT stand for?", answer: "bacon, lettuce, tomato" },
      { question: "What direction does the sun rise on?", answer: "East" },
      { question: "After 9/11 this Disk Jockey changed his name from Arab attack to what?", answer: "DJ Khaled" },
      { question: "What is the term for the bending of light as it passes through different mediums?", answer: "Refraction" },
      { question: "How many hearts do squids have in their body?", answer: "three hearts" }
    ]
  }
];

export function getTriviaQuestionsForLevel(level: number): { question: string; answer: string }[] {
  const entry = TRIVIA_LEVELS.find((l) => l.level === level);
  return entry ? entry.questions : [];
}

export function getTriviaCategoryForLevel(level: number): string {
  const entry = TRIVIA_LEVELS.find((l) => l.level === level);
  return entry ? entry.category : '';
}
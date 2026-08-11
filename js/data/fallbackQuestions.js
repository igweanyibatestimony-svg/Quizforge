const BANK = [
    ['Which language runs directly in a web browser?', ['JavaScript', 'Python', 'C++', 'Java'], 'JavaScript', 'Computers', 'easy'],
    ['What does HTML stand for?', ['HyperText Markup Language', 'HighText Machine Language', 'HyperTool Multi Language', 'HomeText Markup Language'], 'HyperText Markup Language', 'Computers', 'easy'],
    ['Which planet is known as the Red Planet?', ['Mars', 'Venus', 'Jupiter', 'Mercury'], 'Mars', 'Science & Nature', 'easy'],
    ['What is the capital of France?', ['Paris', 'Madrid', 'Rome', 'Berlin'], 'Paris', 'Geography', 'easy'],
    ['Which number is the first prime number?', ['2', '1', '3', '0'], '2', 'Science & Nature', 'easy'],
    ['Which keyword declares a constant in JavaScript?', ['const', 'let', 'var', 'static'], 'const', 'Computers', 'easy'],
    ['How many continents are commonly recognized?', ['7', '5', '6', '8'], '7', 'Geography', 'easy'],
    ['Which gas do humans need to breathe to survive?', ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Helium'], 'Oxygen', 'Science & Nature', 'easy'],
    ['What is 10 × 10?', ['100', '20', '1000', '110'], '100', 'Science & Nature', 'easy'],
    ['Which ocean is the largest?', ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], 'Pacific Ocean', 'Geography', 'easy'],
    ['Which organ pumps blood around the human body?', ['Heart', 'Liver', 'Lung', 'Kidney'], 'Heart', 'Science & Nature', 'easy'],
    ['Which animal is known for changing its color to blend into its surroundings?', ['Chameleon', 'Dolphin', 'Elephant', 'Penguin'], 'Chameleon', 'Animals', 'easy'],

    ['What does CSS primarily control on a webpage?', ['Presentation and layout', 'Database storage', 'Server hardware', 'Email delivery'], 'Presentation and layout', 'Computers', 'medium'],
    ['Which data structure uses FIFO ordering?', ['Queue', 'Stack', 'Tree', 'Graph'], 'Queue', 'Computers', 'medium'],
    ['Which planet has the largest number of moons in current astronomical counts?', ['Saturn', 'Earth', 'Mars', 'Mercury'], 'Saturn', 'Science & Nature', 'medium'],
    ['Which country has the city of Kyoto?', ['Japan', 'China', 'South Korea', 'Thailand'], 'Japan', 'Geography', 'medium'],
    ['Who wrote the play Romeo and Juliet?', ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'], 'William Shakespeare', 'General Knowledge', 'medium'],
    ['Which sport uses the term “love” for a score of zero?', ['Tennis', 'Football', 'Basketball', 'Cricket'], 'Tennis', 'Sports', 'medium'],
    ['What is the chemical symbol for sodium?', ['Na', 'So', 'Sd', 'Sn'], 'Na', 'Science & Nature', 'medium'],
    ['Which layer of the OSI model is responsible for routing?', ['Network', 'Transport', 'Session', 'Presentation'], 'Network', 'Computers', 'medium'],
    ['Which empire was centered at Tenochtitlan?', ['Aztec', 'Roman', 'Ottoman', 'Mali'], 'Aztec', 'History', 'medium'],
    ['What is the largest hot desert on Earth?', ['Sahara', 'Gobi', 'Kalahari', 'Atacama'], 'Sahara', 'Geography', 'medium'],
    ['Which branch of government typically interprets laws?', ['Judicial', 'Executive', 'Legislative', 'Electoral'], 'Judicial', 'Politics', 'medium'],
    ['Which animal is the largest living land mammal?', ['African elephant', 'Giraffe', 'Hippopotamus', 'Rhinoceros'], 'African elephant', 'Animals', 'medium'],

    ['What is the time complexity of binary search on a sorted array?', ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], 'O(log n)', 'Computers', 'hard'],
    ['Which protocol is primarily used to securely transfer web pages?', ['HTTPS', 'FTP', 'SMTP', 'Telnet'], 'HTTPS', 'Computers', 'hard'],
    ['What is the approximate speed of light in a vacuum?', ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'], '3 × 10⁸ m/s', 'Science & Nature', 'hard'],
    ['Which treaty formally ended World War I between Germany and the Allied powers?', ['Treaty of Versailles', 'Treaty of Paris', 'Treaty of Rome', 'Treaty of Vienna'], 'Treaty of Versailles', 'History', 'hard'],
    ['Which country is home to the Atacama Desert?', ['Chile', 'Peru', 'Mexico', 'Argentina'], 'Chile', 'Geography', 'hard'],
    ['In basketball, how many points is a free throw worth?', ['1', '2', '3', '4'], '1', 'Sports', 'hard'],
    ['Which JavaScript feature creates a function that retains access to its lexical scope?', ['Closure', 'Prototype', 'Generator', 'Iterator'], 'Closure', 'Computers', 'hard'],
    ['Which gas is most abundant in Earth’s atmosphere?', ['Nitrogen', 'Oxygen', 'Argon', 'Carbon dioxide'], 'Nitrogen', 'Science & Nature', 'hard'],
    ['Which ancient civilization developed cuneiform writing?', ['Sumerians', 'Vikings', 'Incas', 'Aztecs'], 'Sumerians', 'History', 'hard'],
    ['Which ocean trench contains the deepest known point in Earth’s oceans?', ['Mariana Trench', 'Tonga Trench', 'Java Trench', 'Puerto Rico Trench'], 'Mariana Trench', 'Geography', 'hard'],
    ['Which political system gives citizens the power to vote for representatives?', ['Representative democracy', 'Absolute monarchy', 'Theocracy', 'Autocracy'], 'Representative democracy', 'Politics', 'hard'],
    ['Which mammal is capable of true powered flight?', ['Bat', 'Flying squirrel', 'Sugar glider', 'Colugo'], 'Bat', 'Animals', 'hard'],

    // Anime & Manga — enough coverage that this category is never silently empty.
    ['What is the name of the pirate protagonist in One Piece?', ['Monkey D. Luffy', 'Naruto Uzumaki', 'Ichigo Kurosaki', 'Gon Freecss'], 'Monkey D. Luffy', 'Anime & Manga', 'easy'],
    ['In Pokémon, what type is Pikachu?', ['Electric', 'Fire', 'Water', 'Psychic'], 'Electric', 'Anime & Manga', 'easy'],
    ['What is the name of Naruto’s signature spinning chakra attack?', ['Rasengan', 'Bankai', 'Kamehameha', 'Getsuga Tensho'], 'Rasengan', 'Anime & Manga', 'easy'],
    ['Which series features the character Tanjiro Kamado?', ['Demon Slayer', 'Bleach', 'One Piece', 'Death Note'], 'Demon Slayer', 'Anime & Manga', 'easy'],
    ['What is the name of the magical school attended by Harry Potter?', ['Hogwarts', 'UA High School', 'Tokyo Jujutsu High', 'Shiketsu'], 'Hogwarts', 'Anime & Manga', 'easy'],
    ['Which anime features a notebook that can kill people whose names are written in it?', ['Death Note', 'Haikyuu!!', 'One Punch Man', 'Blue Lock'], 'Death Note', 'Anime & Manga', 'easy'],
    ['What is the name of the giant humanoid creatures in Attack on Titan?', ['Titans', 'Hollows', 'Homunculi', 'Curses'], 'Titans', 'Anime & Manga', 'easy'],

    ['Which organization does Saitama belong to in One Punch Man?', ['Hero Association', 'Soul Society', 'Akatsuki', 'Survey Corps'], 'Hero Association', 'Anime & Manga', 'medium'],
    ['What is the name of Ichigo Kurosaki’s sword in Bleach?', ['Zangetsu', 'Samehada', 'Excalibur', 'Nichirin'], 'Zangetsu', 'Anime & Manga', 'medium'],
    ['Which studio animated the original My Neighbor Totoro?', ['Studio Ghibli', 'Bones', 'Madhouse', 'Ufotable'], 'Studio Ghibli', 'Anime & Manga', 'medium'],
    ['In My Hero Academia, what is the name of the hero school attended by Class 1-A?', ['U.A. High School', 'Ketsubutsu Academy', 'Shiketsu High', 'Jujutsu High'], 'U.A. High School', 'Anime & Manga', 'medium'],
    ['Which character is known as the “Fullmetal Alchemist”?', ['Edward Elric', 'Roy Mustang', 'Alphonse Elric', 'Winry Rockbell'], 'Edward Elric', 'Anime & Manga', 'medium'],
    ['In Dragon Ball, what are the seven magical objects that grant a wish when gathered?', ['Dragon Balls', 'Chaos Emeralds', 'Sacred Stones', 'Spirit Orbs'], 'Dragon Balls', 'Anime & Manga', 'medium'],
    ['Which manga was written and illustrated by Eiichiro Oda?', ['One Piece', 'Bleach', 'Naruto', 'Slam Dunk'], 'One Piece', 'Anime & Manga', 'medium'],

    ['In Fullmetal Alchemist, what is the name of the taboo process of creating a human through alchemy?', ['Human transmutation', 'Soul resonance', 'Nen synthesis', 'Domain expansion'], 'Human transmutation', 'Anime & Manga', 'hard'],
    ['Which anime uses the power system called Nen?', ['Hunter × Hunter', 'Naruto', 'Bleach', 'Black Clover'], 'Hunter × Hunter', 'Anime & Manga', 'hard'],
    ['In Jujutsu Kaisen, what is the name of the strongest sorcerer commonly associated with the Six Eyes?', ['Satoru Gojo', 'Suguru Geto', 'Kento Nanami', 'Toji Fushiguro'], 'Satoru Gojo', 'Anime & Manga', 'hard'],
    ['Which manga series follows Light Yagami after he discovers the Death Note?', ['Death Note', 'Monster', '20th Century Boys', 'Pluto'], 'Death Note', 'Anime & Manga', 'hard'],
    ['In Naruto, which clan is associated with the Sharingan?', ['Uchiha', 'Hyuga', 'Nara', 'Aburame'], 'Uchiha', 'Anime & Manga', 'hard'],
    ['Which anime film was directed by Hayao Miyazaki and won the Academy Award for Best Animated Feature?', ['Spirited Away', 'Princess Mononoke', 'Howl’s Moving Castle', 'Ponyo'], 'Spirited Away', 'Anime & Manga', 'hard'],
    ['Which character is the main protagonist of Vinland Saga?', ['Thorfinn', 'Guts', 'Eren Yeager', 'Denji'], 'Thorfinn', 'Anime & Manga', 'hard'],
];

const CATEGORY_IDS = {
    '9': 'General Knowledge',
    '17': 'Science & Nature',
    '18': 'Computers',
    '21': 'Sports',
    '22': 'Geography',
    '23': 'History',
    '24': 'Politics',
    '27': 'Animals',
    '31': 'Anime & Manga',
};

const QUESTIONS = BANK.map((entry, index) => ({
    id: `fallback-${index + 1}`,
    question: entry[0],
    options: entry[1],
    correctAnswer: entry[2],
    category: entry[3],
    difficulty: entry[4],
    type: 'multiple',
}));

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function normalizeCategory(category) {
    const value = String(category ?? 'any');
    return CATEGORY_IDS[value] || (value.toLowerCase() === 'any' ? 'any' : value);
}

/**
 * Return only questions matching BOTH requested filters.
 * We deliberately do not silently fill a narrow selection with unrelated
 * categories or difficulties. If the offline bank is too small, the caller
 * gets fewer questions and can tell the player why.
 */
export function getFallbackQuestions(count = 10, difficulty = 'any', category = 'any') {
    const wantedDifficulty = String(difficulty || 'any').toLowerCase();
    const wantedCategory = normalizeCategory(category);

    let pool = QUESTIONS;

    if (wantedDifficulty !== 'any') {
        pool = pool.filter(q => q.difficulty.toLowerCase() === wantedDifficulty);
    }

    if (wantedCategory !== 'any') {
        pool = pool.filter(q => q.category.toLowerCase() === wantedCategory.toLowerCase());
    }

    const safeCount = Math.max(1, Math.min(20, Number(count) || 10));
    return shuffle([...pool])
        .slice(0, safeCount)
        .map(q => ({
            ...q,
            options: shuffle([...q.options]),
        }));
}

export function getFallbackAvailability(difficulty = 'any', category = 'any') {
    const wantedDifficulty = String(difficulty || 'any').toLowerCase();
    const wantedCategory = normalizeCategory(category);

    return QUESTIONS.filter(q => {
        const difficultyMatches =
            wantedDifficulty === 'any' ||
            q.difficulty.toLowerCase() === wantedDifficulty;
        const categoryMatches =
            wantedCategory === 'any' ||
            q.category.toLowerCase() === wantedCategory.toLowerCase();

        return difficultyMatches && categoryMatches;
    }).length;
}

export const fallbackQuestions = QUESTIONS;

const hangman = document.getElementById('hangman');
const letters = document.getElementById('letters');
const chancesCount = document.getElementById('chancesCount');
const ludzikParts = document.querySelectorAll('#ludzik .hiddenPart'); // Pobierz elementy wisielca
let chances = 6;
let guessedLetters = [];
let randomWord = [];

const modalWindow = document.createElement('div');
modalWindow.classList.add('modal');
hangman.appendChild(modalWindow);

const wordsTab = [
    'ananas',
    'brygada',
    'czytnik',
    'delfiny',
    'ekranik',
    'fryzura',
    'groszek',
    'harmonia',
    'instrukcja',
    'jaskinia',
    'kajdanki',
    'krawat',
    'latarnia',
    'melodia',
    'nocnik',
    'odkurzacz',
    'papryka',
    'rakieta',
    'serduszko',
    'traktor',
]

// Generowanie losowego słowa i tworzenie układu liter
const generateLetters = () => {
    const word = wordsTab[Math.floor(Math.random() * wordsTab.length)];
    randomWord = word.toLowerCase().split('');
    guessedLetters = Array(randomWord.length).fill(false);

    for (let i = 0; i < randomWord.length; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');

        const singleLetter = document.createElement('span');
        singleLetter.classList.add('hiddenLetter');
        singleLetter.textContent = randomWord[i];
        letterDiv.appendChild(singleLetter);
        letters.appendChild(letterDiv);
    }
};

// Reset gry
const newGame = () => {
    // Reset ustawień
    letters.innerHTML = '';
    chances = 6;
    chancesCount.textContent = chances;
    randomWord = [];
    guessedLetters = [];
    ludzikParts.forEach((part) => part.classList.add('hiddenPart')); // Ukryj części wisielca
    document.addEventListener('keydown', checkingAnswer); // Aktywuj obsługę klawiatury
    generateLetters();
    modalWindow.style.setProperty('opacity', 0);
};

// Sprawdzanie odpowiedzi gracza
const checkingAnswer = (e) => {
    const key = e.key.toLowerCase();

    // Ignoruj klawisze modyfikujące lub inne nie-znaki
    if (key.length !== 1 || key < 'a' || key > 'z') {
        return; // Jeśli nie jest to pojedyncza litera, zakończ funkcję
    }

    if (randomWord.includes(key)) {
        randomWord.forEach((letter, index) => {
            if (letter === key) {
                guessedLetters[index] = true;
                letters.children[index].querySelector('span').classList.remove('hiddenLetter');
            }
        });

        // Sprawdzenie, czy wszystkie litery zostały odgadnięte
        if (guessedLetters.every(Boolean)) {
            modalWindow.textContent = `Gratulacje! Zgadłeś hasło!`
            modalWindow.style.setProperty('opacity', 1);
            document.removeEventListener('keydown', checkingAnswer);
        }
    } else {
        chancesCount.textContent = --chances;
        // Pokazanie kolejnej części wisielca
        ludzikParts[6 - chances - 1]?.classList.remove('hiddenPart');

        if (chances === 0) {
            modalWindow.textContent = `Przegrałeś! Prawidłowe słowo to: ${randomWord.join('')}`
            modalWindow.style.setProperty('opacity', 1);
            document.removeEventListener('keydown', checkingAnswer);
        }
    }
};


// Obsługa przycisków
const rulesButton = document.getElementById('rules');
const closeRules = document.getElementById('closeRules');
const rulesDiv = document.querySelector('.hangmanRules');
rulesButton.addEventListener('click', () => {
    rulesDiv.classList.toggle('showHangmanRules');
});
closeRules.addEventListener('click', () => {
    rulesDiv.classList.remove('showHangmanRules');
});

const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', newGame);

// Rozpoczęcie gry po załadowaniu strony
newGame();
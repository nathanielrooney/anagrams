let currentWord = '';
let anagrams = [];
let currentAnagramIndex = 0;
let timeLeft = 60;  // 60 seconds
let timerInterval;
let score = 0;

function shuffle(word) {
    let shuffledWord = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffledWord;
}

function generateAnagrams(word) {
    let anagramSet = new Set();
    while (anagramSet.size < 3) {
        anagramSet.add(shuffle(word));
    }
    return [...anagramSet];
}

function getScoreForWord(word) {
    switch (word.length) {
        case 3: return 100;
        case 4: return 400;
        case 5: return 1200;
        case 6: return 2000;
        case 7: return 3000;
        default: return 0;  // No points for words outside the specified lengths
    }
}

function updateScore(word) {
    score += getScoreForWord(word);
    document.getElementById('score').innerText = "Score: " + score;
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerText = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function displayAnagram() {
    document.getElementById('currentAnagram').innerText = anagrams[currentAnagramIndex];
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('anagramDisplay').classList.add('hidden');
    document.getElementById('feedback').innerText = "Game over! Your score is: " + score;
}

function checkGuess() {
    const guess = document.getElementById('guessInput').value;
    
    // Check for minimum word length
    if (guess.length < 3) {
        document.getElementById('feedback').innerText = "Enter a word with at least 3 letters!";
        return;
    }
    
    if (guess === currentWord) {
        updateScore(guess);
        currentAnagramIndex++;
        if (currentAnagramIndex < anagrams.length) {
            displayAnagram();
        } else {
            endGame();
        }
    } else {
        document.getElementById('feedback').innerText = "Try again!";
    }
}

function startGame() {
    currentWord = document.getElementById('wordInput').value;
    if (!currentWord || currentWord.length < 3) {
        alert("Please enter a word with at least 3 letters to start the game!");
        return;
    }

    anagrams = generateAnagrams(currentWord);
    currentAnagramIndex = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById('score').innerText = "Score: 0";
    document.getElementById('timer').innerText = "Time: 60";
    displayAnagram();
    startTimer();

    document.getElementById('anagramDisplay').classList.remove('hidden');
}

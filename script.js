let currentWord;
let anagrams;
let currentAnagramIndex = 0;

function startGame() {
    currentWord = document.getElementById('wordInput').value;
    if (!currentWord) {
        alert("Please enter a word to start the game!");
        return;
    }

    // For simplicity, let's just shuffle the letters to create a single anagram.
    // In a real game, you'd generate multiple valid anagrams.
    anagrams = [shuffle(currentWord)];
    currentAnagramIndex = 0;
    displayAnagram();

    document.getElementById('anagramDisplay').classList.remove('hidden');
}

function displayAnagram() {
    document.getElementById('currentAnagram').innerText = anagrams[currentAnagramIndex];
}

function checkGuess() {
    const guess = document.getElementById('guessInput').value;
    if (guess === currentWord) {
        document.getElementById('feedback').innerText = "Correct!";
        // Move to next anagram or end game if out of anagrams.
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

function endGame() {
    document.getElementById('anagramDisplay').classList.add('hidden');
    alert("Congratulations! You've guessed all the anagrams.");
}

// Simple function to shuffle letters in a word
function shuffle(word) {
    return word.split('').sort(() => 0.5 - Math.random()).join('');
}

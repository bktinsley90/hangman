const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const playAgain = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLettersArray = [];

// Show hidden word
function displayWord() {
  word.innerHTML = `
        ${selectedWord
          .split('')
          .map(
            (letter) => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `
          )
          .join('')}
    `;

  const innerWord = word.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}
// Update the wrong letters
function updateWrongLetters() {
  // Display wrong letters
  wrongLetters.innerHTML = `
        ${wrongLettersArray.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLettersArray.map((letter) => `<span>${letter}</span>`)}
    `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLettersArray.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }

    // Check if lost
    if (errors === figureParts.length) {
      finalMessage.innerText = 'Unfortunately you lost. 😕';
      popup.style.display = 'flex';
    }
  });
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// event listener for key press
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLettersArray.includes(letter)) {
        wrongLettersArray.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});
// restart game
playAgain.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLettersArray.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popup.style.display = 'none';
});
displayWord();

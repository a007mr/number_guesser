/*            
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      inputNum = document.querySelector('#guess-input'),
      inputBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI mix and max
minNum.textContent = min;
maxNum.textContent = max;  

// Play again event listener 
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
      window.location.reload();
  }
});

// Listen for guess
inputBtn.addEventListener('click', function() {
  let guess = parseInt(inputNum.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else if (guess === winningNum) {
  
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}.`);
    } else {

      inputNum.style.borderColor = 'red';
      inputNum.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

    }
  }
})

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  
  inputNum.disabled = true;

  inputNum.style.borderColor = color;

  message.style.color = color;

  setMessage(msg);

  // Play Again?
  inputBtn.value = 'Play Again';
  inputBtn.className += 'play-again';
}

// Get Winning Number  
function getRandomNum(min, max) {
  return Math.ceil(Math.random() * max);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
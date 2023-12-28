// Adding the listeners for the start screen
// Press start => level select => start game
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', ()=> {
  playButton.style.display = 'none';
  document.querySelector('.level-selector-container').style.display="block";
  showHighScores();
});

let easyHighScore = JSON.parse(localStorage.getItem('easyHighScore')) || null;
let mediumHighScore = JSON.parse(localStorage.getItem('mediumHighScore')) || null;
let hardHighScore = JSON.parse(localStorage.getItem('hardHighScore')) || null;

// Fetches data from previous games to display below the difficulty selectors
// If there are no previous games, then nothing is displayed.
function showHighScores() {
  if (easyHighScore != null) {
    document.querySelector('.best-easy-time').style.display = "block";
    document.querySelector('.best-easy-time').innerHTML = `
      <p class="highlight-text">HIGH SCORE</p>
      <p>Moves:${easyHighScore.moves}</p>
      <p>Time:${easyHighScore.time}</p>
    `;
  } else {
    document.querySelector('.best-easy-time').style.display = "none";
  }

  if (mediumHighScore != null) {
    document.querySelector('.best-medium-time').style.display = "block";
    document.querySelector('.best-medium-time').innerHTML = `
      <p class="highlight-text">HIGH SCORE</p>
      <p>Moves:${mediumHighScore.moves}</p>
      <p>Time:${mediumHighScore.time}</p>
    `;
  } else {
    document.querySelector('.best-medium-time').style.display = "none";
  }

  if (hardHighScore != null) {
    document.querySelector('.best-hard-time').style.display = "block";
    document.querySelector('.best-hard-time').innerHTML = `
      <p class="highlight-text">HIGH SCORE</p>
      <p>Moves:${hardHighScore.moves}</p>
      <p>Time:${hardHighScore.time}</p>
    `;
  } else {
    document.querySelector('.best-hard-time').style.display = "none";
  }
}

const easyButton = document.querySelector('.easy-button');
easyButton.addEventListener('click', ()=> {play(8, 'easy')});

const mediumButton = document.querySelector('.medium-button');
mediumButton.addEventListener('click', ()=> {play(16, 'medium')});

const hardButton = document.querySelector('.hard-button');
hardButton.addEventListener('click', ()=> {play(20, 'hard')});

const gridDisplay = document.querySelector('.grid');

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', ()=> {
  gridDisplay.style.display = "none";
  document.querySelector('.score-card').style.display = "none";
  document.querySelector('.level-selector-container').style.display="block";
  showHighScores();
})

// Main game variables
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

let level = null;

let moves = 0;
let roundTime = 0;
let newHighScore = false;

// Starts a new game
// Depending on the level of difficulty, a different amount of cards will be on the board. The hard button changes the grid size as well, to accomodate the cards.
function play(cardAmount, chosenLevel) {
  document.querySelector('.level-selector-container').style.display="none";
  gridDisplay.style.display="flex";
  gridDisplay.innerHTML = '';

  // Resetting
  cardsOnBoard = [];
  moves = 0;
  newHighScore = false;
  gridDisplay.classList.remove("large-grid");
  resetTimer();
  
  document.querySelector('.score-card').style.display = "block";
  startTimer();

  level = chosenLevel;
  if (level==='easy') {
    levelDisplay.innerHTML = '★';
  } else if (level === 'medium') {
    levelDisplay.innerHTML = '★★';
  } else {
    levelDisplay.innerHTML = '★★★';
    gridDisplay.classList.add("large-grid");
  }

  moveDisplay.innerHTML = `<span class="highlight-text">MOVES:</span> ${moves}`;

  decideCards(cardAmount);
  createBoard();
}

const cardOptions = ['apple', 'balloon', 'bow', 'butterfly', 'candy', 'cloud', 'clover', 'crown', 'diamond', 'egg', 'exclamation', 'fish', 'flower', 'ghost', 'grape', 'heart', 'icecream', 'moon', 'mug', 'mushroom', 'musicnote', 'orange', 'planet', 'present', 'snowflake', 'star', 'strawberry', 'sun', 'tree', 'tulip', 'umbrella', 'zzz'];
let cardsOnBoard = [];

// Randomizes the card options and then chooses the first 'cardAmount' amount
function decideCards(cardAmount) {
  cardOptions.sort(()=> 0.5 - Math.random());

  for (let i = 0; i < cardAmount; i++) {
    cardsOnBoard[i] = { name: cardOptions[i], img: `images/${cardOptions[i]}.png`};
    cardsOnBoard[i + cardAmount] = { name: cardOptions[i], img: `images/${cardOptions[i]}.png`};
  }

  cardsOnBoard.sort(()=> 0.5 - Math.random());
}

// Creates the board for the game with the chosen cards, starting them all off
// face-down
function createBoard() {
  for (let i = 0; i < cardsOnBoard.length; i++) {
    const cardElement = document.createElement('img');

    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', flipCard);

    gridDisplay.append(cardElement);
  }
}

// Turns the card over and sets the card as a chosen one
// Once two are chosen, it will see if they are a match
function flipCard() {
  let id = this.getAttribute('data-id');
  const {name, img} = cardsOnBoard[id];

  cardsChosen.push({name, id});
  this.setAttribute('src', img);

  if (cardsChosen.length === 2) {
    setTimeout(() => {
      checkMatch()
    }, 200);
  }
}

// Checks to see if the two chosen cards are a match
function checkMatch() {
  const cards = document.querySelectorAll('.grid > img');

  const cardOne = cardsChosen[0];
  const cardTwo = cardsChosen[1];

  const cardOneElement = cards[cardOne.id];
  const cardTwoElement = cards[cardTwo.id];

  // Player clicked on the same card twice
  if (cardOne.id === cardTwo.id) {
    cardOneElement.setAttribute('src', 'images/back.png');
  } else {
    if (cardOne.name === cardTwo.name) {
      // It's a match!
      setTimeout(()=> {
        cardOneElement.classList.add('matches');
        cardTwoElement.classList.add('matches');

        cardOneElement.removeEventListener('click', flipCard);
        cardTwoElement.removeEventListener('click', flipCard);
      }, 200);

      cardsWon.push(cardsChosen);

    } else {
      // Not a match => flips them back over
      setTimeout(() => {
        cardOneElement.setAttribute('src', 'images/back.png');
        cardTwoElement.setAttribute('src', 'images/back.png');
      }, 200);
    }
  }
  // Resets the chosen cards for the next two flipped
  cardsChosen = [];

  if (cardsWon.length === cardsOnBoard.length/2) {
    setTimeout(()=> {
      cardsWon = [];
      win();
    }, 200);
  }

  moves++;

  moveDisplay.innerHTML = `<span class="highlight-text">MOVES:</span> ${moves}`;
}

// Once the player wins, it displays the final time and amount of moves, then asks
// if the player would like to play again.
function win() {
  stopTimer();
  roundTime = displayTime();
  
  gridDisplay.style.display="none";
  document.querySelector('.score-card').style.display = "none";
  

  const winDisplay = document.querySelector(".win-display");
  winDisplay.style.display = "block";

  winDisplay.innerHTML = `<p class="you-won-display">☆✦YOU WON!!✦☆</p>
      <p> <span class="highlight-text">TOTAL TIME:</span> ${roundTime}</p>
      <p> <span class="highlight-text">TOTAL MOVES:</span> ${moves}</p>
      <p class="new-high-score"></p>
      <i class="fa-solid fa-rotate-left play-again"></i>`;

  saveScore();

  newHighScore? document.querySelector('.new-high-score').innerHTML = `New high score!!` : document.querySelector('.new-high-score').innerHTML = ``;

  const playAgain = document.querySelector('.play-again');
  playAgain.addEventListener('click', () => {
    winDisplay.style.display = "none";
    document.querySelector('.level-selector-container').style.display="block";
    showHighScores();
  });
}

// Script for the timer
let [seconds, minutes, hours] = [0,0,0];
let timer = null;

// Counts up in seconds, minutes, and hours
function timerCount() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  timeDisplay.innerHTML = `<span class="highlight-text">TIME:</span> ${displayTime()}`;
}

// Resets the timer
function resetTimer() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0,0,0];
  timeDisplay.innerHTML = '<span class="highlight-text">TIME:</span> 00:00:00';
}

// Stops the timer
function stopTimer() {
  clearInterval(timer);
}

// Starts an interval where every second, the timer is increased.
function startTimer() {
  if (timer != null) {
    clearInterval(timer);
  }
  timer = setInterval(timerCount, 1000);
}

// Adds a 0 in front of single-digit numbers for the timer
function displayTime() {
  let displayHours = hours < 10 ? "0" + hours : hours;
  let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  let displaySeconds = seconds < 10 ? "0" + seconds : seconds;

  return `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

// Saves score to the player's local storage so it can be displayed next time they play
function saveScore() {
  let roundScore = {
    moves: moves,
    time: roundTime,
    calculatedScore: (seconds + 60*minutes + 60*hours) * moves
  }

  if (level === 'easy' && (!easyHighScore || roundScore.calculatedScore < easyHighScore.calculatedScore)) {
    localStorage.setItem('easyHighScore', JSON.stringify(roundScore));
    easyHighScore = roundScore;
    newHighScore = true;
  } else if (level === 'medium' && (!mediumHighScore || roundScore.calculatedScore < mediumHighScore.calculatedScore)) {
    localStorage.setItem('mediumHighScore', JSON.stringify(roundScore));
    mediumHighScore = roundScore;
    newHighScore = true;
  } else if (level === 'hard' && (!hardHighScore || roundScore.calculatedScore < hardHighScore.calculatedScore)) {
    localStorage.setItem('hardHighScore', JSON.stringify(roundScore));
    hardHighScore = roundScore;
    newHighScore = true;
  }
}

// Gets rid of the scores in the player's local storage
function resetScores() {
  localStorage.removeItem('easyHighScore');
  localStorage.removeItem('mediumHighScore');
  localStorage.removeItem('hardHighScore');

  easyHighScore = null;
  mediumHighScore = null;
  hardHighScore = null;
}
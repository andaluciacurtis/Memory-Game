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

const selectorText = document.querySelector(".selector-text");

const easyButton = document.querySelector('.easy-button');
easyButton.addEventListener('click', ()=> {play(6, 'easy')});
easyButton.addEventListener('mouseover', ()=> {
  selectorText.innerHTML = 'EASY';
  selectorText.style.color = "#8ed7f0";
  selectorText.style.fontWeight = "bold";
});

easyButton.addEventListener('mouseout', ()=> {
  selectorText.innerHTML = 'CHOOSE YOUR FATE';
  selectorText.style.color = "white";
  selectorText.style.fontWeight = "normal";
});

const mediumButton = document.querySelector('.medium-button');
mediumButton.addEventListener('click', ()=> {play(12, 'medium')});
mediumButton.addEventListener('mouseover', ()=> {
  selectorText.innerHTML = 'MEDIUM';
  selectorText.style.color = "#afd67e";
  selectorText.style.fontWeight = "bold";
});
mediumButton.addEventListener('mouseout', ()=> {
  selectorText.innerHTML = 'CHOOSE YOUR FATE';
  selectorText.style.color = "white";
  selectorText.style.fontWeight = "normal";
});

const hardButton = document.querySelector('.hard-button');
hardButton.addEventListener('click', ()=> {play(18, 'hard')});
hardButton.addEventListener('mouseover', ()=> {
  selectorText.innerHTML = 'HARD';
  selectorText.style.color = "#f286b6";
  selectorText.style.fontWeight = "bold";
});
hardButton.addEventListener('mouseout', ()=> {
  selectorText.innerHTML = 'CHOOSE YOUR FATE';
  selectorText.style.color = "white";
  selectorText.style.fontWeight = "normal";
});

const gridDisplay = document.querySelector('.grid');


// Main game variables
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

let level = null;

let moves = 0;
let roundTime = 0;
let newHighScore = false;

let cardsOnBoard = [];
const cardOptions = ['apple', 'balloon', 'bow', 'butterfly', 'candy', 'cloud', 'clover', 'crown', 'diamond', 'egg', 'exclamation', 'fish', 'flower', 'ghost', 'grape', 'heart', 'icecream', 'moon', 'mug', 'mushroom', 'musicnote', 'orange', 'planet', 'present', 'snowflake', 'star', 'strawberry', 'sun', 'tree', 'tulip', 'umbrella', 'zzz'];

function play(cardAmount, chosenLevel) {
  document.querySelector('.level-selector-container').style.display="none";
  gridDisplay.style.display="grid";
  gridDisplay.style.gridTemplateColumns=`repeat(${cardAmount / 2}, 1fr)`;
  gridDisplay.innerHTML = '';

  cardsOnBoard = [];
  moves = 0;

  // Choosing level difficulty
  if (chosenLevel === "easy") {
    levelDisplay.innerHTML = '★';
  } else if (chosenLevel === "medium") {
    levelDisplay.innerHTML = '★★';
  } else {
    levelDisplay.innerHTML = '★★★';
  }

  decideCards(cardAmount);
  createBoard();
}

// Randomizes the card options and then chooses the first 'cardAmount' amount
function decideCards(cardAmount) {
  cardOptions.sort(()=> 0.5 - Math.random());

  for (let i = 0; i < cardAmount; i++) {
    cardsOnBoard[i] = { name: cardOptions[i], img: `images/${cardOptions[i]}.png`};
    cardsOnBoard[i + cardAmount] = { name: cardOptions[i], img: `images/${cardOptions[i]}.png`};
  }

  cardsOnBoard.sort(()=> 0.5 - Math.random());
}

// Creates the board for the game with the chosen cards, starting them all off face-down
function createBoard() {


  for (let i = 0; i < cardsOnBoard.length; i++) {
    const cardElement = document.createElement('div');

    cardElement.innerHTML = `
      <div class="card">
        <img src="images/${cardOptions[i]}.png" class="back">
        <img src="images/back.png" class="front">
      </div>
    `;
  
    cardElement.classList.add("card-container");
    gridDisplay.append(cardElement);

    cardElement.addEventListener("click", ()=>{
      cardElement.firstElementChild.style.transform = "rotateY(180deg)";
    })
  }
}
// Main game variables


const gridDisplay = document.querySelector('.grid');
const scoreContainer = document.querySelector('.score-container');

let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

let level = null;

let moves = 0;
let newHighScore = false;

let cardsOnBoard = [];
const cardOptions = ['apple', 'balloon', 'bow', 'butterfly', 'candy', 'cloud', 'clover', 'crown', 'diamond', 'egg', 'exclamation', 'fish', 'flower', 'ghost', 'grape', 'heart', 'icecream', 'moon', 'mug', 'mushroom', 'musicnote', 'orange', 'planet', 'present', 'snowflake', 'star', 'strawberry', 'sun', 'tree', 'tulip', 'umbrella', 'zzz'];

function play(cardAmount, chosenLevel) {
  document.querySelector('.level-selector-container').style.display="none";
  gridDisplay.style.display="grid";
  gridDisplay.style.gridTemplateColumns=`repeat(${cardAmount / 2}, 1fr)`;
  gridDisplay.innerHTML = '';
  resetTimer();

  scoreContainer.style.display="block";
  startTimer();

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
    cardsOnBoard[i] = { name: cardOptions[i], img: `../images/${cardOptions[i]}.png`};
    cardsOnBoard[i + cardAmount] = { name: cardOptions[i], img: `../images/${cardOptions[i]}.png`};
  }

  cardsOnBoard.sort(()=> 0.5 - Math.random());
}

// Creates the board for the game with the chosen cards, starting them all off face-down
function createBoard() {


  for (let i = 0; i < cardsOnBoard.length; i++) {
    const cardElement = document.createElement('div');

    cardElement.innerHTML = `
      <div class="card">
        <img src="images/${cardsOnBoard[i].name}.png" class="back">
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
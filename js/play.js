// Creates the variables for the main game and runs a round
const gridDisplay = document.querySelector('.grid');
const scoreContainer = document.querySelector('.score-container');

let cardsChosen = [];
let cardsWon = [];

let level = null;
let moves = 0;
let newHighScore = false;

let cardsOnBoard = [];
const cardOptions = ['apple', 'balloon', 'bow', 'butterfly', 'candy', 'cloud', 'clover', 'crown', 'diamond', 'egg', 'exclamation', 'fish', 'flower', 'ghost', 'grape', 'heart', 'icecream', 'moon', 'mug', 'mushroom', 'musicnote', 'orange', 'planet', 'present', 'snowflake', 'star', 'strawberry', 'sun', 'tree', 'tulip', 'umbrella', 'zzz'];

function play(cardAmount, chosenLevel) {
  document.querySelector('.level-selector-container').style.display="none";
  gridDisplay.style.display="grid";
  scoreContainer.style.display="block";

  if (chosenLevel === "hard" && window.innerWidth > 450) {
    gridDisplay.style.gridTemplateColumns=`repeat(6, 1fr)`;
  } else {
    gridDisplay.style.gridTemplateColumns=`repeat(4, 1fr)`;
  }
  
  // Resetting
  gridDisplay.innerHTML = '';
  cardsOnBoard = [];
  moves = 0;
  newHighScore = false;
  resetTimer();

  level = chosenLevel;
  if (chosenLevel === "easy") {
    levelDisplay.innerHTML = '★';
  } else if (chosenLevel === "medium") {
    levelDisplay.innerHTML = '★★';
  } else {
    levelDisplay.innerHTML = '★★★';
  }

  moveDisplay.innerHTML = `<span class="highlight-text">MOVES:</span> ${moves}`

  startTimer();

  decideCards(cardAmount);
  createBoard();
}

// Randomizes card options and then chooses the first n cards, depending on level
function decideCards(cardAmount) {
  cardOptions.sort(()=> 0.5 - Math.random());

  for (let i = 0; i < cardAmount; i++) {
    cardsOnBoard[i] = { name: cardOptions[i], img: `../images/${cardOptions[i]}.png`};
    cardsOnBoard[i + cardAmount] = { name: cardOptions[i], img: `../images/${cardOptions[i]}.png`};
  }

  cardsOnBoard.sort(()=> 0.5 - Math.random());
}

// Creates board for the game with the chosen cards, starting them all off face-down
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
    cardElement.setAttribute("data-id", i);

    cardElement.addEventListener("click", flipCard)
    
    gridDisplay.append(cardElement);
  }
}

// Reveals card to user and prepares to compare chosen cards
function flipCard() {
  this.style.boxShadow = "none";
  this.firstElementChild.style.transform = "rotateY(180deg)";

  let id= this.getAttribute('data-id');
  const name = cardsOnBoard[id].name;
  cardsChosen.push({name, id});
  
  if (cardsChosen.length === 2) {
    setTimeout(()=> {
      checkMatch(), 200
    });
  }
}

// Checks to see if the two chosen cards are a match
function checkMatch() {
  const cards = document.querySelectorAll('.grid > .card-container');

  const cardOne = cardsChosen[0];
  const cardTwo = cardsChosen[1];

  const cardOneElement = cards[cardOne.id];
  const cardTwoElement = cards[cardTwo.id];

  // Player clicked on the same card twice
  if (cardOne.id === cardTwo.id) {
    cardOneElement.firstElementChild.style.transform = "none";
  } else {
    if (cardOne.name === cardTwo.name) {
      // It's a match!
      setTimeout(()=> {
        cardOneElement.classList.add('matches');
        cardTwoElement.classList.add('matches');

        cardOneElement.removeEventListener('click', flipCard);
        cardTwoElement.removeEventListener('click', flipCard);

        cardOneElement.firstElementChild.style.cursor = "auto";
        cardTwoElement.firstElementChild.style.cursor = "auto";
      }, 800);

      cardsWon.push(cardsChosen);

    } else {
      // Not a match => flip them back over
      setTimeout(() => {
        cardOneElement.firstElementChild.style.transform = "none";
        cardTwoElement.firstElementChild.style.transform = "none";
      }, 800);
    }
  }
  // Resets the chosen cards for the next two flipped
  cardsChosen = [];

  if (cardsWon.length === cardsOnBoard.length/2) {
    setTimeout(()=> {
      cardsWon = [];
      win();
    }, 800);
  }

  moves++;
  moveDisplay.innerHTML = `<span class="highlight-text">MOVES:</span> ${moves}`;
}

// Once the player wins, it displays the final time and amount of moves, then asks if the player would like to play again.
function win() {
  stopTimer();
  roundTime = displayTime();
  
  gridDisplay.style.display="none";
  document.querySelector('.score-container').style.display = "none";

  const winDisplay = document.querySelector(".win-display");
  winDisplay.style.display = "flex";
  winDisplay.innerHTML = '';

  // Setting up dancing text
  let youWonLetters = ["☆","✦","Y","O","U&nbsp","W","O","N","!","!","✦","☆"];
  let youWonText = document.createElement("h2");

  for (let i = 0; i < youWonLetters.length; i++) {
    if(i === 0 || i === 10) {
      youWonText.innerHTML += `<span style="--i:${i}; color:#8ed7f0">${youWonLetters[i]}</span>`;
    } else if (i === 1) {
      youWonText.innerHTML += `<span style="--i:${i}; color:#afd67e">${youWonLetters[i]}</span>`;
    } else if (i === 11) {
      youWonText.innerHTML += `<span style="--i:${i}; color:#F385AC">${youWonLetters[i]}</span>`;
    } else {
      youWonText.innerHTML += `<span style="--i:${i};">${youWonLetters[i]}</span>`;
    }
  }
  youWonText.classList.add("you-won-text");
  winDisplay.appendChild(youWonText);

  // Creating display for user
  winDisplay.innerHTML += `
      <p> <span class="highlight-text">Total time:</span> ${roundTime}</p>
      <p> <span class="highlight-text">Total moves:</span> ${moves}</p>
      <p class="new-high-score"></p>
      <i class="fa-solid fa-rotate-left play-again"></i>
    `;

  console.log("win screen");
  saveScore();

  newHighScore? document.querySelector('.new-high-score').innerHTML = `NEW HIGH SCORE!!` : document.querySelector('.new-high-score').innerHTML = ``;

  const playAgain = document.querySelector('.play-again');
  playAgain.addEventListener('click', () => {
    winDisplay.style.display = "none";
    document.querySelector('.level-selector-container').style.display="block";
    showHighScores();
  });
}

// Returns user to the level select screen
const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', ()=> {
  gridDisplay.style.display = "none";
  document.querySelector('.score-container').style.display = "none";
  document.querySelector('.level-selector-container').style.display="block";
  showHighScores();
});
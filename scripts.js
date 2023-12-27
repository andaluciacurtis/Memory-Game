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






function play(cardAmount, chosenLevel) {
  document.querySelector('.level-selector-container').style.display="none";


  gridDisplay.style.display="flex";
  gridDisplay.innerHTML = '';
}
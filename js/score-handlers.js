const bestEasyContainer = document.querySelector('.best-easy-score');
const bestMediumContainer = document.querySelector('.best-medium-score');
const bestHardContainer = document.querySelector('.best-hard-score');

let easyHighScore = JSON.parse(localStorage.getItem('easyHighScore')) || null;
let mediumHighScore = JSON.parse(localStorage.getItem('mediumHighScore')) || null;
let hardHighScore = JSON.parse(localStorage.getItem('hardHighScore')) || null;

// Fetches data from previous games to display below the difficulty selectors
// If there are no previous games, then nothing is displayed.
function showHighScores() {
  if (easyHighScore != null) {
    bestEasyContainer.style.display = "block";
    bestEasyContainer.style.opacity = "0";
    bestEasyContainer.style.backgroundColor = "#8ed7f0";
    bestEasyContainer.style.outline = "3px solid #8ed7f0";

    bestEasyContainer.innerHTML = `
      <p class="high-score-text">HIGH SCORE</p>
      <p>Moves:${easyHighScore.moves}</p>
      <p>Time:${easyHighScore.time}</p>
    `;
  } else {
    bestEasyContainer.style.display = "none";
  }

  if (mediumHighScore != null) {
    bestMediumContainer.style.display = "block";
    bestMediumContainer.style.opacity = "0";
    bestMediumContainer.style.backgroundColor = "#afd67e";
    bestMediumContainer.style.outline = "3px solid #afd67e";

    bestMediumContainer.innerHTML = `
      <p class="high-score-text">HIGH SCORE</p>
      <p>Moves:${mediumHighScore.moves}</p>
      <p>Time:${mediumHighScore.time}</p>
    `;
  } else {
    bestMediumContainer.style.display = "none";
  }

  if (hardHighScore != null) {
    bestHardContainer.style.display = "block";
    bestHardContainer.style.opacity = "0";
    
    bestHardContainer.style.backgroundColor = "#f286b6";
    bestHardContainer.style.outline = "3px solid #f286b6";

    bestHardContainer.innerHTML = `
      <p class="high-score-text">HIGH SCORE</p>
      <p>Moves:${hardHighScore.moves}</p>
      <p>Time:${hardHighScore.time}</p>
    `;
  } else {
    bestHardContainer.style.display = "none";
  }
}

// Saves score to the player's local storage so it can be displayed next time they play
function saveScore() {
  console.log("saving score");
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
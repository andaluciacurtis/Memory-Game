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
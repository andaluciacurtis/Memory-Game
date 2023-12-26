const playButton = document.querySelector('.play-button');


playButton.addEventListener('click', ()=> {
  playButton.style.display = 'none';
  document.querySelector('.level-selector-container').style.display="block";
  //showHighScores();
});
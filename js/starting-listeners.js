// Includes the listeners for the start button as well as level select
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', ()=> {
  playButton.style.display = 'none';
  document.querySelector('.level-selector-container').style.display="block";
  showHighScores();
});

const selectorText = document.querySelector(".selector-text");

const easyButton = document.querySelector('.easy-button');

easyButton.addEventListener('click', ()=> {play(6, 'easy')});

easyButton.addEventListener('mouseover', ()=> {
  selectorText.innerHTML = 'EASY';
  selectorText.style.color = "#8ed7f0";
  selectorText.style.fontWeight = "bold";
  bestEasyContainer.style.opacity = "100%";
});
easyButton.addEventListener('mouseout', ()=> {
  selectorText.innerHTML = 'Choose your fate!';
  selectorText.style.color = "white";
  selectorText.style.fontWeight = "normal";
  bestEasyContainer.style.opacity = "0";
});

const mediumButton = document.querySelector('.medium-button');

mediumButton.addEventListener('click', ()=> {play(8, 'medium')});

mediumButton.addEventListener('mouseover', ()=> {
  selectorText.innerHTML = 'MEDIUM';
  selectorText.style.color = "#afd67e";
  selectorText.style.fontWeight = "bold";
  bestMediumContainer.style.opacity = "100%";
});

mediumButton.addEventListener('mouseout', ()=> {
  selectorText.innerHTML = 'Choose your fate!';
  selectorText.style.color = "white";
  selectorText.style.fontWeight = "normal";
  bestMediumContainer.style.opacity = "0";
});

const hardButton = document.querySelector('.hard-button');

hardButton.addEventListener('click', ()=> {play(12, 'hard')});

hardButton.addEventListener('mouseover', ()=> {
  selectorText.innerHTML = 'HARD';
  selectorText.style.color = "#f286b6";
  selectorText.style.fontWeight = "bold";
  bestHardContainer.style.opacity = "100%";
});

hardButton.addEventListener('mouseout', ()=> {
  selectorText.innerHTML = 'Choose your fate!';
  selectorText.style.color = "white";
  selectorText.style.fontWeight = "normal";
  bestHardContainer.style.opacity = "0";
});
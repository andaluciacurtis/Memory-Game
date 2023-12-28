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
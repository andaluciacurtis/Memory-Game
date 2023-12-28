// Script for the timer

let [seconds, minutes, hours] = [0,0,0];
let timer = null;
let roundTime = 0;

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
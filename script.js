const numberButtons = document.querySelectorAll(".number-key");
const clearButton = document.querySelector("#clear");
const setTimerButton = document.querySelector("#set-timer");
const settingsButton = document.querySelector("#settings-button");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
const pauseButton = document.querySelector("#pause-button");
const darkButton = document.querySelector("#dark-mode-button");

let time = "000000";
let myTimer;

document.querySelector("#date-input").value = displayDate();

//  Executes the currentTime function every 1 second to display the time
setInterval(() => {
  document.querySelector(".current-time-output").textContent = currentTime();
}, 1000);

//  Event listener for dark mode button
darkButton.addEventListener("click", () => {
  const root = document.documentElement;

  let newTheme = root.className === "light" ? "dark" : "light";

  root.className = newTheme;
  darkButton.textContent = newTheme[0].toUpperCase() + newTheme.slice(1, newTheme.length);
});

//  Event listener for numerical buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputTime(button["value"]);
  });
});

//  Event listener for clear button
clearButton.addEventListener("click", () => {
  clear();
  displayTime();
});

//  Event listener for set button
setTimerButton.addEventListener("click", () => {
  setOutput();
  displayTimeTitle();
});

//  Event listener for settings button
settingsButton.addEventListener("click", () => {
  displaySettings();
  stopTimer();
});

//  Event listener for start-button
startButton.addEventListener("click", () => {
  if (startButton["value"] === "false") {
    startButton["value"] = "true";
    myTimer = setInterval(timer, 1000);
  } else {
    stopTimer();
  }
});

//  Event listener for reset button
resetButton.addEventListener("click", () => {
  stopTimer();
  resetTimer();
  displayTimeTitle();
});

//  Function inputTime (value) - processes input of numerical values
function inputTime(value) {
  time = `${time.slice(1, 6)}${value}`;
  displayTime();
}

/*  Function displayTime() - 
    Retrieves the time from let time and displays it to appropriate HTML elements */
function displayTime() {
  document.querySelector(".hours").textContent = time.slice(0, 2);
  document.querySelector(".minutes").textContent = time.slice(2, 4);
  document.querySelector(".seconds").textContent = time.slice(4, 6);
}

//  Function getDate() - Retrieves the date to be displayed in the date input box
function displayDate() {
  const date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekDay = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${weekDay}, ${day} ${month} ${year}`;
}

// Function setOutput() - Sets the labels and timer on the output screen
function setOutput() {
  document.querySelector(".timer-hours").textContent =
    document.querySelector(".hours").textContent;

  document.querySelector(".timer-minutes").textContent =
    document.querySelector(".minutes").textContent;

  document.querySelector(".timer-seconds").textContent =
    document.querySelector(".seconds").textContent;

  document.querySelector(".subject-output").textContent =
    document.querySelector("#subject-input").value;

  document.querySelector(".venue-output").textContent =
    document.querySelector("#venue-input").value;

  document.querySelector(".date-output").textContent =
    document.querySelector("#date-input").value;

  document.querySelector(".timer-display-container").style.display = "flex";
  document.querySelector(".main-container").style.display = "none";
}

//  Function displaySettings() - Displays the settings menu and hides the timer display
function displaySettings() {
  document.querySelector(".timer-display-container").style.display = "none";
  document.querySelector(".main-container").style.display = "flex";
  document.querySelector("#pageTitle").textContent = "Exam Timer";
}

//  Function currentTime() - Returns the time at the given moment
function currentTime() {
  const date = new Date();

  let hours;
  let minutes;
  let seconds;

  if (date.getHours() < 10) hours = `0${date.getHours()}`;
  else hours = date.getHours();

  if (date.getMinutes() < 10) minutes = `0${date.getMinutes()}`;
  else minutes = date.getMinutes();

  if (date.getSeconds() < 10) seconds = `0${date.getSeconds()}`;
  else seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}

//  function timer() - Counts down the time indicated on the timer display
function timer() {
  if (time === "000000") return;

  const hoursTimer = document.querySelector(".timer-hours").textContent;
  const minutesTimer = document.querySelector(".timer-minutes").textContent;
  const secondsTimer = document.querySelector(".timer-seconds").textContent;

  let hours = parseInt(hoursTimer) * 60 * 60 * 1000;
  let minutes = parseInt(minutesTimer) * 60 * 1000;
  let seconds = parseInt(secondsTimer) * 1000;

  const milliseconds = hours + minutes + seconds - 1000;

  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  if (hours < 10) hoursTimer = `0${hours}`;
  else hoursTimer = hours;

  if (minutes < 10) minutesTimer = `0${minutes}`;
  else minutesTimer = minutes;

  if (seconds < 10) secondsTimer = `0${seconds}`;
  else secondsTimer = seconds;

  time = `${hoursTimer}${minutesTimer}${secondsTimer}`;
  displayTimeTitle();
  if (milliseconds === 0) clearInterval(myTimer);
}

//  function stopTimer() - Stops the timer function
function stopTimer() {
  clearInterval(myTimer);
  startButton["value"] = "false";
}

//  function resetTimer() - Resets the timer value
function resetTimer() {
  hours = document.querySelector(".hours").textContent;
  minutes = document.querySelector(".minutes").textContent;
  seconds = document.querySelector(".seconds").textContent;

  document.querySelector(".timer-hours").textContent = hours;
  document.querySelector(".timer-minutes").textContent = minutes;
  document.querySelector(".timer-seconds").textContent = seconds;

  startButton["value"] = "false";

  time = `${hours}${minutes}${seconds}`;
}

//  Function clear() - Clears the input and resets the time to 00:00:00
function clear() {
  time = "000000";
  document.querySelector("#subject-input").value = "";
  document.querySelector("#venue-input").value = "";
  document.querySelector("#date-input").value = displayDate();
}

//  Function displayTimeTitle () - displays the time left on the timer in the page title bar on the browser
function displayTimeTitle() {
  document.querySelector("#pageTitle").textContent =
    "Exam Timer - " + document.querySelector(".timer-display-output").textContent;
}

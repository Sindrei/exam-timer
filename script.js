const numberButtons = document.querySelectorAll(".number-key");
const clearButton = document.querySelector("#clear");
const setTimerButton = document.querySelector("#set-timer");
const settingsButton = document.querySelector("#settings-button");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
const pauseButton = document.querySelector("#pause-button");

let time = "000000";
let myTimer;

document.querySelector("#date-input").value = displayDate();

//  Executes the currentTime function every 1 second to display the time
const myClock = setInterval(currentTime, 1000);

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
setTimerButton.addEventListener("click", setOutput);

//  Event listener for settings button
settingsButton.addEventListener("click", () => {
  displaySettings();
  stopTimer();
});

//  Event listener for start-button
startButton.addEventListener("click", () => {
  myTimer = setInterval(timer, 1000);
  startButton.disabled = true;
});

//  Event listener for reset button
resetButton.addEventListener("click", () => {
  stopTimer();
  resetTimer();
});

//  Event listener for pause button
pauseButton.addEventListener("click", stopTimer);

//  Function inputTime (value) - processes input of numerical values
function inputTime(value) {
  time = `${time.slice(1, 6)}${value}`;
  displayTime();
}

/*  Function displayTime() - 
    Retrieves the time from let time and displays it to appropriate HTML elements */
function displayTime() {
  const hours = document.querySelector(".hours");
  const minutes = document.querySelector(".minutes");
  const seconds = document.querySelector(".seconds");

  hours.textContent = time.slice(0, 2);
  minutes.textContent = time.slice(2, 4);
  seconds.textContent = time.slice(4, 6);
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
  const hours = document.querySelector(".timer-hours");
  hours.textContent = document.querySelector(".hours").textContent;

  const minutes = document.querySelector(".timer-minutes");
  minutes.textContent = document.querySelector(".minutes").textContent;

  const seconds = document.querySelector(".timer-seconds");
  seconds.textContent = document.querySelector(".seconds").textContent;

  const subject = document.querySelector("#subject-input").value;
  document.querySelector(".subject-output").textContent = subject;

  const venue = document.querySelector("#venue-input").value;
  document.querySelector(".venue-output").textContent = venue;

  const date = document.querySelector("#date-input").value;
  document.querySelector(".date-output").textContent = date;

  document.querySelector(".timer-display-container").style.display = "flex";
  document.querySelector(".main-container").style.display = "none";
}

//  Function displaySettings() - Displays the settings menu and hides the timer display
function displaySettings() {
  document.querySelector(".timer-display-container").style.display = "none";
  document.querySelector(".main-container").style.display = "flex";
}

//  Function currentTime() - Returns the time at the given moment
function currentTime() {
  const date = new Date();

  const hoursDisplay = document.querySelector(".time-hours");
  const minutesDisplay = document.querySelector(".time-minutes");
  const secondsDisplay = document.querySelector(".time-seconds");

  if (date.getHours < 10) hoursDisplay.textContent = `0${date.getHours()}`;
  else hoursDisplay.textContent = date.getHours();

  if (date.getMinutes() < 10)
    minutesDisplay.textContent = `0${date.getMinutes()}`;
  else minutesDisplay.textContent = date.getMinutes();

  if (date.getSeconds() < 10)
    secondsDisplay.textContent = `0${date.getSeconds()}`;
  else secondsDisplay.textContent = date.getSeconds();
}

//  function timer() - Counts down the time indicated on the timer display
function timer() {
  if (time === "000000") return;

  const hoursTimer = document.querySelector(".timer-hours");
  const minutesTimer = document.querySelector(".timer-minutes");
  const secondsTimer = document.querySelector(".timer-seconds");

  let hours = parseInt(hoursTimer.textContent) * 60 * 60 * 1000;
  let minutes = parseInt(minutesTimer.textContent) * 60 * 1000;
  let seconds = parseInt(secondsTimer.textContent) * 1000;

  const milliseconds = hours + minutes + seconds - 1000;

  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  if (hours < 10) hoursTimer.textContent = `0${hours}`;
  else hoursTimer.textContent = hours;

  if (minutes < 10) minutesTimer.textContent = `0${minutes}`;
  else minutesTimer.textContent = minutes;

  if (seconds < 10) secondsTimer.textContent = `0${seconds}`;
  else secondsTimer.textContent = seconds;

  time = `${hoursTimer.textContent}${minutesTimer.textContent}${secondsTimer.textContent}`;
  if (milliseconds === 0) clearInterval(myTimer);
}

//  function stopTimer() - Stops the timer function
function stopTimer() {
  clearInterval(myTimer);
  startButton.disabled = false;
}

//  function resetTimer() - Resets the timer value
function resetTimer() {
  hours = document.querySelector(".hours").textContent;
  minutes = document.querySelector(".minutes").textContent;
  seconds = document.querySelector(".seconds").textContent;

  document.querySelector(".timer-hours").textContent = hours;
  document.querySelector(".timer-minutes").textContent = minutes;
  document.querySelector(".timer-seconds").textContent = seconds;

  time = `${hours}${minutes}${seconds}`;
}

//  Function clear() - Clears the input and resets the time to 00:00:00
function clear() {
  time = "000000";
  document.querySelector("#subject-input").value = "";
  document.querySelector("#venue-input").value = "";
  document.querySelector("#date-input").value = displayDate();
}

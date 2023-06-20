const numberButtons = document.querySelectorAll(".number-key");
const clearButton = document.querySelector("#clear");
const setTimerButton = document.querySelector("#set-timer");
const settingsButton = document.querySelector("#settings-button");

let time = "000000";

document.querySelector("#date-input").value = displayDate();

//  Executes the currentTime function every 1 second to display the time
setInterval(currentTime, 1000);

//  Event listener for numerical buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputTime(button["value"]);
  });
});

//  Event listener for clear button
clearButton.addEventListener("click", () => {
  time = "000000";
  displayTime();
});

//  Event listener for set button
setTimerButton.addEventListener("click", setOutput);

//  Event listener for settings button
settingsButton.addEventListener("click", displaySettings);

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

const numberButtons = document.querySelectorAll(".number-key");
const clearButton = document.querySelector("#clear");

let time = "000000";

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

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

document.querySelector("#date-input").value = displayDate();

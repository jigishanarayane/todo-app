// COUNTER APP
let count = 0;

let display = document.getElementById("counter-display");
let countBtn = document.getElementById("count-btn");
let resetBtn = document.getElementById("reset-btn");

countBtn.addEventListener("click", function() {
  count = count + 1;
  display.textContent = count;
});

resetBtn.addEventListener("click", function() {
  count = 0;
  display.textContent = count;
});

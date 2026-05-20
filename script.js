let tasks = [];
let currentFilter = "all";

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = document.getElementById("task-list");
let taskCount = document.getElementById("task-count");
let clearBtn = document.getElementById("clear-btn");
let allBtn = document.getElementById("all-btn");
let activeBtn = document.getElementById("active-btn");
let completedBtn = document.getElementById("completed-btn");

// ADD TASK ON BUTTON CLICK
addBtn.addEventListener("click", function() {
  addTask();
});

// ADD TASK ON ENTER KEY
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  let text = taskInput.value.trim();
  if (text === "") return;

  let task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

// RENDER TASKS
function renderTasks() {
  taskList.innerHTML = "";

  let filtered = tasks.filter(function(task) {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  if (filtered.length === 0) {
    taskList.innerHTML = "<p class='empty-message'>No tasks here!</p>";
  }

  filtered.forEach(function(task) {
    let li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}" />
      <span class="task-text ${task.completed ? "done" : ""}">${task.text}</span>
      <button class="delete-btn" data-id="${task.id}">✕</button>
    `;

    taskList.appendChild(li);
  });

  // CHECKBOX EVENTS
  document.querySelectorAll(".task-item input[type='checkbox']").forEach(function(cb) {
    cb.addEventListener("change", function() {
      let id = parseInt(this.dataset.id);
      tasks = tasks.map(function(task) {
        if (task.id === id) task.completed = !task.completed;
        return task;
      });
      renderTasks();
    });
  });

  // DELETE EVENTS
  document.querySelectorAll(".delete-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      let id = parseInt(this.dataset.id);
      tasks = tasks.filter(function(task) {
        return task.id !== id;
      });
      renderTasks();
    });
  });

  // UPDATE COUNT
  let remaining = tasks.filter(function(t) { return !t.completed; }).length;
  taskCount.textContent = remaining + " task" + (remaining !== 1 ? "s" : "") + " remaining";
}

// FILTER BUTTONS
allBtn.addEventListener("click", function() {
  currentFilter = "all";
  setActiveFilter(allBtn);
  renderTasks();
});

activeBtn.addEventListener("click", function() {
  currentFilter = "active";
  setActiveFilter(activeBtn);
  renderTasks();
});

completedBtn.addEventListener("click", function() {
  currentFilter = "completed";
  setActiveFilter(completedBtn);
  renderTasks();
});

function setActiveFilter(btn) {
  document.querySelectorAll(".filter-btn").forEach(function(b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}

// CLEAR COMPLETED
clearBtn.addEventListener("click", function() {
  tasks = tasks.filter(function(task) { return !task.completed; });
  renderTasks();
});

// INITIAL RENDER
renderTasks();

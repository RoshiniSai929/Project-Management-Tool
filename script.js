const taskForm = document.getElementById("taskForm");
const taskTableBody = document.getElementById("taskTableBody");
const searchInput = document.getElementById("searchInput");

let tasks = [];

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const userNameInput = document.getElementById("userNameInput");
  const taskNumberInput = document.getElementById("taskNumberInput");
  const taskDescriptionInput = document.getElementById("taskDescriptionInput");

  const userName = userNameInput.value;
  const taskNumber = parseInt(taskNumberInput.value);
  const taskDescription = taskDescriptionInput.value;
  const taskStatus = "Progress";
  const startTime = "";
  const endTime = "";

  const newTask = {
    userName,
    taskNumber,
    taskDescription,
    taskStatus,
    startTime,
    endTime,
  };

  tasks.unshift(newTask); // Add to the beginning of the array

  taskForm.reset();
  renderTasks();
});

searchInput.addEventListener("input", function () {
  searchTasks();
});

function renderTasks(filteredTasks = tasks) {
  taskTableBody.innerHTML = "";

  filteredTasks.forEach(function (task) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.userName}</td>
      <td>${task.taskNumber}</td>
      <td>${task.taskDescription}</td>
      <td>${task.taskStatus}</td>
      <td>${task.startTime}</td>
      <td>${task.endTime}</td>
      <td>
        <button class="startButton" onclick="startTask('${task.userName}', ${task.taskNumber})">Start</button>
        <button class="stopButton" onclick="stopTask('${task.userName}', ${task.taskNumber})">Stop</button>
        <button class="completeButton" onclick="completeTask('${task.userName}', ${task.taskNumber})">Complete</button>
        <button class="deleteButton" onclick="deleteTask('${task.userName}', ${task.taskNumber})">Delete</button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

function startTask(userName, taskNumber) {
  const task = tasks.find(task => task.userName === userName && task.taskNumber === taskNumber && task.taskStatus !== "Done");
  if (task) {
    task.taskStatus = "In Progress";
    task.startTime = getCurrentTime();
    renderTasks();
  }
}

function stopTask(userName, taskNumber) {
  const task = tasks.find(task => task.userName === userName && task.taskNumber === taskNumber && task.taskStatus === "In Progress");
  if (task) {
    task.taskStatus = "Paused";
    renderTasks();
  }
}

function completeTask(userName, taskNumber) {
  const task = tasks.find(task => task.userName === userName && task.taskNumber === taskNumber && task.taskStatus !== "Done");
  if (task) {
    task.taskStatus = "Done";
    task.endTime = getCurrentTime();
    renderTasks();
  }
}

function deleteTask(userName, taskNumber) {
  tasks = tasks.filter(task => !(task.userName === userName && task.taskNumber === taskNumber));
  renderTasks();
}

function searchTasks() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTasks = tasks.filter(task => task.userName.toLowerCase().includes(searchTerm));
  renderTasks(filteredTasks);
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

renderTasks();

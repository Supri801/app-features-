document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = { id: Date.now(), text: taskText };
    saveTaskToLocalStorage(task);

    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    let li = document.createElement("li");
    li.dataset.id = task.id;
    li.innerHTML = `
        ${task.text}
        <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
    `;
    taskList.appendChild(li);
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.querySelector(`[data-id='${taskId}']`).remove();
}

function clearAllTasks() {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(renderTask);
}

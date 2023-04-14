'use strict'

let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let allTasksButton = document.querySelector('#all-tasks');
let activeTasks = document.querySelector('#active-tasks');
let completedTasks = document.querySelector('#completed-tasks');
let taskList = document.querySelector(".task-list");
let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);
allTasksButton.addEventListener("click", showAllTasks);
activeTasks.addEventListener("click", showActiveTasks);
completedTasks.addEventListener("click", showCompletedTasks);

function addTaskHandler() {
	if (taskNameInput.value) {
		if (!startMessage.hidden) startMessage.hidden = true;

		let newTask = new Task(taskNameInput.value);
		newTask.createEl(taskList);
		tasks.push(newTask);

		taskNameInput.value = "";
	} else {
		alert("введите имя задачи");
	}
}

function showAllTasks() {
	taskList.innerHTML = '';
	tasks.filter(task => !task.isDeleted).forEach(task => { task.createEl(taskList) });
}
function showActiveTasks() {
	taskList.innerHTML = '';
	tasks.filter(task => !task.isDeleted && task.isDone == false).forEach(task => { task.createEl(taskList) });
}
function showCompletedTasks() {
	taskList.innerHTML = '';
	tasks.filter(task => !task.isDeleted && task.isDone != false).forEach(task => { task.createEl(taskList) });
}

class Task {
	constructor(text) {
		this.text = text;
		this.isDone = false;
		this.isDeleted = false;
		this.div = null;
	}
	createEl(element) {
		this.div = document.createElement("div");
		this.div.classList.add('task');

		let input = document.createElement("input");
		input.addEventListener("click", () => this.changeState(this.div));
		input.type = "checkbox";

		let p = document.createElement("p");
		p.innerText = this.text;

		let btn = document.createElement('button');
		btn.textContent = 'Delete';
		btn.classList.add('delete')
		btn.addEventListener('click', () => this.remove())

		this.div.append(input);
		this.div.append(p);
		this.div.append(btn)

		if (this.isDone) {
			this.div.classList.add("completed");
			input.checked = true;
		}
		element.append(this.div);

		this.remove = () => {
			this.isDeleted = true;
			this.div.remove();
		};
	}
	changeState(event) {
		this.isDone = !this.isDone;
		event.classList.toggle('completed')
	}
}

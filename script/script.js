'use strict'

let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let taskList = document.querySelector(".task-list");

addTaskButton.addEventListener("click", addTaskHandler);

function createTask(text) {
	let div = document.createElement("div");
	div.classList.add("task");

	let input = document.createElement("input");
	input.addEventListener("click", changeTaskState);
	input.type = "checkbox";

	let p = document.createElement("p");
	p.innerText = text;

	div.append(input);
	div.append(p);

	return div;
}

function changeTaskState() {
	if (this.checked) {
		this.parentElement.classList.add("completed");
	} else {
		this.parentElement.classList.remove("completed");
	}
}

function addTaskHandler() {
	if (taskNameInput.value) {
		if (!startMessage.hidden) startMessage.hidden = true;

		let newTask = createTask(taskNameInput.value);
		taskList.append(newTask);
		let btnDelete = document.createElement('button');
		btnDelete.textContent = 'Видалити';
		btnDelete.classList.add('delete');
		btnDelete.addEventListener('click', function () {
			newTask.remove();
			btnDelete.remove();
		})

		taskList.append(btnDelete);
		taskNameInput.value = "";
	} else {
		alert("введите имя задачи");
	}
}
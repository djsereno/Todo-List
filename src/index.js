import './style.css';
import Task from './task';

const tasks = [];

const addTaskForm = (() => {
  const form = document.createElement('form');

  const titleInput = document.createElement('input');
  titleInput.setAttribute('placeholder', 'Add a task');
  form.appendChild(titleInput);

  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.setAttribute('type', 'button');
  form.appendChild(cancelButton);

  const submitButton = document.createElement('button');
  submitButton.innerText = 'Add Task';
  submitButton.setAttribute('type', 'button');
  form.appendChild(submitButton);

  function createNewTask() {
    if (titleInput.value === '') return;
    const task = Task(titleInput.value);
    tasks.push(task);
    console.log(tasks);
  }
  submitButton.addEventListener('click', createNewTask);

  return form;
})();

document.body.appendChild(addTaskForm);

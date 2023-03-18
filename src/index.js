import './style.css';
import Project from './project';
import Task from './task';

const defaultProject = Project('My Project');
const projects = [defaultProject];

const taskInput = document.querySelector('#task-input');
const addTaskButton = document.querySelector('#add-task-btn');
addTaskButton.addEventListener('click', () => {
  if (taskInput.value === '') return;
  const newTask = Task(taskInput.value);
  defaultProject.addTask(newTask);
  taskInput.value = '';
  console.log(defaultProject.getTaskTitles());
});

const projectsDOM = document.querySelector('.projects-list');
function refreshProjects() {
  projectsDOM.innerHTML = '';
  projects.forEach((project) => {
    const listItem = document.createElement('li');
    listItem.innerText = project.getTitle();
    projectsDOM.appendChild(listItem);
  });
}
refreshProjects();

const projectInput = document.querySelector('#project-input');
const addProjectButton = document.querySelector('#add-project-btn');
addProjectButton.addEventListener('click', () => {
  if (projectInput.value === '') return;
  const newProject = Project(projectInput.value);
  projects.push(newProject);
  projectInput.value = '';
  refreshProjects();
});


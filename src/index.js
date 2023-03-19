import './style.css';
import Project from './project';
import Task from './task';

// Dummy projects and tasks for debugging
const project1 = Project('Project 1');
project1.addTask(Task('Task a'));
project1.addTask(Task('Task b'));
project1.addTask(Task('Task c'));
const project2 = Project('Project 2');
project2.addTask(Task('Task d'));
const project3 = Project('Project 3');
project3.addTask(Task('Task e'));
project3.addTask(Task('Task f'));
const projects = [project1, project2, project3];
let currentProject = project1;

// const defaultProject = Project('My Project');
// const projects = [defaultProject];
// let currentProject = defaultProject;

const tasksDOM = (() => {
  const node = document.querySelector('.task-list');
  const titleInput = document.querySelector('#task-title');
  const descriptionInput = document.querySelector('#task-description');
  const priorityInput = document.querySelector('#task-priority');
  const dueDateInput = document.querySelector('#task-due-date');
  const addButton = document.querySelector('#add-task-btn');

  const clearForm = () => {
    titleInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
    dueDateInput.value = '';
  };

  const addTaskNode = (taskTitle) => {
    const listItem = document.createElement('li');
    listItem.innerText = taskTitle;
    listItem.classList.add('task-title');
    node.appendChild(listItem);
  };

  const handleClick = () => {
    if (titleInput.value === '') return;
    addTaskNode(titleInput.value);
    const newTask = Task(
      titleInput.value,
      descriptionInput.value,
      priorityInput.value,
      dueDateInput.value,
    );
    currentProject.addTask(newTask);
    newTask.showDetails();
    clearForm();
  };

  const refresh = () => {
    node.innerHTML = '';
    const tasks = currentProject.getTasks();
    tasks.forEach((task) => addTaskNode(task.getTitle()));
  };

  addButton.addEventListener('click', () => handleClick());
  refresh();

  return { refresh };
})();

const projectsDOM = (() => {
  const node = document.querySelector('.projects-list');
  const input = document.querySelector('#project-input');
  const addButton = document.querySelector('#add-project-btn');

  const setCurrentProject = (projectNode) => {
    const currentActiveNode = node.querySelector('.current');
    if (currentActiveNode) currentActiveNode.classList.remove('current');
    projectNode.classList.add('current');
    const index = projects.map((project) => project.getTitle()).indexOf(projectNode.innerText);
    currentProject = projects[index];
    tasksDOM.refresh();
    console.log(currentProject.getTitle());
  };

  const addProjectNode = (projectTitle) => {
    const listItem = document.createElement('li');
    listItem.innerText = projectTitle;
    listItem.classList.add('project-title');
    node.appendChild(listItem);
    listItem.addEventListener('click', (event) => setCurrentProject(event.currentTarget));
  };

  const handleClick = () => {
    if (input.value === '') return;
    if (projects.map((project) => project.getTitle()).indexOf(input.value) !== -1) {
      alert('Project already exists. Enter a new name.');
      return;
    }
    addProjectNode(input.value);
    const newProject = Project(input.value);
    projects.push(newProject);
    input.value = '';
  };

  const refresh = () => {
    node.innerHTML = '';
    projects.forEach((project) => addProjectNode(project.getTitle()));
    setCurrentProject(node.firstChild);
  };

  addButton.addEventListener('click', () => handleClick());
  refresh();

  return { refresh };
})();

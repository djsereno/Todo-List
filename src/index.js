import './style.css';
import Project from './project';
import Task from './task';

const defaultProject = Project('My Project');
const projects = [defaultProject];
let currentProject = defaultProject;

const tasksDOM = (() => {
  const node = document.querySelector('.task-list');
  const input = document.querySelector('#task-input');
  const addButton = document.querySelector('#add-task-btn');

  const addTaskNode = (taskTitle) => {
    const listItem = document.createElement('li');
    listItem.innerText = taskTitle;
    listItem.classList.add('task-title');
    node.appendChild(listItem);
  };

  const handleClick = () => {
    if (input.value === '') return;
    addTaskNode(input.value);
    const newTask = Task(input.value);
    currentProject.addTask(newTask);
    input.value = '';
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

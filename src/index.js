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

const projectsDOM = (() => {
  const node = document.querySelector('.projects-list');
  const input = document.querySelector('#project-input');
  const addButton = document.querySelector('#add-project-btn');

  const setCurrentProject = (projectNode) => {
    const currentProject = node.querySelector('.current');
    if (currentProject) currentProject.classList.remove('current');
    projectNode.classList.add('current');
  };

  const addProjectNode = (projectTitle) => {
    const listItem = document.createElement('li');
    listItem.innerText = projectTitle;
    node.appendChild(listItem);
    listItem.addEventListener('click', (event) => setCurrentProject(event.currentTarget));
  };

  const handleClick = () => {
    if (input.value === '') return;
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

  return { node, refresh };
})();

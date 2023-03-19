import './style.css';
import Project from './project';
import Task from './task';

// Dummy projects and tasks for debugging
const project1 = Project('Project');
project1.addTask(Task('Task a'));
project1.addTask(Task('Task b'));
project1.addTask(Task('Task c', 'simple task', '', '01-02-03'));
const project2 = Project('Project');
project2.addTask(Task('Task d', 'urgent task', 'very-high', '11-22-33'));
const project3 = Project('Project');
project3.addTask(Task('Task e'));
project3.addTask(Task('Task f'));
const projects = [project1, project2, project3];
let activeProject = project1;

// const defaultProject = Project('My Project');
// const projects = [defaultProject];
// let activeProject = defaultProject;

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

  const setActiveTask = (taskNode) => {
    const currentActiveNode = node.querySelector('.active');
    if (currentActiveNode) currentActiveNode.classList.remove('active');
    if (currentActiveNode === taskNode) return;
    taskNode.classList.add('active');
  };

  const addTaskNode = (task) => {
    const listItem = document.createElement('li');
    listItem.innerText = task.getTitle();
    listItem.classList.add('task-title');

    const detailsList = document.createElement('ul');
    detailsList.classList.add('task-details');
    listItem.appendChild(detailsList);

    const taskDetails = task.getDetails();
    Object.keys(taskDetails).forEach((key) => {
      if (key === 'title' || taskDetails[key] === null) return;
      const detailItem = document.createElement('li');
      detailItem.innerText = `${key}: ${taskDetails[key]}`;
      detailItem.classList.add('task-detail', key);
      detailsList.appendChild(detailItem);
    });

    node.appendChild(listItem);
    listItem.addEventListener('click', (event) => setActiveTask(event.currentTarget));
  };

  const handleClick = () => {
    if (titleInput.value === '') return;
    const task = Task(
      titleInput.value,
      descriptionInput.value,
      priorityInput.value,
      dueDateInput.value,
    );
    addTaskNode(task);
    activeProject.addTask(task);
    console.table(task.getDetails());
    clearForm();
  };

  const refresh = () => {
    node.innerHTML = '';
    const tasks = activeProject.getTasks();
    tasks.forEach((task) => addTaskNode(task));
  };

  addButton.addEventListener('click', () => handleClick());
  refresh();

  return { refresh };
})();

const projectsDOM = (() => {
  const node = document.querySelector('.projects-list');
  const input = document.querySelector('#project-input');
  const addButton = document.querySelector('#add-project-btn');

  const setActiveProject = (projectNode) => {
    const currentActiveNode = node.querySelector('.active');
    if (currentActiveNode) currentActiveNode.classList.remove('active');
    projectNode.classList.add('active');
    const index = Array.prototype.indexOf.call(node.children, projectNode);
    activeProject = projects[index];
    tasksDOM.refresh();
    console.log(activeProject.getTitle());
  };

  const addProjectNode = (projectTitle) => {
    const listItem = document.createElement('li');
    listItem.innerText = projectTitle;
    listItem.classList.add('project-title');
    node.appendChild(listItem);
    listItem.addEventListener('click', (event) => setActiveProject(event.currentTarget));
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
    setActiveProject(node.firstChild);
  };

  addButton.addEventListener('click', () => handleClick());
  refresh();

  return { refresh };
})();

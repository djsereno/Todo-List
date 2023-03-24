import './normalize.css';
import './style.css';
import Project from './project';
import Task from './task';

// Dummy projects and tasks for debugging
const project1 = Project('Project A');
project1.addTask(Task('Task a'));
project1.addTask(Task('Task b'));
project1.addTask(Task('Task c', 'simple task', '', '01-02-03'));
const project2 = Project('Project B');
project2.addTask(Task('Task d', 'urgent task', 'very-high', '11-22-33'));
const project3 = Project('Project C');
project3.addTask(Task('Task e'));
project3.addTask(Task('Task f'));
const projects = [project1, project2, project3];
let activeProject = project1;

const tasksDOM = (() => {
  const node = document.querySelector('.task-container');
  const projectHeading = node.querySelector('.project-title');
  const taskList = document.querySelector('.task-list');
  const titleInput = document.querySelector('#title-input');
  const descriptionInput = document.querySelector('#description-input');
  const priorityInput = document.querySelector('#priority-input');
  const dueDateInput = document.querySelector('#due-date-input');
  const showFormButton = document.querySelector('.show-taskform-btn');
  const addTaskForm = document.querySelector('.add-task-form');
  const addButton = addTaskForm.querySelector('.add-task-btn');
  const cancelButton = addTaskForm.querySelector('.cancel-btn');

  const setInteraction = (input) => {
    if (input.value !== '') {
      input.classList.add('interacted');
    } else {
      input.classList.remove('interacted');
    }
  };

  const clearForm = () => {
    titleInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
    setInteraction(priorityInput);
    dueDateInput.value = '';
    setInteraction(dueDateInput);
    addTaskForm.classList.remove('visible');
  };

  const setActiveTask = (taskNode) => {
    const currentActiveNode = taskList.querySelector('.active');
    if (currentActiveNode) currentActiveNode.classList.remove('active');
    if (currentActiveNode === taskNode) return;
    taskNode.classList.add('active');
  };

  const addTaskNode = (task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task');

    const taskTitleGroup = document.createElement('div');
    taskTitleGroup.classList.add('task-title-group');
    listItem.appendChild(taskTitleGroup);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');
    taskTitleGroup.appendChild(checkboxContainer);

    const checkbox = document.createElement('label');
    checkbox.classList.add('checkbox');
    checkboxContainer.appendChild(checkbox);

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkbox.appendChild(checkboxInput);

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');
    checkbox.appendChild(checkmark);

    const checkmarkSymbol = document.createElement('i');
    checkmarkSymbol.classList.add('fa-solid', 'fa-check');
    checkmark.appendChild(checkmarkSymbol);

    const textContent = document.createElement('span');
    textContent.classList.add('task-title');
    textContent.innerText = task.getTitle();
    taskTitleGroup.appendChild(textContent);

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

    taskList.appendChild(listItem);
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
    clearForm();
  };

  const displayAddForm = () => {
    addTaskForm.classList.add('visible');
  };

  const refresh = () => {
    projectHeading.innerText = activeProject.getTitle();
    taskList.innerHTML = '';
    const tasks = activeProject.getTasks();
    tasks.forEach((task) => addTaskNode(task));
  };

  showFormButton.addEventListener('click', () => displayAddForm());
  addButton.addEventListener('click', () => handleClick());
  cancelButton.addEventListener('click', () => clearForm());

  dueDateInput.addEventListener('change', () => setInteraction(dueDateInput));
  priorityInput.addEventListener('change', () => setInteraction(priorityInput));

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
  };

  const addProjectNode = (projectTitle) => {
    const button = document.createElement('button');
    button.innerText = projectTitle;
    button.classList.add('project-title');
    node.appendChild(button);
    button.addEventListener('click', (event) => setActiveProject(event.currentTarget));
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

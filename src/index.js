import './normalize.css';
import './style.css';
import Project from './project';
import Task from './task';

// Dummy projects and tasks for debugging
const project1 = Project('Project A');
project1.addTask(Task('Task a', 'simple task', 'very-high', '01-02-03', 'notes, notes, notes...'));
project1.addTask(Task('Task b'));
project1.addTask(Task('Task c', 'simple task', 'high', '01-02-03'));
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
  const showFormButton = node.querySelector('.show-taskform-btn');
  const taskList = node.querySelector('.task-list');

  const addTaskForm = document.querySelector('.add-task-form');
  const titleInput = addTaskForm.querySelector('.title-input');
  const descriptionInput = addTaskForm.querySelector('.description-input');
  const priorityInput = addTaskForm.querySelector('.priority-input');
  const dueDateInput = addTaskForm.querySelector('.due-date-input');
  const notesInput = addTaskForm.querySelector('.notes-input');
  const addButton = addTaskForm.querySelector('.submit-btn');
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
    notesInput.value = '';
    dueDateInput.value = '';
    setInteraction(priorityInput);
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

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
    listItem.appendChild(taskInfo);

    const taskTitleGroup = document.createElement('div');
    taskTitleGroup.classList.add('task-title-group');
    taskInfo.appendChild(taskTitleGroup);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');
    taskTitleGroup.appendChild(checkboxContainer);

    const checkbox = document.createElement('label');
    checkbox.classList.add('checkbox');
    checkboxContainer.appendChild(checkbox);

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.checked = task.getCompletion();
    checkboxInput.addEventListener('change', () => task.setCompletion(checkboxInput.checked));
    checkbox.appendChild(checkboxInput);

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');
    checkbox.appendChild(checkmark);

    const checkmarkSymbol = document.createElement('i');
    checkmarkSymbol.classList.add('fa-solid', 'fa-check');
    checkmark.appendChild(checkmarkSymbol);

    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.innerText = task.getTitle();
    taskTitleGroup.appendChild(taskTitle);

    if (task.getDescription()) {
      const description = document.createElement('span');
      description.classList.add('description');
      description.innerText = task.getDescription();
      taskInfo.appendChild(description);
    }

    if (task.getDueDate() || task.getPriority() !== 'normal') {
      const tagsGroup = document.createElement('div');
      tagsGroup.classList.add('tags-group');
      taskInfo.appendChild(tagsGroup);

      if (task.getDueDate()) {
        const dueDate = document.createElement('span');
        const symbol = document.createElement('i');
        symbol.classList.add('fa-solid', 'fa-calendar-days');
        dueDate.appendChild(symbol);
        const text = document.createElement('span');
        text.innerText = `\u00A0\u00A0${task.getDueDate()}`;
        dueDate.appendChild(text);
        dueDate.classList.add('tag', 'due-date');
        tagsGroup.appendChild(dueDate);
      }

      if (task.getPriority() !== 'normal') {
        const priority = document.createElement('span');
        const symbol = document.createElement('i');
        symbol.classList.add('fa-solid', 'fa-flag');
        priority.appendChild(symbol);
        const text = document.createElement('span');
        text.innerText = `\u00A0\u00A0${task.getPriority()}`;
        priority.appendChild(text);
        priority.classList.add('tag', 'priority');
        tagsGroup.appendChild(priority);
      }
    }

    if (task.getNotes()) {
      const fineDetails = document.createElement('span');
      fineDetails.classList.add('fine-details');

      const label = document.createElement('label');
      label.innerText = 'Notes:';
      fineDetails.appendChild(label);

      const notesText = document.createElement('div');
      notesText.classList.add('notes');
      notesText.innerText = task.getNotes();
      fineDetails.appendChild(notesText);

      listItem.appendChild(fineDetails);
    }
    // const taskDetails = task.getDetails();
    // Object.keys(taskDetails).forEach((key) => {
    //   if (key === 'title' || taskDetails[key] === null) return;
    //   const detailItem = document.createElement('li');
    //   detailItem.innerText = `${key}: ${taskDetails[key]}`;
    //   detailItem.classList.add('task-detail', key);
    //   fineDetails.appendChild(detailItem);
    // });

    taskList.appendChild(listItem);
    taskInfo.addEventListener('click', (event) => setActiveTask(listItem));
  };

  const handleClick = () => {
    if (titleInput.value === '') return;
    const task = Task(
      titleInput.value,
      descriptionInput.value,
      priorityInput.value,
      dueDateInput.value,
      notesInput.value,
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
  const node = document.querySelector('.projects-container');
  const showFormButton = node.querySelector('.show-projectform-btn');
  const projectList = document.querySelector('.projects-list');

  const addProjectForm = document.querySelector('.add-project-form');
  const titleInput = addProjectForm.querySelector('.title-input');
  const addButton = addProjectForm.querySelector('.submit-btn');
  const cancelButton = addProjectForm.querySelector('.cancel-btn');

  const setActiveProject = (projectNode) => {
    const currentActiveNode = projectList.querySelector('.active');
    if (currentActiveNode) currentActiveNode.classList.remove('active');
    projectNode.classList.add('active');
    const index = Array.prototype.indexOf.call(projectList.children, projectNode);
    activeProject = projects[index];
    tasksDOM.refresh();
  };

  const displayAddForm = () => {
    addProjectForm.classList.add('visible');
  };

  const clearForm = () => {
    titleInput.value = '';
    addProjectForm.classList.remove('visible');
  };

  const addProjectNode = (projectTitle) => {
    const button = document.createElement('button');
    button.innerText = projectTitle;
    button.classList.add('project-title');
    projectList.appendChild(button);
    button.addEventListener('click', (event) => setActiveProject(event.currentTarget));
  };

  const handleClick = () => {
    if (titleInput.value === '') return;
    addProjectNode(titleInput.value);
    const newProject = Project(titleInput.value);
    projects.push(newProject);
    titleInput.value = '';
    setActiveProject(projectList.lastChild);
    clearForm();
  };

  const refresh = () => {
    projectList.innerHTML = '';
    projects.forEach((project) => addProjectNode(project.getTitle()));
    setActiveProject(projectList.firstChild);
  };

  showFormButton.addEventListener('click', () => displayAddForm());
  addButton.addEventListener('click', () => handleClick());
  cancelButton.addEventListener('click', () => clearForm());
  refresh();

  return { refresh };
})();

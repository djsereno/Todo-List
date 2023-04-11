import { parse, startOfToday } from 'date-fns';
import './normalize.css';
import './style.css';
import Project from './project';
import Task from './task';
import generateSampleTasks from './sample';
import formatDate from './formatDate';

const { project1, project2, project3 } = generateSampleTasks();
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
    addTaskForm.setAttribute('data-task-index', '');
    titleInput.value = '';
    descriptionInput.value = '';
    priorityInput.value = '';
    notesInput.value = '';
    dueDateInput.value = '';
    setInteraction(priorityInput);
    setInteraction(dueDateInput);
    addTaskForm.classList.remove('visible', 'edit-task');
  };

  const displayAddForm = (task) => {
    addTaskForm.classList.add('visible');
    if (task) {
      const index = Array.prototype.indexOf.call(activeProject.getTasks(), task);
      addTaskForm.setAttribute('data-task-index', index);
      addTaskForm.classList.add('visible', 'edit-task');
      titleInput.value = task.getTitle();
      descriptionInput.value = task.getDescription();
      priorityInput.value = task.getPriority();
      notesInput.value = task.getNotes();
      dueDateInput.value = task.getDueDate();
      if (task.getPriority()) setInteraction(priorityInput);
      if (task.getDueDate()) setInteraction(dueDateInput);
    }
  };

  const deleteTaskNode = (task) => {
    const index = Array.prototype.indexOf.call(activeProject.getTasks(), task);
    activeProject.deleteTaskAtIndex(index);
    taskList.removeChild(taskList.children[index]);
  };

  const addTaskNode = (task, nodeToReplace) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task');

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');
    listItem.appendChild(checkboxContainer);

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

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
    taskInfo.addEventListener('click', () => displayAddForm(task));
    listItem.appendChild(taskInfo);

    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.innerText = task.getTitle();
    taskInfo.appendChild(taskTitle);

    if (task.getDescription()) {
      const description = document.createElement('span');
      description.classList.add('description');
      description.innerText = task.getDescription();
      taskInfo.appendChild(description);
    }

    if (task.getDueDate() || task.getPriority() !== 'Normal') {
      const tagsGroup = document.createElement('div');
      tagsGroup.classList.add('tags-group');
      taskInfo.appendChild(tagsGroup);

      if (task.getDueDate()) {
        const dueDate = document.createElement('span');
        dueDate.classList.add('tag', 'due-date');
        tagsGroup.appendChild(dueDate);

        const symbol = document.createElement('i');
        symbol.classList.add('fa-solid', 'fa-calendar-days');
        dueDate.appendChild(symbol);

        const textNode = document.createElement('span');
        const date = parse(task.getDueDate(), 'yyyy-MM-dd', new Date());
        const dateText = formatDate(date);
        if (date < startOfToday()) dueDate.classList.add('overdue');
        if (dateText === 'Today' || dateText === 'Tomorrow')
          dueDate.classList.add(dateText.toLowerCase());
        textNode.innerText = `\u00A0\u00A0${dateText}`;
        dueDate.appendChild(textNode);
      }

      if (task.getPriority() !== 'Normal') {
        const priority = document.createElement('span');
        const symbol = document.createElement('i');
        symbol.classList.add('fa-solid', 'fa-flag');
        priority.appendChild(symbol);
        const textNode = document.createElement('span');
        const priorityText = task.getPriority();
        textNode.innerText = `\u00A0\u00A0${priorityText}`;
        priority.appendChild(textNode);
        priority.classList.add('tag', 'priority', priorityText.replace(' ', '-').toLowerCase());
        tagsGroup.appendChild(priority);
      }
    }

    const editSymbol = document.createElement('i');
    editSymbol.classList.add('fa-regular', 'fa-pen-to-square', 'edit');
    listItem.appendChild(editSymbol);
    editSymbol.addEventListener('click', () => displayAddForm(task));

    const trashSymbol = document.createElement('i');
    trashSymbol.classList.add('fa-regular', 'fa-trash-can', 'delete');
    trashSymbol.addEventListener('click', () => deleteTaskNode(task));
    listItem.appendChild(trashSymbol);

    nodeToReplace ? taskList.replaceChild(listItem, nodeToReplace) : taskList.appendChild(listItem);
  };

  const updateTask = (task) => {
    task.setTitle(titleInput.value);
    task.setDescription(descriptionInput.value);
    task.setPriority(priorityInput.value);
    task.setDueDate(dueDateInput.value);
    task.setNotes(notesInput.value);
  };

  const saveTask = () => {
    if (titleInput.value === '') return;

    if (addTaskForm.classList.contains('edit-task')) {
      const index = addTaskForm.getAttribute('data-task-index');
      const task = activeProject.getTasks()[index];
      const nodeToReplace = taskList.children.item(index);
      updateTask(task);
      addTaskNode(task, nodeToReplace);
    } else {
      const task = Task(
        titleInput.value,
        descriptionInput.value,
        priorityInput.value,
        dueDateInput.value,
        notesInput.value,
      );
      activeProject.addTask(task);
      addTaskNode(task);
    }
    clearForm();
  };

  const refresh = () => {
    projectHeading.innerText = activeProject.getTitle();
    taskList.innerHTML = '';
    const tasks = activeProject.getTasks();
    tasks.forEach((task) => addTaskNode(task));
  };

  showFormButton.addEventListener('click', () => displayAddForm());
  addButton.addEventListener('click', () => saveTask());
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

  const saveProject = () => {
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
  addButton.addEventListener('click', () => saveProject());
  cancelButton.addEventListener('click', () => clearForm());
  refresh();

  return { refresh };
})();

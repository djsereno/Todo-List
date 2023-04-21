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
  const deleteButton = addTaskForm.querySelector('.delete-btn');

  const setInteraction = (input) => {
    if (input.value !== '') {
      input.classList.add('interacted');
    } else {
      input.classList.remove('interacted');
    }
  };

  const setProjectHeading = (newHeadingText) => {
    projectHeading.innerText = newHeadingText;
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

  const deleteTask = (task) => {
    if (!task && !addTaskForm.classList.contains('edit-task')) return;

    let index;
    if (task) {
      index = Array.prototype.indexOf.call(activeProject.getTasks(), task);
    } else {
      index = addTaskForm.getAttribute('data-task-index');
      clearForm();
    }
    taskList.removeChild(taskList.children[index]);
    activeProject.deleteTaskAtIndex(index);
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
    trashSymbol.addEventListener('click', () => deleteTask(task));
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
    setProjectHeading(activeProject.getTitle());
    taskList.innerHTML = '';
    const tasks = activeProject.getTasks();
    tasks.forEach((task) => addTaskNode(task));
  };

  showFormButton.addEventListener('click', () => displayAddForm());
  addButton.addEventListener('click', () => saveTask());
  cancelButton.addEventListener('click', () => clearForm());
  deleteButton.addEventListener('click', () => deleteTask());
  dueDateInput.addEventListener('change', () => setInteraction(dueDateInput));
  priorityInput.addEventListener('change', () => setInteraction(priorityInput));
  refresh();

  return { refresh, setProjectHeading };
})();

const projectsDOM = (() => {
  const node = document.querySelector('.projects-container');
  const showFormButton = node.querySelector('.show-projectform-btn');
  const projectList = document.querySelector('.projects-list');

  const addProjectForm = document.querySelector('.add-project-form');
  const titleInput = addProjectForm.querySelector('.title-input');
  const addButton = addProjectForm.querySelector('.submit-btn');
  const cancelButton = addProjectForm.querySelector('.cancel-btn');
  const deleteButton = addProjectForm.querySelector('.delete-btn');

  const setActiveProject = (projectNode) => {
    const currentActiveNode = projectList.querySelector('.active');
    if (currentActiveNode) currentActiveNode.classList.remove('active');
    projectNode.classList.add('active');
    const index = Array.prototype.indexOf.call(projectList.children, projectNode);
    activeProject = projects[index];
    tasksDOM.refresh();
  };

  const displayAddForm = (project) => {
    addProjectForm.classList.add('visible');
    if (project) {
      const index = Array.prototype.indexOf.call(projects, project);
      addProjectForm.setAttribute('data-project-index', index);
      addProjectForm.classList.add('edit-project');
      titleInput.value = project.getTitle();
      if (projects.length > 1) addProjectForm.classList.add('deletable');
    }
  };

  const clearForm = () => {
    addProjectForm.setAttribute('data-project-index', '');
    titleInput.value = '';
    addProjectForm.classList.remove('visible', 'edit-project', 'deletable');
  };

  const deleteProject = (project) => {
    if (!project && !addProjectForm.classList.contains('edit-project')) return;
    if (projects.length === 1) return;

    let index;
    if (project) {
      index = Array.prototype.indexOf.call(projects, project);
    } else {
      index = addProjectForm.getAttribute('data-project-index');
      clearForm();
    }

    const isActive = projects[index] === activeProject;
    projectList.removeChild(projectList.children[index]);
    projects.splice(index, 1);
    if (isActive) setActiveProject(projectList.firstChild);
  };

  const addProjectNode = (project) => {
    const listItem = document.createElement('li');
    listItem.classList.add('project');

    const projectName = document.createElement('span');
    projectName.innerText = project.getTitle();
    projectName.classList.add('project-title');
    projectName.addEventListener('click', (event) =>
      setActiveProject(event.currentTarget.parentNode),
    );
    listItem.appendChild(projectName);

    const editSymbol = document.createElement('i');
    editSymbol.classList.add('fa-regular', 'fa-pen-to-square', 'edit');
    listItem.appendChild(editSymbol);
    editSymbol.addEventListener('click', () => displayAddForm(project));

    const trashSymbol = document.createElement('i');
    trashSymbol.classList.add('fa-regular', 'fa-trash-can', 'delete');
    trashSymbol.addEventListener('click', () => deleteProject(project));
    listItem.appendChild(trashSymbol);

    projectList.appendChild(listItem);
  };

  const saveProject = () => {
    if (titleInput.value === '') return;

    if (addProjectForm.classList.contains('edit-project')) {
      const index = addProjectForm.getAttribute('data-project-index');
      const newTitle = titleInput.value;
      projects[index].setTitle(newTitle);
      const projectNode = projectList.children.item(index);
      projectNode.firstChild.innerText = newTitle;
      if (projectNode.classList.contains('active')) tasksDOM.setProjectHeading(newTitle);
    } else {
      const newProject = Project(titleInput.value);
      addProjectNode(newProject);
      projects.push(newProject);
      setActiveProject(projectList.lastChild);
    }
    clearForm();
  };

  const refresh = () => {
    projectList.innerHTML = '';
    projects.forEach((project) => addProjectNode(project));
    setActiveProject(projectList.firstChild);
  };

  showFormButton.addEventListener('click', () => displayAddForm());
  addButton.addEventListener('click', () => saveProject());
  cancelButton.addEventListener('click', () => clearForm());
  deleteButton.addEventListener('click', () => deleteProject());
  refresh();

  return { refresh };
})();

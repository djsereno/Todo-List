import { parse, startOfToday } from 'date-fns';
import './normalize.css';
import './style.css';
import Project from './project';
import Task from './task';
import formatDate from './formatDate';

// Dummy projects and tasks for debugging
const project1 = Project('Task Planning App');
const task1 = Task(
  'Set up user authentication',
  'Allow users to register, log in, and log out of the application',
  'High',
  '2023-04-15',
  'Research and implement a secure authentication system, and make sure to include error handling and password reset functionality.',
);
const task2 = Task(
  'Design the user interface',
  'Create a visually appealing and user-friendly interface for the application',
  'Normal',
  '2023-05-01',
  'Consider the target audience and their needs, and use modern design principles to create a consistent and intuitive layout.',
);
const task3 = Task(
  'Create a database schema',
  'Design the data structure and relationships between the entities in the application',
  'Very High',
  '2023-04-30',
  'Consider the requirements of the application and choose an appropriate database system, such as MySQL or MongoDB.',
);
const task4 = Task(
  'Implement CRUD functionality for tasks',
  'Allow users to create, read, update, and delete tasks in the application',
  'Normal',
  '2023-05-15',
  'Create RESTful endpoints for each CRUD operation, and use appropriate HTTP verbs and response codes.',
);
const task5 = Task(
  'Write automated tests',
  'Ensure the application is robust and bug-free by writing automated tests',
  'Normal',
  '2023-05-30',
  "Use a testing framework such as Jest or Mocha, and aim for full test coverage of the application's functionality.",
);
const task6 = Task(
  'Optimize performance',
  'Improve the speed and responsiveness of the application',
  'High',
  '2023-06-15',
  'Use tools like profiling and caching to identify and eliminate performance bottlenecks, and aim for a fast and smooth user experience.',
);
const task7 = Task(
  'Deploy to production',
  'Publish the application to a live server accessible by users',
  'Very High',
  '2023-06-30',
  'Choose a reliable hosting provider and configure the application and server for security, scalability, and availability.',
);
project1.addTask(task1);
project1.addTask(task2);
project1.addTask(task3);
project1.addTask(task4);
project1.addTask(task5);
project1.addTask(task6);
project1.addTask(task7);

const project2 = Project("Dad's Birthday Party");
const task8 = Task(
  'Create a budget for the party',
  'Determine how much money can be spent on the party and allocate funds accordingly',
  'Very High',
  '2023-06-01',
  'Consider all aspects of the party, including venue rental, catering, entertainment, and decorations.',
);
const task9 = Task(
  'Secure a venue for the party',
  'Select a venue that fits the party theme and guest list, and reserve the date and time',
  'High',
  '2023-06-15',
  'Consider factors like location, parking, capacity, and amenities.',
);
const task10 = Task(
  'Design and order invitations',
  'Create custom invitations that fit the party theme and send them out in a timely manner',
  'Normal',
  '2023-06-30',
  'Use online design tools or hire a graphic designer to create invitations that stand out and provide all necessary information.',
);
const task11 = Task(
  'Purchase or make decorations',
  'Buy or create decorations that fit the party theme and budget, and set them up in the venue',
  'High',
  '2023-08-01',
  "Consider factors like the size of the venue, the desired ambiance, and the host's DIY skills.",
);
const task12 = Task(
  'Order catering or plan menu',
  'Select appropriate food and drink options that fit the party theme and budget, and arrange for delivery or cooking',
  'High',
  '2023-08-15',
  "Consider factors like the number of guests, dietary restrictions, and the host's cooking skills.",
);
project2.addTask(task8);
project2.addTask(task9);
project2.addTask(task10);
project2.addTask(task11);
project2.addTask(task12);

const project3 = Project('Summer Vacation');
const task13 = Task(
  'Decide on a vacation destination',
  'Research potential destinations and decide on one that fits the budget and preferences of all travelers',
  'High',
  '2023-03-15',
  'Consider factors like climate, activities, cultural attractions, and travel restrictions.',
);
const task14 = Task(
  'Book flights and accommodations',
  'Select flights and accommodations that fit the vacation dates and budget, and make reservations',
  'Very High',
  '2023-04-01',
  'Consider factors like location, amenities, cancellation policies, and reviews.',
);
const task15 = Task(
  'Arrange for transportation at the destination',
  'Determine how travelers will get around at the destination and arrange for transportation options like rental cars or public transit passes',
  'Normal',
  '2023-05-01',
  'Consider factors like traffic, parking, and accessibility.',
);
const task16 = Task(
  'Create a packing list',
  'Make a list of essential items to pack based on the planned activities and climate of the destination',
  'Normal',
  '2023-06-01',
  'Consider factors like luggage restrictions, weather patterns, and planned activities.',
);
const task17 = Task(
  'Purchase necessary travel gear',
  'Buy any necessary travel gear like luggage, adapters, and travel-sized toiletries',
  'Low',
  '2023-06-15',
  'Consider factors like the durability, size, and weight of items, and try to buy items on sale or with discounts.',
);
const task18 = Task(
  'Research and plan activities',
  'Research and plan activities and attractions to visit at the destination, and make reservations if necessary',
  'High',
  '2023-07-01',
  'Consider factors like availability, cost, and traveler preferences.',
);
project3.addTask(task13);
project3.addTask(task14);
project3.addTask(task15);
project3.addTask(task16);
project3.addTask(task17);
project3.addTask(task18);

const projects = [project1, project2, project3];
let activeProject = project1;

// Design the user interface
// Description: Create a visually appealing and user-friendly interface for the application.
// Due date: May 1st
// Priority status: Medium
// Notes: Consider the target audience and their needs, and use modern design principles to create a consistent and intuitive layout.
// Create a database schema
// Description: Design the data structure and relationships between the entities in the application.
// Due date: April 30th
// Priority status: High
// Notes: Consider the requirements of the application and choose an appropriate database system, such as MySQL or MongoDB.
// Implement CRUD functionality for tasks
// Description: Allow users to create, read, update, and delete tasks in the application.
// Due date: May 15th
// Priority status: High
// Notes: Create RESTful endpoints for each CRUD operation, and use appropriate HTTP verbs and response codes.
// Write automated tests
// Description: Ensure the application is robust and bug-free by writing automated tests.
// Due date: May 30th
// Priority status: Medium
// Notes: Use a testing framework such as Jest or Mocha, and aim for full test coverage of the application's functionality.
// Optimize performance
// Description: Improve the speed and responsiveness of the application.
// Due date: June 15th
// Priority status: Medium
// Notes: Use tools like profiling and caching to identify and eliminate performance bottlenecks, and aim for a fast and smooth user experience.
// Deploy to production
// Description: Publish the application to a live server accessible by users.
// Due date: June 30th
// Priority status: High
// Notes: Choose a reliable hosting provider and configure the application and server for security, scalability, and availability.

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

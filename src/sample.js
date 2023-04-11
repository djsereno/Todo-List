import Project from './project';
import Task from './task';

// Dummy projects and tasks for debugging
const generateSampleTasks = () => {
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

  return { project1, project2, project3 };
};

export default generateSampleTasks;

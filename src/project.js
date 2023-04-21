const Project = (title) => {
  let _title = title;
  // let _description = '';
  const _tasks = [];

  const getTitle = () => _title;
  // const getDescription = () => _description;
  const getTasks = () => [..._tasks];
  const getTaskTitles = () => _tasks.map((task) => task.getTitle());

  const setTitle = (newTitle) => {
    _title = newTitle;
  };
  // const setDescription = (newDescription) => {
  //   _description = newDescription;
  // };
  const addTask = (newTask) => {
    _tasks.push(newTask);
  };
  const deleteTaskAtIndex = (index) => {
    _tasks.splice(index, 1);
  };

  return {
    getTitle,
    // getDescription,
    getTasks,
    getTaskTitles,
    setTitle,
    // setDescription,
    addTask,
    deleteTaskAtIndex,
  };
};

export default Project;

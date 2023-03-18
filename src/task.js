const Task = (title) => {
  let _title = title;
  let _description = '';
  let _dueDate = '';
  let _priority = '';

  const getTitle = () => _title;
  const getDescription = () => _description;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;

  const setTitle = (newTitle) => {
    _title = newTitle;
  };
  const setDescription = (newDescription) => {
    _description = newDescription;
  };
  const setDueDate = (newDueDate) => {
    _dueDate = newDueDate;
  };
  const setPriority = (newPriority) => {
    _priority = newPriority;
  };

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
  };
};

export default Task;

const Task = (title, description, priority, dueDate) => {
  let _title = title;
  let _description = description || null;
  let _priority = priority || 'normal';
  let _dueDate = dueDate || null;

  const getDetails = () => ({
    title: _title,
    description: _description,
    priority: _priority,
    dueDate: _dueDate,
  });
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
    getDetails,
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

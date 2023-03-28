const Task = (title, description, priority, dueDate) => {
  let _title = title;
  let _description = description || null;
  let _priority = priority || 'normal';
  let _dueDate = dueDate || null;
  let _completion = false;

  const getDetails = () => ({
    title: _title,
    description: _description,
    priority: _priority,
    dueDate: _dueDate,
    completion: _completion,
  });
  const getTitle = () => _title;
  const getDescription = () => _description;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;
  const getCompletion = () => _completion;

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
  const setCompletion = (newCompletion) => {
    _completion = newCompletion;
  };

  return {
    getDetails,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getCompletion,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setCompletion,
  };
};

export default Task;

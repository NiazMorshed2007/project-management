const findIndexTasksById = (arr, id) => {
  let index = arr.findIndex((ar_) => {
    return ar_.task_id === id;
  });
  return index;
};

export default findIndexTasksById;

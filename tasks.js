const fs = require('fs');

//List of all tasks from JSON file
var fetchTasks = () => {
  try {
    var tasksString = fs.readFileSync('tasks-data.json');
    return JSON.parse(tasksString);
  } catch (e) {
    return [];
  }
};

//Save tasks to JSON file
var saveTasks = (tasks) => {
  fs.writeFileSync('tasks-data.json', JSON.stringify(tasks));
};

//Add new task
var addTask = (title, body, status) => {
  var tasks = fetchTasks();
  var task = {
    title,
    body,
    status
  };

  //If task title already exists
  var duplicateTasks = tasks.filter((task) => task.title === title);

  if (duplicateTasks.length === 0) {
    tasks.push(task);
    saveTasks(tasks);
    return task;
  }
};

//Show list of with all tasks
var getAll = () => {
  return fetchTasks();
};

//Show task with given title
var getTask = (title) => {
  var tasks = fetchTasks();
  var filteredTasks = tasks.filter((task) => task.title === title);
  return filteredTasks[0];
};

//Change task status
var changeStatus = (title, status) => {
    var tasks = fetchTasks();
    var filteredTasks = tasks.filter((task) => task.title === title);
    var changed = filteredTasks[0];
   
    for(i=0; i<tasks.length; i++) {
        if(tasks[i].title === changed.title){
            tasks[i].status = status;
            saveTasks(tasks);
            return tasks;
        }
     }   
  };


//Removing required task
var removeTask = (title) => {
  var tasks = fetchTasks();
  var filteredTasks = tasks.filter((task) => task.title !== title);
  saveTasks(filteredTasks);
  return tasks.length !== filteredTasks.length;
};



//Just an info function
var logTask = (task) => {
  console.log('--');
  console.log(`Title: ${task.title}`);
  console.log(`Body: ${task.body}`);
  console.log(`Status: ${task.status}`);
};

module.exports = {
  addTask,
  getAll,
  getTask,
  removeTask,
  changeStatus,
  logTask
};

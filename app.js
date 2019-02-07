const fs = require('fs');
const yargs = require('yargs');
const tasks = require('./tasks.js');

const argv = yargs.argv;
var command = argv._[0];

// 
if (command === 'add') {
  var task = tasks.addTask(argv.title, argv.body, argv.status);
  if (task) {
    console.log('task created');
    tasks.logTask(task);
  } else {
    console.log('task title taken');
  }
} else if (command === 'list') {
    var allTasks = tasks.getAll();
    console.log(`Printing ${allTasks.length} task(s).`);
    allTasks.forEach((task) => tasks.logTask(task));
} else if (command === 'read') {
    var task = tasks.getTask(argv.title);
    if (task) {
    console.log('task found');
    tasks.logTask(task);
  } else {
    console.log('task not found');
  }
} else if (command === 'remove') {
    var taskRemoved = tasks.removeTask(argv.title);
    var message = taskRemoved ? 'task was removed' : 'task not found';
    console.log(message);
} else if (command === 'changeStatus') {
    var changedStatus = tasks.changeStatus(argv.title, argv.status);
    var message = changedStatus ? 'status was changed' : 'status not changed';
    console.log(message);
}
 else {
    console.log('Command not recognized');
}

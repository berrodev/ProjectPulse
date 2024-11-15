class Project {
  constructor(id, name, startDate, tasks) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.tasks = tasks;
  }
  // Method to add a task to the project array
  addTask(task) {
    this.tasks.push(task);
  }
  // Method to get a project summary showing the number of tasks in each status, using array methods (map, filter, reduce)
  summary() {
    const INITIAL_STATUS = { active: 0, pending: 0, completed: 0 };
    const statusCount = this.tasks.reduce((acc, task) => {
      task.status == 'active'
        ? (acc.active += 1)
        : task.status == 'pending'
        ? (acc.pending += 1)
        : (acc.completed += 1);
      return acc;
    }, INITIAL_STATUS);
    return statusCount;
  }

  // method to sort tasks by deadline
  sortTasks() {
    return this.tasks.sort(
      (a, b) => Date.parse(a.deadLine) - Date.parse(b.deadLine)
    );
  }
}

class Task {
  constructor(id, description, status, deadLine) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.deadLine = deadLine;
  }
}

// Filter tasks by status
const completedTasksFilter = (task) => task.status === 'completed';
const currentYearTasksFilter = (task) =>
  new Date(task.deadLine).getFullYear() === new Date().getFullYear();
const lastYearTasksFilter = (task) =>
  new Date(task.deadLine).getFullYear() === new Date().getFullYear() - 1;

const filterTasks = (project, tasksFilter) => {
  return project.tasks.filter(tasksFilter);
};
// Calculate the number of days left to finish the project
const daysLeft = (project) => {
  // Get all tasks but the completed ones and sort them by deadline
  // TODO: Implement a better way to get the pending tasks using the filterTasks function
  const pendingTasks = project.tasks
    .filter((task) => task.status !== 'completed')
    .sort((a, b) => Date.parse(a.deadLine) - Date.parse(b.deadLine));

  // Get the deadline of the last task
  const lastTask = pendingTasks[pendingTasks.length - 1];
  const lastTaskDeadline = new Date(lastTask.deadLine);
  return Math.ceil((lastTaskDeadline - new Date()) / (1000 * 60 * 60 * 24));
};
// Get critical tasks (3 days or less to finish)
// TODO: Implement a better way to get the critical tasks using the filterTasks function

const criticalTasks = (project) => {
  const pendingTasks = project.tasks.filter(
    (task) => task.status !== 'completed'
  );
  return pendingTasks.filter(
    (task) =>
      Math.ceil(
        (new Date(task.deadLine) - new Date()) / (1000 * 60 * 60 * 24)
      ) <= 3
  );
};

// TODO: Simulate an API request to get projects details
const simulateApiRequest = (projectId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // randomize the response status (success or error)
      if (Math.random() < 0.1) {
        reject('Error: API request failed, failed to get project details');
      }
      resolve({
        id: projectId,
        name: 'Project 1',
        startDate: '2024-10-01',
        tasks: [
          {
            id: 1,
            description: 'Task 1',
            status: 'pending',
            deadLine: '2024-11-16',
          },
          {
            id: 2,
            description: 'Task 2',
            status: 'active',
            deadLine: '2025-01-20',
          },
          {
            id: 3,
            description: 'Task 3',
            status: 'completed',
            deadLine: '2024-11-10',
          },
          {
            id: 4,
            description: 'Task 4',
            status: 'pending',
            deadLine: '2024-11-29',
          },
        ],
      });
    }, 1000);
  });
};

// Get project details using the API request
const getProjectDetails = async () => {
  try {
    const project = await simulateApiRequest(1);
    console.log('API request successful');
    console.log(project);
  } catch (error) {
    console.error(error);
  }
};

// TODO: Simulate an API request to update task status
const updateTaskStatus = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // randomize the response status (success or error)
      if (Math.random() < 0.1) {
        reject('Error: API request failed, failed to update task status');
      }
      resolve(`Task status updated successfully`);
    }, 2000);
  });
};

// Update task status using the API request and get the updated project
const updateTask = async (project, task, newStatus) => {
  try {
    const response = await updateTaskStatus();
    console.log('API request successful');
    console.log(response);
    // Update the task status
    task.status = newStatus;
    console.log(`Task ${task.id} status updated successfully`);
    console.log(project);
  } catch (error) {
    console.error(error);
  }
};

// Create a project object and add new tasks
const project1 = new Project(1, 'Project 1', '2024-10-01', [
  new Task(1, 'Task 1', 'pending', '2024-11-16'),
  new Task(2, 'Task 2', 'active', '2025-01-20'),
  new Task(3, 'Task 3', 'completed', '2024-11-10'),
  new Task(4, 'Task 4', 'pending', '2024-11-29'),
]);
console.log(project1);

// Add a new task to the project
const newTask = new Task(4, 'Task 4', 'pending', '2024-01-30');
project1.addTask(newTask);
console.log(project1);

// Get the project summary
console.log('Project summary');
console.log(project1.summary());

// Get sorted tasks
console.log('Sorted tasks');
console.log(project1.sortTasks());

// Filter project completed tasks
console.log('Filter tasks by status');
console.log(filterTasks(project1, completedTasksFilter));

// Filter current year tasks
console.log('Filter current year tasks');
console.log(filterTasks(project1, currentYearTasksFilter));

// Filter last year tasks
console.log('Filter last year tasks');
console.log(filterTasks(project1, lastYearTasksFilter));

// Get the number of days left to finish the project
console.log('Days left to finish the project');
console.log(`${daysLeft(project1)} days left to finish the project`);

// Get critical tasks
console.log('Critical tasks');
console.log(criticalTasks(project1));

// ### Testing the API request ###
getProjectDetails();

// ### Testing the API request to update task status ###
updateTask(project1, newTask, 'completed');

// TODO: Implement an observer pattern to notify the project status is completed

DATABASE = {
  projects: [
    {
      id: 1,
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
    },
    {
      id: 2,
      name: 'Project 2',
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
    },
  ],
};

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

// Sum the number of days left to finish the project
const totalProjectDays = (project) => {
  const today = new Date(); // Get today's date

  return project.tasks.reduce((totalDays, task) => {
    if (task.status !== 'completed') {
      // date is in the past
      if (new Date(task.deadLine) < today) {
        return totalDays;
      }
      const diffTime = new Date(task.deadLine) - today;
      // Difference between the deadline and today's date
      const diffDays = diffTime / (1000 * 3600 * 24); // Convert the difference to days
      totalDays += diffDays;
    }
    return Math.ceil(totalDays);
  }, 0); // The initial value of the accumulator is 0
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

// Simulate an API request to get the dummy database project data
const fetchProjectData = (projectId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // randomize the response status (success or error)
      if (Math.random() < 0.1) {
        reject('Error: API request failed, failed to get project data');
      }
      const project = DATABASE.projects.find(
        (project) => project.id === projectId
      );
      if (!project) {
        reject('Error: Project not found');
      }
      resolve(project);
    }, 2000);
  });
};

// Simulate an API request to update the database task status and return the updated project
const updateTask = (project, taskID, newStatus) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // randomize the response status (success or error)
      if (Math.random() < 0.1) {
        reject('Error: API request failed, failed to update task status');
      }
      const task = project.tasks.find((task) => task.id === taskID);
      if (!task) {
        reject('Error: Task not found');
      }
      task.status = newStatus;

      resolve(project);
    }, 2000);
  });
};

// Create a project object and add new tasks
const project1 = new Project(1, 'Project 1', '2024-10-01', [
  new Task(1, 'Task 1', 'pending', '2024-11-20'),
  new Task(2, 'Task 2', 'active', '2024-11-18'),
  new Task(3, 'Task 3', 'completed', '2024-11-12'),
  new Task(4, 'Task 4', 'pending', '2024-12-16'),
  new Task(5, 'Task 5', 'pending', '2024-11-16'),
]);

// Add a new task to the project
const newTask = new Task(6, 'Task 6', 'pending', '2024-01-30');
project1.addTask(newTask);

console.log(project1);

// Get the project summary
console.log('Project summary');
console.log(project1.summary());

// Get sorted tasks
console.log('Sorted tasks');
console.log(project1.sortTasks());

// Filter project completed tasks
console.log('Filter tasks by status "Completed"');
console.log(filterTasks(project1, completedTasksFilter));

// Filter current year tasks
console.log('Filter current year tasks');
console.log(filterTasks(project1, currentYearTasksFilter));

// Filter last year tasks
console.log('Filter last year tasks');
console.log(filterTasks(project1, lastYearTasksFilter));

// Get the number of days left to finish the project
console.log(`${totalProjectDays(project1)} days left to finish the project`);

// Get critical tasks
console.log('Critical tasks');
console.log(criticalTasks(project1));

// ### Testing the API request ###
const getProject = async (projectId) => {
  try {
    const project = await fetchProjectData(projectId);
    console.log('API request successful');
    console.log(project);
  } catch (error) {
    console.error(error);
  }
};

// ### Testing the API request to get project data ###
getProject(1);

// ### Testing the API request to update task status ###
const updateTaskStatus = async (project, taskID, newStatus) => {
  try {
    const updatedProject = await updateTask(project, taskID, newStatus);
    console.log('API UPDATE request successful');
    console.log(updatedProject);
    // Notify the observers
    taskNotifications.notifyAll(newStatus); // Notificar a los observadores
  } catch (error) {
    console.error(error);
  }
};

// ### Testing the API request to update task status ###
console.log('Update task status');
updateTaskStatus(project1, 4, 'completed');
updateTaskStatus(project1, 2, 'pending');

// Implement an observer pattern to notify the project status changes
class TaskNotifications {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  notifyAll(taskStatus) {
    this.observers.forEach((observer) => observer.update(taskStatus));
  }
}
class Observer {
  update(taskStatus) {
    console.log('OBSERVER NOTIFICATION:');
    console.log(`Task status has been updated to: ${taskStatus}`);
  }
}
// Instantiate the TaskNotifications class and add an observer
const taskNotifications = new TaskNotifications();
const observer1 = new Observer();
taskNotifications.addObserver(observer1);

const projects = [
  {
    id: 1,
    name: 'Project 1',
    startDate: '2024-01-01',
    tasks: [
      {
        id: 1,
        description: 'Task 1',
        status: 'pending',
        deadLine: '2024-01-15',
      },
      {
        id: 2,
        description: 'Task 2',
        status: 'active',
        deadLine: '2024-01-20',
      },
      {
        id: 3,
        description: 'Task 3',
        status: 'completed',
        deadLine: '2024-01-25',
      },
    ],
  },
  {
    id: 2,
    name: 'Project 2',
    startDate: '2024-02-05',
    tasks: [
      {
        id: 1,
        description: 'Task 1',
        status: 'pending',
        deadLine: '2024-02-15',
      },
      {
        id: 2,
        description: 'Task 2',
        status: 'active',
        deadLine: '2024-02-20',
      },
      {
        id: 3,
        description: 'Task 3',
        status: 'completed',
        deadLine: '2024-02-25',
      },
    ],
  },
];

// Change projects object structure to class
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

  // TODO: Filter tasks by status
  // TODO: Calculate the number of days left to finish the project
  // TODO: Get critical tasks
}

class Task {
  constructor(id, description, status, deadLine) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.deadLine = deadLine;
  }
}

// TODO: Simulate an API request to get projects details
// TODO: Simulate an API request to refresh the project status
// TODO: Implement an observer pattern to notify the project status is completed

// ### Testing the Project class ###

// Create a project object and add new tasks
const project1 = new Project(1, 'Project 1', '2024-10-01', [
  new Task(1, 'Task 1', 'pending', '2024-03-15'),
  new Task(2, 'Task 2', 'active', '2024-01-20'),
  new Task(3, 'Task 3', 'completed', '2024-01-25'),
]);
console.log(project1);

// Add a new task to the project
project1.addTask(new Task(4, 'Task 4', 'pending', '2024-01-30'));
console.log(project1);

// Get the project summary
console.log(project1.summary());

// Get sorted tasks
console.log(project1.sortTasks());

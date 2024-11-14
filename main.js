const projects = [
  {
    id: 1,
    name: 'Project 1',
    startDate: '2024-01-01',
    tasks: [
      {
        id: 1,
        description: 'Task 1',
        state: 'pending',
        deadLine: '2024-01-15',
      },
      {
        id: 2,
        description: 'Task 2',
        state: 'active',
        deadLine: '2024-01-20',
      },
      {
        id: 3,
        description: 'Task 3',
        state: 'completed',
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
        state: 'pending',
        deadLine: '2024-02-15',
      },
      {
        id: 2,
        description: 'Task 2',
        state: 'active',
        deadLine: '2024-02-20',
      },
      {
        id: 3,
        description: 'Task 3',
        state: 'completed',
        deadLine: '2024-02-25',
      },
    ],
  },
];

// TODO: change projects object structure to class
class Project {
  constructor(id, name, startDate, tasks) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.tasks = tasks;
  }
  // method to add a task to the project array
  addTask(task) {
    this.tasks.push(task);
  }
  // TODO: method to get a project summary showing the number of tasks in each state, using array methods (map, filter, reduce)

  // TODO: method to sort tasks by deadline

  // TODO: Filter tasks by state
  // TODO: Calculate the number of days left to finish the project
  // TODO: Get critical tasks
}

class Task {
  constructor(id, description, state, deadLine) {
    this.id = id;
    this.description = description;
    this.state = state;
    this.deadLine = deadLine;
  }
}

// TODO: Simulate an API request to get projects details
// TODO: Simulate an API request to refresh the project state
// TODO: Implement an observer pattern to notify the project state is completed

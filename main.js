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
}

class Task {
  constructor(id, description, state, deadLine) {
    this.id = id;
    this.description = description;
    this.state = state;
    this.deadLine = deadLine;
  }
}

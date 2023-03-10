const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { format } = require('date-fns')

// Тестові початкові дані
const tasksDB = [
  {
    id: 0,
    name: 'Task1',
    createdDate: '2008-03-26',
    isDone: false
  },
  {
    id: 1,
    name: 'Task2',
    createdDate: format(new Date(), 'Y-MM-dd'),
    isDone: false
  }
]

// Клас для доступу до масива
class TasksDB {
  constructor (arr) {
    this.tasks = [...arr]
  }

  // Метод для додавання нового об'єкта в масив: додає id і isFavourite
  createTask (newTask) {
    this.tasks.push({
      ...newTask,
      id: uuidv4(),
      isDone: false,
      createdDate: format(new Date(), 'Y-MM-dd')
    })
    return this.tasks[this.tasks.length - 1]
  }

  // Метод для отримання даних з масиву
  getTasks () {
    return [...this.tasks]
  }
}

// Інстанс класу для доступу до масиву з об'єктами
const taskDbInstace = new TasksDB(tasksDB)

// Створення екземпляру експресу
const app = express()

// Middleware to parse json to js-object
app.use(express.json())

app.get('/', (req, res) => {
  res.send('app )))')
})

// CRUD
// Навішування обробника на метод GET на маршрут '/contacts'
app.get('/tasks', (req, res) => {
  const tasks = taskDbInstace.getTasks()
  res.status(200).send(tasks)
})

// Навішування обробника на метод POST на маршрут '/contacts'
app.post('/tasks', (req, res) => {
  // В req.body приходе тіло запиту
  const createdTasks = taskDbInstace.createTask(req.body)
  res.status(201).send(createdTasks)
})

module.exports = app

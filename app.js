const express = require('express')
const { tasksControllers } = require('./controllers')
// Створення екземпляру експресу
const app = express()

// Middleware to parse json to js-object
app.use(express.json())

app.get('/', (req, res) => {
  res.send('app )))')
})

// CRUD
// Навішування обробника на метод GET на маршрут '/contacts'
app.get('/tasks', tasksControllers.getTasks)

// Навішування обробника на метод POST на маршрут '/contacts'
app.post('/tasks', tasksControllers.createTask)

module.exports = app

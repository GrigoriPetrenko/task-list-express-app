const { TasksDB } = require('./../models')

module.exports.getTasks = (req, res) => {
  const { page = 1, results = 5 } = req.query
  const tasks = TasksDB.getTasks(page, results)

  res.status(200).send(tasks)
}

module.exports.createTask = (req, res) => {
  const { body } = req

  const createTask = TasksDB.createTask(body)
  res.status(201).send(createTask)
}

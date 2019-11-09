const db = require("../data/db-config");
const mappers = require('./mapper');


module.exports = {
    addTask, 
    getProjectTasks,
    getTasks,
    getTasksById,
    updateTask,
    removeTask
} 

function getTasks () {
    return db("task")
    .then(tasks => tasks.map(task => mappers.actionToBody(task)));
}

function getTasksById (id) {
    return db("task").where({id}).first();
}

function getProjectTasks (id) {
    return db("task")
        .join("projects", "projects.id", "task.project_id")
        .where({project_id: id})
        .select("task.id", "projects.name", "projects.description", "task.description", "task.notes", "task.completed", )
        .then(tasks => tasks.map(task => mappers.actionToBody(task)));

}

function addTask (task) {
    return db("task").insert(task)
}

function updateTask(changed, id) {
    return db('task')
      .where({ id })
      .update(changed);
  }
  
  function removeTask(id) {
    return db('task')
        .where({id})
        .del();
  }
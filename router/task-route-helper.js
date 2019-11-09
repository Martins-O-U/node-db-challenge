const db = require("../data/db-config");
const mappers = require('./mapper');


module.exports = {
    addTask, 
    getProjectTasks,
    getTasks
} 

function getTasks () {
    return db("task")
    .then(tasks => tasks.map(task => mappers.actionToBody(task)));
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
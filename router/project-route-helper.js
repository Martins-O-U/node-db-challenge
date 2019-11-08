const db = require("../data/db-config");

module.exports = {
    getProjects,
    addProject,
    getProjectById,
    addTask, 
    getProjectTasks,
    findResources,
    addResource,
    getTasks
} 

function getProjectById (id) {
    return db("projects").where({id}).first()
}

function getProjects () {
    return db("projects");
}

function getTasks () {
    return db("task");
}

function addProject (project) {
    return db("projects").insert(project)
}

function addTask (task) {
    return db("task").insert(task)
}

function findResources () {
    return db("resource");
}

function addResource (resource ) {
    return db("resource").insert(resource)
}

function getProjectTasks (id) {
    return db("task")
        .join("projects", "projects.id", "task.project_id")
        .where({project_id: id})
        .select("task.id", "projects.name", "projects.description", "task.description", "task.notes", "task.completed", )
}
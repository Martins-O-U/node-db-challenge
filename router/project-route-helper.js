const db = require("../data/dbconfig.js");

module.exports = {
    getProjects,
    addProject,
    getProjectById,
    addTask, 
    getTasks,
    findResources,
    addResource
} 

function getProjectById (id) {
    return db("projects").where({id}).first()
}

function getProjects () {
    return db("projects");
}

function addProject (project) {
    return db("projects").insert(project)
}

function addTask (task) {
    return db("task").insert(task)
}

const findResources = () => {
    return db("resource");
}

const addResource = resource => {
    return db("resource").insert(resource)
}

function getTasks (id) {
    return db("task")
        .join("projects", "projects.id", "task.project_id")
        .where({project_id: id})
        .select("task.id", "projects.name", "project.description", "task.task_description", "task.notes", "task.completed", )
}
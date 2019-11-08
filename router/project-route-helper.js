const db = require("../data/db-config");
const mappers = require('./mapper');


module.exports = {
    getProjects,
    addProject,
    getProjectById,
    addTask, 
    getProjectTasks,
    findResources,
    addResource,
    getTasks,
    get,
    findResourcesById
} 

function get(id) {
    let query = db('projects as p');
  
    if (id) {
      query.where('p.id', id).first();
  
      const promises = [query, this.getProjectTasks(id), this.findResourcesById(id)]; // [ projects, tasks ]
  
      return Promise.all(promises).then(function(results) {
        let [project, tasks, resource] = results;
  
        if (project) {
          project.tasks = tasks;
          project.resource = resource
        
          return mappers.projectToBody(project);
        } else {
          return null;
        }
      });
    }
  
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
}

function getProjectById (id) {
    return db("projects").where({id}).first()
}

function getProjects () {
    return db("projects");
}

function getTasks () {
    return db("task")
    .then(tasks => tasks.map(task => mappers.actionToBody(task)));
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

function findResourcesById (id) {
    return db('project_resource')
    .join('resource', 'resource.id', 'project_resource.resource_id')
    .join('projects', 'projects.id', 'project_resource.project_id')
    .select('resource.id', 'resource.name', 'resource.description')
    .where('projects.id', id);
}

function addResource (resource ) {
    return db("resource").insert(resource)
}

function getProjectTasks (id) {
    return db("task")
        .join("projects", "projects.id", "task.project_id")
        .where({project_id: id})
        .select("task.id", "projects.name", "projects.description", "task.description", "task.notes", "task.completed", )
        .then(tasks => tasks.map(task => mappers.actionToBody(task)));

}
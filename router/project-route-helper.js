const db = require("../data/db-config");
const mappers = require('./mapper');
const resource = require('./resource-route-helper')
const task = require('./task-route-helper')


module.exports = {
    // getAllProjects,
    // getProjectById,
    getpreojects,
    addProject,
} 

function getpreojects(id) {
    let query = db('projects');
  
    if (id) {
      query.where('projects.id', id).first();
  
      const promises = [query, task.getProjectTasks(id), resource.findLinkedResource(id)]; // [ projects, tasks, resources ]
  
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

// function getProjectById (id) {
//     return db("projects").where({id}).first()
// }

// function getAllProjects () {
//     return db("projects");
// }



function addProject (project) {
    return db("projects").insert(project)
}

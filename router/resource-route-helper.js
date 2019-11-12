const db = require('../data/db-config')

module.exports = {
    findResources,
    findLinkedResource,
    addResource,
    findResourcesById,
    updateResource,
    removeRosource
}

function findResources () {
    return db("resource");
}

function findResourcesById (id) {
    return db("resource").where({id}).first();
}

function findLinkedResource (id) {
    return db('project_resource')
    .join('resource', 'resource.id', 'project_resource.resource_id')
    .join('projects', 'projects.id', 'project_resource.project_id')
    .select('resource.id', 'resource.name', 'resource.description')
    .where('projects.id', id);
}

function addResource (resource ) {
    return db("resource").insert(resource)
}

function updateResource(changed, id) {
    return db('resource')
      .where({ id })
      .update(changed);
  }
  
  function removeRosource(id) {
    return db('resource')
        .where({id})
        .del();
  }
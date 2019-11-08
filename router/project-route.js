const express = require("express");
const router = express.Router();
const db = require("./project-route-helper");



// ******* Get Requests ********//
router.get("/projects", (req, res) => {
    db.getProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({ message: "could not retrieve projects; go drink a root beer float!!! "+ error.message})
        })
})

router.get("/projects/:id", (req, res) => {
    db.getProjectById(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})

router.get("/tasks", (req, res) => {
    db.getTasks()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong:-" + error.message})
        })
})

router.get("/taskOnProject/:id", (req, res) => {
    db.getProjectTasks(req.params.id)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(error => {
            res.status(500).json({ message: "We cannot retrieve those tasks at this time. " + error.message})
        })
})

router.get("/resources", (req, res) => {
    db.findResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            res.status(500).json({ message: "The resources you are looking for cannot be retrieved at this time:-" + error.message})
        })
})



//   *************** Post Requests *******/

router.post("/projects", (req, res) => {
    if(!req.body.name){
        res.status(400).json({message: "Please provide needed column for the post 'name' "})
    }else{
        db.addProject(req.body)
            .then(projects => {
                    res.status(200).json({message: `New project with ID ${projects} got created`})
            })
            .catch(error => {
                res.status(500).json({ message: "something went wrong:-. " + error.message})
            })
    }

})

router.post("/tasks", (req, res) => {
    if(!req.body.description && !req.body.project_id){
        res.status(400).json({message: "Please provide needed column for the post namely 'description' and 'project_id' "})
    }else{
        db.addTask(req.body)
            .then(tasks => {
                    res.status(200).json({message: `New project with ID ${tasks} got created`})
            })
            .catch(error => {
                res.status(500).json({ message: "something went wrong:-. " + error.message})
            })
    }
})

router.post("/resources", (req, res) => {
    if(!req.body.name){
        res.status(400).json({message: "Please provide needed column for the post 'name' "})
    }else{
        db.addResource(req.body)
            .then(resource => {
                    res.status(200).json({message: `New project with ID ${resource} got created`})
            })
            .catch(error => {
                res.status(500).json({ message: "something went wrong:-. " + error.message})
            })
    }
})


//************* Default Landing Zone */

router.get('/', (req, res) =>{
    res.json('This is the defauls zone, specify what you need to get')
})

module.exports = router; 
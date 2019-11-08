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



//   *************** Post Requests *******/

router.post("/projects", (req, res) => {
    db.addProject(req.body)
        .then(projects => {
            if(projects){
                res.status(200).json({message: `New project with ID ${projects} got created`})
            }else{
                res.status(400).json({message: "Pleaseprovide need columns forthe post"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "We cannot add this task at this time. " + error.message})
        })
})

router.post("/tasks", (req, res) => {
    db.addTask(req.body)
        .then(project => {
            if(project){
                res.status(200).json({message: `New task with ID ${project} got created`})
            }else{
                res.status(400).json({message: "Pleaseprovide need columns forthe post"})
            }        })
        .catch(error => {
            res.status(500).json({ message: "We cannot add this task at this time. " + error.message})
        })
})


//************* Default Landing Zone */

router.get('/', (req, res) =>{
    res.json('This is the defauls zone, specify what you need to get')
})

module.exports = router; 
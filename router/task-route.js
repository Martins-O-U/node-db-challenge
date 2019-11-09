const express = require("express");
const router = express.Router();
const db = require("./task-route-helper");


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

module.exports = router; 
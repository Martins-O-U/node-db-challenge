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

router.get("/tasks/:id", (req, res) => {
    db.getTasksById(req.params.id)
        .then(task => {
            res.status(200).json(task)
        })
        .catch(error => {
            res.status(500).json({ message: "The resources you are looking for cannot be retrieved at this time:-" + error.message})
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

router.put("/tasks/:id", (req, res) => {
    db.getTasksById(req.params.id)
    .then(found =>{
        if(found){
            db.updateTask(req.body, req.params.id)
                .then(project => {
                    res.status(200).json({message: `${project} Project with ID ${req.params.id} got Edited`})
                })
        }else{
            res.status(404).json({ message: 'Could not find project with given id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong:-. " + error.message})
    })

})

//   *************** Delete Requests *******/
router.delete('/projects/:id', (req, res) => {
  
    db.removeTask(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.json({ Message: `A project with ID ${req.params.id} got deleted` });
      } else {
        res.status(404).json({ message: 'Could not find a project with given id' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to delete project ' + error.message});
    });
  });



module.exports = router; 
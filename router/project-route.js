const express = require("express");
const router = express.Router();
const db = require("./project-route-helper");



// ******* Get Requests ********//
router.get("/projects", (req, res) => {
    db.getpreojects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({ message: "could not retrieve projects; go drink a root beer float!!! "+ error.message})
        })
})

router.get("/projects/:id", (req, res) => {
    db.getpreojects(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})


//   *************** Post Request *******/

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

//   *************** Put Request *******/

router.put("/projects/:id", (req, res) => {
    db.getProjectById(req.params.id)
    .then(found =>{
        if(found){
            db.updateProject(req.body, req.params.id)
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
  
    db.removeProject(req.params.id)
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


//************* Default Landing Zone */

router.get('/', (req, res) =>{
    res.json('This is the defauls zone, specify what you need to get')
})

module.exports = router; 

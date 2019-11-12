const express = require("express");
const router = express.Router();
const db = require("./resource-route-helper");


router.get("/resources", (req, res) => {
    db.findResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            res.status(500).json({ message: "The resources you are looking for cannot be retrieved at this time:-" + error.message})
        })
})

router.get("/resources/:id", (req, res) => {
    db.findResourcesById(req.params.id)
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            res.status(500).json({ message: "The resources you are looking for cannot be retrieved at this time:-" + error.message})
        })
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

router.put("/projects/:id", (req, res) => {
    db.findResourcesById(req.params.id)
    .then(found =>{
        if(found){
            db.updateResource(req.body, req.params.id)
                .then(resource => {
                    res.status(200).json({message: `${resource} Project with ID ${req.params.id} got Edited`})
                })
        }else{
            res.status(404).json({ message: 'Could not find resource with given id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong:-. " + error.message})
    })

})

router.delete('/projects/:id', (req, res) => {
  
    db.removeRosource(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.json({ Message: `A project with ID ${req.params.id} got deleted` });
      } else {
        res.status(404).json({ message: 'Could not find a resource with given id' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to delete resource ' + error.message});
    });
  });


module.exports = router; 
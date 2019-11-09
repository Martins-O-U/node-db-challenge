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

module.exports = router; 
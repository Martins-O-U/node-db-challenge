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


//************* Default Landing Zone */

router.get('/', (req, res) =>{
    res.json('This is the defauls zone, specify what you need to get')
})

module.exports = router; 
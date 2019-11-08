const express = require("express");
const router = express.Router();
const db = require("./project-route-helper");




router.get('/', (req, res) =>{
    res.json('This is the defauls zone, specify what you need to get')
})

module.exports = router; 
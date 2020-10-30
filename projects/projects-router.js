const express = require("express");
const db = require("../data/dbConfig");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

// GET all projects
router.get("/", (req,res) => {
    return db("projects")
    .then(projects => {
        res.status(200).json({ projects });
    }).catch (error => {
        res.status(500).json({ error: "Could not access projects." });
    });
});

// GET project by projectId
router.get("/:projectId", (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if(!project) {
            res.status(404).json({ message: "Project not found." });
        } else {
            res.status(200).json({ project });
        }
    }) .catch(error => {
        res.status(500).json({ message: "Error retriveing the project." });
    });
});

// POST add a new project
router.post("/", (req, res) => {
    Projects.insert({
        name: req.body.name,
        description: req.body.description
    }) .then(newProject => {
        if(!newProject.name || !newProject.description){
            res.status(400).json({ message: "Please provide a name and description for the project." });
        } else {
            res.status(201).json({ message: "Project has been successfully added." });
        }
    }) .catch(error => {
        res.status(500).json({ error: "Could not add a new project at this time." });
    });
});

module.exports = router;
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
      .then((project) => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: "Project not found." });
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        res.status(500).json({ message: "Error retrieving project." });
      });
  });


// middleware to validate incoming project data
function validateProjectContents(req, res, next) {
    if (!req.body.description || !req.body.name) {
      res
        .status(400)
        .json({ message: "Please provide a project name and descripton." });
    } else {
      next();
    }
  }

// POST add a new project
router.post("/", validateProjectContents, (req, res) => {
    Projects.insert({
        name: req.body.name,
        description: req.body.description
    }) .then(newProject => {
        res.status(201).json({ message: "Project has been successfully added." });
    }) .catch(error => {
        res.status(500).json({ error: "Could not add a new project at this time." });
    });
});

// PUT update/edit a project
router.put("/:projectId", validateProjectContents, (req, res) => {
    Projects.update(req.params.id, req.body) 
    .then(project => {
        const id = req.params.id
        if(id !== project.id){
            res.status(404).json({ message: "Could not find a project that matches the given id." })
        } else {
            res.status(200).json({ message: "Project has been successfully updated." })
        }
    }) .catch(error => {[
        res.status(500).json({ error: "Could not update the project at this time." })
    ]})
});

// DELETE project by id
router.delete("/:id", (req, res) => {
    Projects.remove(req.params.id)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: "The project has been deleted." });
        } else {
          res.status(404).json({ message: "The project cold not be found." });
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        res.status(500).json({ message: "Error deleting the project." });
      });
  });

module.exports = router;
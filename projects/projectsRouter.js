const express = require("express");

const Projects = require("../data/helpers/projectModel");

const router = express.Router();

// GET project by id
router.get("/:id", (req, res) => {
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

// custom middleware to validate client data inputs
function validateProjectContents(req, res, next) {
  if (!req.body.description || !req.body.name) {
    res
      .status(400)
      .json({ message: "Please provide a project name and descripton." });
  } else {
    next();
  }
}

// POST project
router.post("/", validateProjectContents, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).json({ message: "Error adding a project." });
    });
});

// PUT project by id
router.put("/:id", validateProjectContents, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "The project could not be found." });
      }
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).json({ message: "Error updating project." });
    });
});

module.exports = router;

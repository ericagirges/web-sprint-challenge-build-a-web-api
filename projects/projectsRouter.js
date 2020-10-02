const express = require("express");

const Projects = require("../data/helpers/projectModel");

const router = express.Router();

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

module.exports = router;

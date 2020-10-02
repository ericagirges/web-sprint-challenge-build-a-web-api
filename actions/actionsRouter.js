const express = require("express");

const Actions = require("../data/helpers/actionModel");
const byProjectId = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/:projectId/actions", (req, res) => {
  byProjectId
    .get(req.params.projectId)
    .then((data) => {
      if (data) {
        res.status(200).json(data.actions);
      } else {
        res
          .status(404)
          .json({ message: "Project actions could not be found." });
      }
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).json({ message: "Error retrieving actions." });
    });
});

router.delete("/actions/:actionsId", (req, res) => {
    Actions.remove(req.params.actionsId)
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
})

// custom middleware to validate client data inputs
function validateActionContents(req, res, next) {
    if (!req.body.description || !req.body.notes) {
      res
        .status(400)
        .json({ message: "Please provide a action notes and descripton." });
    } else {
      next();
    }
  }

router.put("/actions/:actionsId", validateActionContents, (res, req) => {
    Actions.update(req.params.id, req.body)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "The action could not be found." });
      }
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).json({ message: "Error updating action." });
    });
})

module.exports = router;

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

module.exports = router;

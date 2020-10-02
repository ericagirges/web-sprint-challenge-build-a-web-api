const express = require("express");

const Actions = require("../data/helpers/actionModel");
const byProjectId = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/:id/actions", (req, res) => {
  byProjectId
    .get(req.params.projectId)
    .then((actions) => {
      if (projectId) {
        res.status(200).json(actions);
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

module.exports = router;

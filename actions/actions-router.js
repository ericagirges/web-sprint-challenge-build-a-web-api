const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

// GET action by id
router.get("/actions/:actionId", (req, res) => {
    Actions.get(req.params.actionId)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: "Unable to find action that matches given id." });
        }
    }) .catch(error => {
        res.status(500).json({ error: "Unable to retrieve action at this time." });
    });
});

// middleware to validate incoming project data
function validateActionContents(req, res, next) {
    if (!req.body.description || !req.body.notes) {
      res
        .status(400)
        .json({ message: "Please provide an action descripton and notes." });
    } else {
      next();
    };
  };

// POST add a new action
router.post("/projects/:projectId/actions", validateActionContents, (req, res) => {
    Actions.insert({
        project_id: req.params.projectId,
        description: req.body.description,
        notes: req.body.notes
    }) .then(newAction => {
        res.status(201).json({ message: "A new action was successfully created." });
    }) .catch(error => {
        res.status(500).json({ error: "Unable to add a new action at this time." });
    });
});

// PUT update/edit action
router.put("/actions/:actionId", validateActionContents, (req, res) => {
    Actions.update(req.params.actionId, req.body)
    .then(action => {
        if(!action){
            res.status(404).json({ message: "Unable to find action that matches given id." });
        } else {
            res.status(200).json({ message: "Action successfully updated." });
        }
    }) .catch(error => {
        res.status(500).json({ error: "Unable to edit actions at this time." });
    });
});

// DELETE remove action
router.delete("/actions/:actionId", (req, res) => {
    Actions.remove(req.params.actionId)
    .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: "The action has been deleted." });
        } else {
          res.status(404).json({ message: "The action could not be found." });
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        res.status(500).json({ message: "Error deleting the action." });
      });
});


module.exports = router;
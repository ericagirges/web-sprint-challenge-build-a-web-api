const express = require("express");

const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/:id/actions", (req, res) => {
    Actions.get(req.query)
    .then((actions) => {
        res.status(200).json(actions);
    })
    .catch((error) => {
        console.log("ERROR: ", error);
        res.status(500).json({ message: "Error retrieving actions."})
    })
})

module.exports = router;
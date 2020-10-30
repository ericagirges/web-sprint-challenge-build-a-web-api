const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/projects", projectsRouter);
server.use("/api", actionsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "Project Planner API" });
})

module.exports = server
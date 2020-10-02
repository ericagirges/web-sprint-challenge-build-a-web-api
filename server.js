const express = require("express");
const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/projects", actionsRouter);

server.get("/", (req, res) => {
  res
    .status(200)
    .json({
      project: "Node Sprint Challenge",
      environment: process.env.NODE_ENV,
    });
});

module.exports = server;

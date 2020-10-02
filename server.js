const express = require("express");
const projectsRouter = require("./projects/projectsRouter");

const server = express();

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res
    .status(200)
    .json({
      project: "Node Sprint Challenge",
      environment: process.env.NODE_ENV,
    });
});

module.exports = server;

const { Router } = require("express");

const { getTeamsHandler } = require("../handlers/teamsHandlers");

const teamsRouter = Router();

teamsRouter.get("/",  getTeamsHandler);

module.exports = teamsRouter;
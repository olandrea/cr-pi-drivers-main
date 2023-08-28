const { Router } = require("express");

const { getDriverHandler, getDriversHandler, createDriverHandler } = require("../handlers/driversHandlers");

const driversRouter = Router();


driversRouter.get("/", getDriversHandler);

driversRouter.get("/:id", getDriverHandler);

driversRouter.post("/", createDriverHandler);

module.exports = driversRouter;
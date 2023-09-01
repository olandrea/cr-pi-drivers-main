const { Router } = require("express");

const  validate = require("../middlewares/driversValidate");
const { getDriverHandler, getDriversHandler, createDriverHandler } = require("../handlers/driversHandlers");

const driversRouter = Router();


driversRouter.get("/", getDriversHandler);

driversRouter.get("/:id", getDriverHandler);

driversRouter.post("/", validate, createDriverHandler);

module.exports = driversRouter;
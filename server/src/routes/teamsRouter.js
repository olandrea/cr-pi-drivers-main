const { Router } = require("express");

const teamsRouter = Router();

teamsRouter.get("/", (req,res) => {
    res.send("NIY: Esta ruta trae la info de todos los teams");
});


module.exports = teamsRouter;
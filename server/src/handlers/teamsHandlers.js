const { getAllTeams } = require("../controller/teamsController");

const getTeamsHandler = async ( req, res) => {

   const results = await getAllTeams();
   
   res.status(200).json(results);
}

module.exports = { getTeamsHandler};
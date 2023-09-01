const axios = require('axios');
const { Team } = require('../db');

const getAllTeams = async () => {

    // todos los drivers de la api
    const results = (await axios.get("http://localhost:5000/drivers")).data;

    // de cada uno separo los teams por ',' y le saco los espacios
    // en esta lista de teams separados veo si ya los guarde en mi bdd
    // y sino lo guardo para las próximas búsquedas.
    results.forEach(driver => {

    if(driver.teams) {
       let teamsAll = driver.teams.split(/\s*,\s*/);
           
       teamsAll.forEach(driverTem => {   
          // Busca en el modelo el team y sino lo crea y lo guarda.
           Team.findOrCreate({
               where: {nombre: driverTem}
           });
       });
    }
    });
   // busco los de la bdd.
   const teamAll = await Team.findAll();

   return teamAll;
}

module.exports = { getAllTeams};
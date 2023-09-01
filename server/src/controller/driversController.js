const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");

const cleanArray = (arr) =>
  arr.map((elem) => {
      return {
          id: elem.id,
          nombre: elem.name.forename,
          apellido: elem.name.surname,
          descripcion: elem.description,
          imagen: elem.image,
          nacionalidad: elem.nationality,
          fechaNac: elem.dob,
          create: false,
      };
  });

const createDriver = async ( nombre, apellido, descripcion, imagen, nacionalidad, fechaNac, teams) => {

const resultado = await Driver.create({ nombre, apellido, descripcion, imagen, nacionalidad, fechaNac});
    
    // console.log(newDriver.__proto__);
  // relacionar en tabla intermedia

   await resultado.addTeams(teams);

    const driverNew = await Driver.findByPk(resultado.id, {
      include: {
          model: Team,
          attributes:["nombre"],
          through: {
            attributes: []
          }
      },
    });
  return driverNew;
}


const getDriverById = async (id, source) => {
  // si source es api trae el driver.id de la api
  // si source es bdd trae el driver.id de la bdd y le agrega el modelo team
    const driver =
      source === "api"
        ? (await axios.get(`http://localhost:5000/drivers/${id}`))
           .data  
        : await Driver.findByPk(id, 
            {include:{
                model: Team,
                attributes:["nombre"],
                through: {
                    attributes: []
                  }
            },
        });

     if( source === "bdd") {
       // driver.id de bdd
         return driver;
     } else {
       // driver.id de api y la limpia con los atributos q solo quiero mostrar 
        return {
            id: driver.id,
            nombre: driver.name.forename,
            apellido: driver.name.surname,
            descripcion: driver.description,
            imagen: driver.image,
            nacionalidad: driver.nationality,
            fechaNac: driver.dob,
            teams: driver.teams,
            create: false,
        }; 
     }
};

const getAllDrivers = async () => {
    // buscar en bdd
    const databaseDrivers = await Driver.findAll();
    
    // buscar en api y limpiar
    const apiDriverRaw = (await axios.get("http://localhost:5000/drivers")).data 
    const apiDrivers = cleanArray(apiDriverRaw);
   
    return [...databaseDrivers, ...apiDrivers];
};

const searchDriverByName = async (nombre) => {
   // const databaseDrivers = await Driver.findAll({ where: { nombre:{ [ Op.iLike]: `${nombre}`}  } });
   const databaseDrivers = await Driver.findAll();
   const filteredBdd = databaseDrivers.filter((driver) => driver.nombre.toLowerCase() === nombre.toLowerCase());

    const apiDriversRaw = (await axios.get('http://localhost:5000/drivers')).data;
    const apiDrivers = cleanArray(apiDriversRaw);

    const filteredApi = apiDrivers.filter((driver) => driver.nombre.toLowerCase() === nombre.toLowerCase());

    const allDriversName = filteredBdd.concat(filteredApi).slice(0,15);
    return allDriversName;    
};

module.exports = { createDriver, getDriverById, getAllDrivers, searchDriverByName };
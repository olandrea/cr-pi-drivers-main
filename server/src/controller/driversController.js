const axios = require("axios");
const { Driver } = require("../db");
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

const createDriver = async ( nombre, apellido, descripcion, imagen, nacionalidad, fechaNac) => 
await Driver.create({ nombre, apellido, descripcion, imagen, nacionalidad, fechaNac});

const getDriverById = async (id, source) => {
    const driver =
      source === "api"
        ? (await axios.get(`http://localhost:5000/drivers/${id}`))
           .data  
        : await Driver.findByPk(id);

     if( source === "bdd") {
         return driver;
     } else {
         return {
            id: driver.id,
            nombre: driver.name.forename,
            apellido: driver.name.surname,
            descripcion: driver.description,
            imagen: driver.image,
            nacionalidad: driver.nationality,
            fechaNac: driver.dob,
            create: false,
        }; 
     }

};

const getAllDrivers = async () => {
    // buscar en bdd
    const databaseDrivers = await Driver.findAll();

    const apiDriverRaw = (await axios.get("http://localhost:5000/drivers")).data

    const apiDrivers = cleanArray(apiDriverRaw);

    return [...databaseDrivers, ...apiDrivers];

};

const searchDriverByName = async (nombre) => {
    const databaseDrivers = await Driver.findAll({ where: { nombre:{ [ Op.iLike]: `${nombre}`}  } });

    const apiDriversRaw = (await axios.get('http://localhost:5000/drivers')).data;
    const apiDrivers = cleanArray(apiDriversRaw);

    const filteredApi = apiDrivers.filter((driver) => driver.nombre === nombre);

    return [...filteredApi, ...databaseDrivers];

};

module.exports = { createDriver, getDriverById, getAllDrivers, searchDriverByName };
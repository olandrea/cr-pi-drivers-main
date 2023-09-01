const { createDriver, getDriverById, getAllDrivers, searchDriverByName } = require("../controller/driversController");

const getDriversHandler = async (req,res) => {
    const { nombre } = req.query;
    
    const results = nombre ? await searchDriverByName(nombre) : await getAllDrivers()

    res.status(200).json(results);
    
};


const getDriverHandler = async (req,res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const driver = await getDriverById(id, source);
        res.status(200).json(driver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createDriverHandler = async (req,res) => {
    const { nombre, apellido, descripcion, imagen, nacionalidad, fechaNac, teams} = req.body;
    try {
        const newDriver = await createDriver( nombre, apellido, descripcion, imagen, nacionalidad, fechaNac, teams);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getDriverHandler,
    getDriversHandler,
    createDriverHandler,
};
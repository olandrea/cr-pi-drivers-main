
const validate = (req,res, next) => {
    const { nombre, apellido, descripcion, imagen, nacionalidad, fechaNac, teams} = req.body;

    if (!nombre) return res.status(400).json({ error: "Missing Nombre"});
    if (!apellido) return res.status(400).json({ error: "Missing Apellido"});
    if (!descripcion) return res.status(400).json({ error: "Missing Descripcion"});
    if (!imagen) return res.status(400).json({ error: "Missing Imagen"});
    if (!nacionalidad) return res.status(400).json({ error: "Missing Nacionalidad"});
    if (!fechaNac) return res.status(400).json({ error: "Missing Fecha Nacimiento"});
    if (!teams) return res.status(400).json({ error: "Missing teams"});

    next();
};

module.exports = validate;
const prisma = require("../config/prisma");

exports.listar = async (_req, res) => {
  try {
    const acciones = await prisma.catalogoAccion.findMany();
    res.json(acciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const accion = await prisma.catalogoAccion.findUnique({
      where: { id: req.params.id },
    });
    if (!accion) return res.status(404).json({ error: "Acción no encontrada" });
    res.json(accion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { nombre, tipo, descripcion, parametros } = req.body;
    if (!nombre || !tipo)
      return res.status(400).json({ error: "nombre y tipo son requeridos" });

    const accion = await prisma.catalogoAccion.create({
      data: { nombre, tipo, descripcion, parametros },
    });
    res.status(201).json(accion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const { nombre, tipo, descripcion, parametros } = req.body;
    const data = {};
    if (nombre !== undefined) data.nombre = nombre;
    if (tipo !== undefined) data.tipo = tipo;
    if (descripcion !== undefined) data.descripcion = descripcion;
    if (parametros !== undefined) data.parametros = parametros;

    const accion = await prisma.catalogoAccion.update({
      where: { id: req.params.id },
      data,
    });
    res.json(accion);
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Acción no encontrada" });
    res.status(500).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await prisma.catalogoAccion.delete({ where: { id: req.params.id } });
    res.json({ mensaje: "Acción eliminada" });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Acción no encontrada" });
    res.status(500).json({ error: err.message });
  }
};

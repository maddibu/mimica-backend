const prisma = require("../config/prisma");

exports.listar = async (req, res) => {
  try {
    const where =
      req.usuario.rol === "admin" ? {} : { usuario_id: req.usuario.id };
    const perfiles = await prisma.perfilAccesibilidad.findMany({ where });
    res.json(perfiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const perfil = await prisma.perfilAccesibilidad.findUnique({
      where: { id: req.params.id },
    });
    if (!perfil) return res.status(404).json({ error: "Perfil no encontrado" });
    if (req.usuario.rol !== "admin" && perfil.usuario_id !== req.usuario.id)
      return res.status(403).json({ error: "No tienes acceso a este perfil" });
    res.json(perfil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre)
      return res.status(400).json({ error: "El nombre es requerido" });
    const perfil = await prisma.perfilAccesibilidad.create({
      data: { nombre, usuario_id: req.usuario.id },
    });
    res.status(201).json(perfil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const perfil = await prisma.perfilAccesibilidad.findUnique({
      where: { id: req.params.id },
    });
    if (!perfil) return res.status(404).json({ error: "Perfil no encontrado" });
    if (req.usuario.rol !== "admin" && perfil.usuario_id !== req.usuario.id)
      return res.status(403).json({ error: "No tienes acceso a este perfil" });

    const { nombre, activo } = req.body;
    const data = {};
    if (nombre !== undefined) data.nombre = nombre;
    if (activo !== undefined) data.activo = activo;

    const actualizado = await prisma.perfilAccesibilidad.update({
      where: { id: req.params.id },
      data,
    });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const perfil = await prisma.perfilAccesibilidad.findUnique({
      where: { id: req.params.id },
    });
    if (!perfil) return res.status(404).json({ error: "Perfil no encontrado" });
    if (req.usuario.rol !== "admin" && perfil.usuario_id !== req.usuario.id)
      return res.status(403).json({ error: "No tienes acceso a este perfil" });

    await prisma.perfilAccesibilidad.delete({ where: { id: req.params.id } });
    res.json({ mensaje: "Perfil eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

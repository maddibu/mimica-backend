const prisma = require("../config/prisma");

exports.listar = async (req, res) => {
  try {
    const where =
      req.usuario.rol === "admin" ? {} : { usuario_id: req.usuario.id };
    const documentos = await prisma.documento.findMany({
      where,
      orderBy: { ultimo_acceso: "desc" },
    });
    res.json(documentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const documento = await prisma.documento.findUnique({
      where: { id: req.params.id },
    });
    if (!documento)
      return res.status(404).json({ error: "Documento no encontrado" });
    if (req.usuario.rol !== "admin" && documento.usuario_id !== req.usuario.id)
      return res
        .status(403)
        .json({ error: "No tienes acceso a este documento" });
    res.json(documento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { nombre, tipo, ruta_archivo } = req.body;
    if (!nombre || !tipo || !ruta_archivo)
      return res
        .status(400)
        .json({ error: "nombre, tipo y ruta_archivo son requeridos" });

    const documento = await prisma.documento.create({
      data: { nombre, tipo, ruta_archivo, usuario_id: req.usuario.id },
    });
    res.status(201).json(documento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const documento = await prisma.documento.findUnique({
      where: { id: req.params.id },
    });
    if (!documento)
      return res.status(404).json({ error: "Documento no encontrado" });
    if (req.usuario.rol !== "admin" && documento.usuario_id !== req.usuario.id)
      return res
        .status(403)
        .json({ error: "No tienes acceso a este documento" });

    const { nombre, pagina_actual } = req.body;
    const data = { ultimo_acceso: new Date() };
    if (nombre !== undefined) data.nombre = nombre;
    if (pagina_actual !== undefined) data.pagina_actual = pagina_actual;

    const actualizado = await prisma.documento.update({
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
    const documento = await prisma.documento.findUnique({
      where: { id: req.params.id },
    });
    if (!documento)
      return res.status(404).json({ error: "Documento no encontrado" });
    if (req.usuario.rol !== "admin" && documento.usuario_id !== req.usuario.id)
      return res
        .status(403)
        .json({ error: "No tienes acceso a este documento" });

    await prisma.documento.delete({ where: { id: req.params.id } });
    res.json({ mensaje: "Documento eliminado" });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Documento no encontrado" });
    res.status(500).json({ error: err.message });
  }
};

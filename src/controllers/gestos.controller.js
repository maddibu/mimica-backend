const prisma = require("../config/prisma");

exports.listar = async (_req, res) => {
  try {
    const gestos = await prisma.gesto.findMany({
      where: { activo: true },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        valores_referencia: true,
        tolerancia_default: true,
        creado_en: true,
      },
    });
    res.json(gestos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const gesto = await prisma.gesto.findUnique({
      where: { id: req.params.id },
    });
    if (!gesto) return res.status(404).json({ error: "Gesto no encontrado" });
    res.json(gesto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { nombre, descripcion, valores_referencia, tolerancia_default } =
      req.body;
    if (!nombre)
      return res.status(400).json({ error: "El nombre es requerido" });

    const gesto = await prisma.gesto.create({
      data: {
        nombre,
        descripcion,
        valores_referencia,
        tolerancia_default: tolerancia_default ?? 0.8,
        creado_por: req.usuario.id,
      },
    });
    res.status(201).json(gesto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      valores_referencia,
      tolerancia_default,
      activo,
    } = req.body;
    const data = {};
    if (nombre !== undefined) data.nombre = nombre;
    if (descripcion !== undefined) data.descripcion = descripcion;
    if (valores_referencia !== undefined)
      data.valores_referencia = valores_referencia;
    if (tolerancia_default !== undefined)
      data.tolerancia_default = tolerancia_default;
    if (activo !== undefined) data.activo = activo;

    const gesto = await prisma.gesto.update({
      where: { id: req.params.id },
      data,
    });
    res.json(gesto);
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Gesto no encontrado" });
    res.status(500).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const gesto = await prisma.gesto.update({
      where: { id: req.params.id },
      data: { activo: false },
    });
    res.json({ mensaje: "Gesto desactivado", gesto });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Gesto no encontrado" });
    res.status(500).json({ error: err.message });
  }
};

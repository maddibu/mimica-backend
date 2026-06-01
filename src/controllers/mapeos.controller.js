const prisma = require("../config/prisma");

exports.listar = async (req, res) => {
  try {
    const { perfil_id } = req.query;
    if (!perfil_id)
      return res.status(400).json({ error: "perfil_id es requerido" });

    if (req.usuario.rol !== "admin") {
      const perfil = await prisma.perfilAccesibilidad.findUnique({
        where: { id: perfil_id },
      });
      if (!perfil)
        return res.status(404).json({ error: "Perfil no encontrado" });
      if (perfil.usuario_id !== req.usuario.id)
        return res
          .status(403)
          .json({ error: "No tienes acceso a este perfil" });
    }

    const mapeos = await prisma.mapeoGesto.findMany({
      where: { perfil_id },
      include: {
        gesto: { select: { id: true, nombre: true, descripcion: true } },
        accion: { select: { id: true, nombre: true, tipo: true } },
      },
    });
    res.json(mapeos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { perfil_id, gesto_id, accion_id } = req.body;
    if (!perfil_id || !gesto_id || !accion_id)
      return res
        .status(400)
        .json({ error: "perfil_id, gesto_id y accion_id son requeridos" });

    if (req.usuario.rol !== "admin") {
      const perfil = await prisma.perfilAccesibilidad.findUnique({
        where: { id: perfil_id },
      });
      if (!perfil)
        return res.status(404).json({ error: "Perfil no encontrado" });
      if (perfil.usuario_id !== req.usuario.id)
        return res
          .status(403)
          .json({ error: "No tienes acceso a este perfil" });
    }

    const mapeo = await prisma.mapeoGesto.create({
      data: { perfil_id, gesto_id, accion_id },
      include: {
        gesto: { select: { id: true, nombre: true } },
        accion: { select: { id: true, nombre: true, tipo: true } },
      },
    });
    res.status(201).json(mapeo);
  } catch (err) {
    if (err.code === "P2002")
      return res
        .status(409)
        .json({
          error: "Este gesto ya tiene una acción asignada en este perfil",
        });
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const { accion_id, activo } = req.body;

    const mapeo = await prisma.mapeoGesto.findUnique({
      where: { id: req.params.id },
      include: { perfil: true },
    });
    if (!mapeo) return res.status(404).json({ error: "Mapeo no encontrado" });

    if (
      req.usuario.rol !== "admin" &&
      mapeo.perfil.usuario_id !== req.usuario.id
    )
      return res.status(403).json({ error: "No tienes acceso a este mapeo" });

    const data = {};
    if (accion_id !== undefined) data.accion_id = accion_id;
    if (activo !== undefined) data.activo = activo;

    const actualizado = await prisma.mapeoGesto.update({
      where: { id: req.params.id },
      data,
      include: {
        gesto: { select: { id: true, nombre: true } },
        accion: { select: { id: true, nombre: true, tipo: true } },
      },
    });
    res.json(actualizado);
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Mapeo no encontrado" });
    res.status(500).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const mapeo = await prisma.mapeoGesto.findUnique({
      where: { id: req.params.id },
      include: { perfil: true },
    });
    if (!mapeo) return res.status(404).json({ error: "Mapeo no encontrado" });

    if (
      req.usuario.rol !== "admin" &&
      mapeo.perfil.usuario_id !== req.usuario.id
    )
      return res.status(403).json({ error: "No tienes acceso a este mapeo" });

    await prisma.mapeoGesto.delete({ where: { id: req.params.id } });
    res.json({ mensaje: "Mapeo eliminado" });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Mapeo no encontrado" });
    res.status(500).json({ error: err.message });
  }
};

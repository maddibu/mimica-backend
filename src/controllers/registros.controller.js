const prisma = require("../config/prisma");

exports.listar = async (req, res) => {
  try {
    const where =
      req.usuario.rol === "admin" ? {} : { usuario_id: req.usuario.id };

    const registros = await prisma.registroAccion.findMany({
      where,
      orderBy: { ocurrido_en: "desc" },
      take: 100,
      include: {
        mapeo: {
          include: {
            gesto: { select: { id: true, nombre: true } },
            accion: { select: { id: true, nombre: true, tipo: true } },
          },
        },
      },
    });
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const registro = await prisma.registroAccion.findUnique({
      where: { id: req.params.id },
      include: {
        mapeo: {
          include: {
            gesto: { select: { id: true, nombre: true } },
            accion: { select: { id: true, nombre: true, tipo: true } },
          },
        },
      },
    });

    if (!registro)
      return res.status(404).json({ error: "Registro no encontrado" });
    if (req.usuario.rol !== "admin" && registro.usuario_id !== req.usuario.id)
      return res
        .status(403)
        .json({ error: "No tienes acceso a este registro" });

    res.json(registro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { mapeo_id, gesto_detectado, exitoso } = req.body;
    if (!mapeo_id || !gesto_detectado)
      return res
        .status(400)
        .json({ error: "mapeo_id y gesto_detectado son requeridos" });

    const registro = await prisma.registroAccion.create({
      data: {
        usuario_id: req.usuario.id,
        mapeo_id,
        gesto_detectado,
        exitoso: exitoso ?? false,
      },
    });
    res.status(201).json(registro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

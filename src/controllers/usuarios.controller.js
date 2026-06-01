const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

const select = {
  id: true,
  nombre: true,
  email: true,
  rol: true,
  activo: true,
  creado_en: true,
  actualizado_en: true,
};

exports.listar = async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({ select });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.usuario.rol !== "admin" && req.usuario.id !== id)
      return res
        .status(403)
        .json({ error: "Solo puedes ver tu propio perfil" });

    const usuario = await prisma.usuario.findUnique({ where: { id }, select });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.usuario.rol !== "admin" && req.usuario.id !== id)
      return res
        .status(403)
        .json({ error: "Solo puedes editar tu propio perfil" });

    const { nombre, email, contrasena, rol, activo } = req.body;
    const data = {};

    if (nombre) data.nombre = nombre;
    if (email) data.email = email;
    if (contrasena) data.contrasena_hash = await bcrypt.hash(contrasena, 10);

    if (req.usuario.rol === "admin") {
      if (rol !== undefined) data.rol = rol;
      if (activo !== undefined) data.activo = activo;
    }

    const usuario = await prisma.usuario.update({
      where: { id },
      data,
      select,
    });
    res.json(usuario);
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Usuario no encontrado" });
    if (err.code === "P2002")
      return res.status(409).json({ error: "El email ya está en uso" });
    res.status(500).json({ error: err.message });
  }
};

exports.desactivar = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.usuario.id)
      return res
        .status(400)
        .json({ error: "No puedes desactivarte a ti mismo" });

    const usuario = await prisma.usuario.update({
      where: { id },
      data: { activo: false },
      select,
    });
    res.json({ mensaje: "Usuario desactivado", usuario });
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(500).json({ error: err.message });
  }
};

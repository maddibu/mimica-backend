const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const prisma = require('../config/prisma');

exports.register = async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body;
    if (!nombre || !email || !contrasena)
      return res.status(400).json({ error: 'Faltan campos requeridos' });

    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) return res.status(409).json({ error: 'El email ya está registrado' });

    const hash    = await bcrypt.hash(contrasena, 10);
    const usuario = await prisma.usuario.create({
      data: { nombre, email, contrasena_hash: hash },
      select: { id: true, nombre: true, email: true, rol: true },
    });

    res.status(201).json({ usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena_hash)))
      return res.status(401).json({ error: 'Credenciales inválidas' });

    if (!usuario.activo)
      return res.status(403).json({ error: 'Cuenta desactivada' });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

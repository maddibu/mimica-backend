const router = require('express').Router();
const auth   = require('../middlewares/auth.middleware');
// const ctrl = require('../controllers/gestos.controller');

// Todas las rutas de este recurso requieren autenticación
router.use(auth);

// TODO: implementar controladores
router.get('/',    (_req, res) => res.json({ message: 'GET /gestos — pendiente' }));
router.post('/',   (_req, res) => res.json({ message: 'POST /gestos — pendiente' }));
router.get('/:id', (_req, res) => res.json({ message: 'GET /gestos/:id — pendiente' }));
router.put('/:id', (_req, res) => res.json({ message: 'PUT /gestos/:id — pendiente' }));
router.delete('/:id', (_req, res) => res.json({ message: 'DELETE /gestos/:id — pendiente' }));

module.exports = router;

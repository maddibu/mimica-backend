const router = require('express').Router();
const auth   = require('../middlewares/auth.middleware');
// const ctrl = require('../controllers/documentos.controller');

// Todas las rutas de este recurso requieren autenticación
router.use(auth);

// TODO: implementar controladores
router.get('/',    (_req, res) => res.json({ message: 'GET /documentos — pendiente' }));
router.post('/',   (_req, res) => res.json({ message: 'POST /documentos — pendiente' }));
router.get('/:id', (_req, res) => res.json({ message: 'GET /documentos/:id — pendiente' }));
router.put('/:id', (_req, res) => res.json({ message: 'PUT /documentos/:id — pendiente' }));
router.delete('/:id', (_req, res) => res.json({ message: 'DELETE /documentos/:id — pendiente' }));

module.exports = router;

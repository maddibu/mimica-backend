const router = require('express').Router();
const auth   = require('../middlewares/auth.middleware');
// const ctrl = require('../controllers/registros.controller');

// Todas las rutas de este recurso requieren autenticación
router.use(auth);

// TODO: implementar controladores
router.get('/',    (_req, res) => res.json({ message: 'GET /registros — pendiente' }));
router.post('/',   (_req, res) => res.json({ message: 'POST /registros — pendiente' }));
router.get('/:id', (_req, res) => res.json({ message: 'GET /registros/:id — pendiente' }));
router.put('/:id', (_req, res) => res.json({ message: 'PUT /registros/:id — pendiente' }));
router.delete('/:id', (_req, res) => res.json({ message: 'DELETE /registros/:id — pendiente' }));

module.exports = router;

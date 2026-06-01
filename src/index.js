require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth',       require('./routes/auth.routes'));
app.use('/api/usuarios',   require('./routes/usuarios.routes'));
app.use('/api/perfiles',   require('./routes/perfiles.routes'));
app.use('/api/gestos',     require('./routes/gestos.routes'));
app.use('/api/mapeos',     require('./routes/mapeos.routes'));
app.use('/api/acciones',   require('./routes/acciones.routes'));
app.use('/api/registros',  require('./routes/registros.routes'));
app.use('/api/documentos', require('./routes/documentos.routes'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

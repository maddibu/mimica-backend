const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Usuario admin de prueba
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@mimica.app' },
    update: {},
    create: {
      nombre: 'Admin Mimica',
      email:  'admin@mimica.app',
      contrasena_hash: await bcrypt.hash('Admin123!', 10),
      rol: 'admin',
    },
  });

  // Acciones de catálogo iniciales
  const acciones = await Promise.all([
    prisma.catalogoAccion.upsert({
      where: { id: '00000000-0000-0000-0000-000000000001' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000001',
        nombre: 'Pasar página siguiente',
        tipo:   'navegacion',
        descripcion: 'Avanza a la siguiente página del documento activo',
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: '00000000-0000-0000-0000-000000000002' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000002',
        nombre: 'Pasar página anterior',
        tipo:   'navegacion',
        descripcion: 'Retrocede a la página anterior del documento activo',
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: '00000000-0000-0000-0000-000000000003' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000003',
        nombre: 'Zoom in',
        tipo:   'visualizacion',
        descripcion: 'Aumenta el zoom del documento',
        parametros: { factor: 1.2 },
      },
    }),
  ]);

  console.log('✅ Seed completado');
  console.log('   Admin:', admin.email);
  console.log('   Acciones:', acciones.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // ── Admin ─────────────────────────────────────────────
  const admin = await prisma.usuario.upsert({
    where: { email: "admin@mimica.app" },
    update: {},
    create: {
      nombre: "Admin Mimica",
      email: "admin@mimica.app",
      contrasena_hash: await bcrypt.hash("Admin123!", 10),
      rol: "admin",
    },
  });

  // ── Usuario de prueba ─────────────────────────────────
  const usuarioPrueba = await prisma.usuario.upsert({
    where: { email: "prueba@mimica.app" },
    update: {},
    create: {
      nombre: "Usuario Prueba",
      email: "prueba@mimica.app",
      contrasena_hash: await bcrypt.hash("Prueba123!", 10),
      rol: "usuario",
    },
  });

  // ── Gestos (catálogo fijo, creados por admin) ─────────
  await Promise.all([
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000001" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000001",
        nombre: "HEAD_DOWN",
        descripcion: "Inclinar la cabeza hacia abajo",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000002" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000002",
        nombre: "HEAD_UP",
        descripcion: "Inclinar la cabeza hacia arriba",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000003" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000003",
        nombre: "HEAD_RIGHT",
        descripcion: "Girar la cabeza hacia la derecha",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000004" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000004",
        nombre: "HEAD_LEFT",
        descripcion: "Girar la cabeza hacia la izquierda",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000005" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000005",
        nombre: "SMILE",
        descripcion: "Sonrisa con ambos lados de la boca",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000006" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000006",
        nombre: "JAW_OPEN",
        descripcion: "Apertura de boca",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000007" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000007",
        nombre: "BROW_UP",
        descripcion: "Levantar ambas cejas",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000008" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000008",
        nombre: "CHEEK_PUFF",
        descripcion: "Inflar las mejillas",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000009" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000009",
        nombre: "WINK_RIGHT",
        descripcion: "Guiño con el ojo derecho",
        creado_por: admin.id,
      },
    }),
    prisma.gesto.upsert({
      where: { id: "10000000-0000-0000-0000-000000000010" },
      update: {},
      create: {
        id: "10000000-0000-0000-0000-000000000010",
        nombre: "WINK_LEFT",
        descripcion: "Guiño con el ojo izquierdo",
        creado_por: admin.id,
      },
    }),
  ]);

  // ── Acciones de catálogo ──────────────────────────────
  await Promise.all([
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000001" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000001",
        nombre: "PAGE_NEXT",
        tipo: "navegacion",
        descripcion: "Avanza a la siguiente página del documento activo",
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000002" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000002",
        nombre: "PAGE_PREV",
        tipo: "navegacion",
        descripcion: "Retrocede a la página anterior del documento activo",
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000003" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000003",
        nombre: "NAV_RIGHT",
        tipo: "navegacion",
        descripcion: "Navega al elemento siguiente en la interfaz",
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000004" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000004",
        nombre: "NAV_LEFT",
        tipo: "navegacion",
        descripcion: "Navega al elemento anterior en la interfaz",
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000005" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000005",
        nombre: "SELECT",
        tipo: "interaccion",
        descripcion: "Selecciona o activa el elemento enfocado",
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000006" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000006",
        nombre: "CONFIRM",
        tipo: "interaccion",
        descripcion: "Confirma la acción actual",
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000007" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000007",
        nombre: "ZOOM_IN",
        tipo: "visualizacion",
        descripcion: "Aumenta el zoom del documento",
        parametros: { factor: 1.2 },
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000008" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000008",
        nombre: "ZOOM_OUT",
        tipo: "visualizacion",
        descripcion: "Reduce el zoom del documento",
        parametros: { factor: 0.8 },
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000009" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000009",
        nombre: "BACK",
        tipo: "navegacion",
        descripcion: "Regresa a la pantalla anterior",
      },
    }),
    prisma.catalogoAccion.upsert({
      where: { id: "00000000-0000-0000-0000-000000000010" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000010",
        nombre: "MOVE_BUTTONS",
        tipo: "interaccion",
        descripcion: "Mueve el foco entre botones de la interfaz",
      },
    }),
  ]);

  // ── Perfil del usuario de prueba ──────────────────────
  await prisma.perfilAccesibilidad.upsert({
    where: { id: "20000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "20000000-0000-0000-0000-000000000001",
      nombre: "Perfil principal",
      usuario_id: usuarioPrueba.id,
      activo: true,
    },
  });

  console.log("✅ Seed completado");
  console.log("   Admin:", admin.email, "/ Admin123!");
  console.log("   Usuario prueba:", usuarioPrueba.email, "/ Prueba123!");
  console.log("   Gestos: 10");
  console.log("   Acciones: 10");
  console.log("   Mapeos: ninguno (pendiente)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

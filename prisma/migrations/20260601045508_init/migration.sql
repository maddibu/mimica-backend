-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'usuario', 'invitado');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena_hash" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'usuario',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfiles_accesibilidad" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfiles_accesibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogo_acciones" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "parametros" JSONB,
    "descripcion" TEXT,

    CONSTRAINT "catalogo_acciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gestos" (
    "id" UUID NOT NULL,
    "creado_por" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "valores_referencia" JSONB,
    "tolerancia_default" DOUBLE PRECISION NOT NULL DEFAULT 0.8,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gestos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapeos_gestos" (
    "id" UUID NOT NULL,
    "perfil_id" UUID NOT NULL,
    "gesto_id" UUID NOT NULL,
    "accion_id" UUID NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mapeos_gestos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registro_acciones" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "mapeo_id" UUID NOT NULL,
    "gesto_detectado" TEXT NOT NULL,
    "exitoso" BOOLEAN NOT NULL DEFAULT false,
    "ocurrido_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registro_acciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ruta_archivo" TEXT NOT NULL,
    "pagina_actual" INTEGER NOT NULL DEFAULT 1,
    "fecha_subida" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimo_acceso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mapeos_gestos_perfil_id_gesto_id_key" ON "mapeos_gestos"("perfil_id", "gesto_id");

-- AddForeignKey
ALTER TABLE "perfiles_accesibilidad" ADD CONSTRAINT "perfiles_accesibilidad_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gestos" ADD CONSTRAINT "gestos_creado_por_fkey" FOREIGN KEY ("creado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapeos_gestos" ADD CONSTRAINT "mapeos_gestos_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles_accesibilidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapeos_gestos" ADD CONSTRAINT "mapeos_gestos_gesto_id_fkey" FOREIGN KEY ("gesto_id") REFERENCES "gestos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapeos_gestos" ADD CONSTRAINT "mapeos_gestos_accion_id_fkey" FOREIGN KEY ("accion_id") REFERENCES "catalogo_acciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registro_acciones" ADD CONSTRAINT "registro_acciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registro_acciones" ADD CONSTRAINT "registro_acciones_mapeo_id_fkey" FOREIGN KEY ("mapeo_id") REFERENCES "mapeos_gestos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

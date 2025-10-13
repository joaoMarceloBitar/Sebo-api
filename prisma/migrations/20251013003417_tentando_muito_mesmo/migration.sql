/*
  Warnings:

  - You are about to drop the column `tipo_usuario` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."usuarios" DROP COLUMN "tipo_usuario";

-- DropEnum
DROP TYPE "public"."TipoUsuario";

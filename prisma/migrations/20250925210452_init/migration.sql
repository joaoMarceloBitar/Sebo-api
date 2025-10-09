/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Pedido" DROP CONSTRAINT "Pedido_id_comprador_fkey";

-- AlterTable
ALTER TABLE "public"."Pedido" ALTER COLUMN "id_comprador" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Usuario" DROP CONSTRAINT "Usuario_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Usuario_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Pedido" ADD CONSTRAINT "Pedido_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

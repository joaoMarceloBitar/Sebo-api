/*
  Warnings:

  - You are about to drop the column `id_vendedor` on the `Anuncio` table. All the data in the column will be lost.
  - You are about to drop the `Carrinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PedidoItem` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `Pedido` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipo_usuario` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('CLIENTE', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."StatusPedido" AS ENUM ('PENDENTE', 'ENVIADO', 'ENTREGUE', 'CANCELADO');

-- DropForeignKey
ALTER TABLE "public"."Anuncio" DROP CONSTRAINT "Anuncio_id_vendedor_fkey";

-- DropForeignKey
ALTER TABLE "public"."Carrinho" DROP CONSTRAINT "Carrinho_id_anuncio_fkey";

-- DropForeignKey
ALTER TABLE "public"."Carrinho" DROP CONSTRAINT "Carrinho_id_comprador_fkey";

-- DropForeignKey
ALTER TABLE "public"."PedidoItem" DROP CONSTRAINT "PedidoItem_id_anuncio_fkey";

-- DropForeignKey
ALTER TABLE "public"."PedidoItem" DROP CONSTRAINT "PedidoItem_id_pedido_fkey";

-- AlterTable
ALTER TABLE "public"."Anuncio" DROP COLUMN "id_vendedor";

-- AlterTable
ALTER TABLE "public"."Pedido" DROP COLUMN "status",
ADD COLUMN     "status" "public"."StatusPedido" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "tipo_usuario",
ADD COLUMN     "tipo_usuario" "public"."TipoUsuario" NOT NULL;

-- DropTable
DROP TABLE "public"."Carrinho";

-- DropTable
DROP TABLE "public"."PedidoItem";

-- CreateTable
CREATE TABLE "public"."_AnuncioToPedido" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnuncioToPedido_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnuncioToPedido_B_index" ON "public"."_AnuncioToPedido"("B");

-- AddForeignKey
ALTER TABLE "public"."_AnuncioToPedido" ADD CONSTRAINT "_AnuncioToPedido_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Anuncio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AnuncioToPedido" ADD CONSTRAINT "_AnuncioToPedido_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

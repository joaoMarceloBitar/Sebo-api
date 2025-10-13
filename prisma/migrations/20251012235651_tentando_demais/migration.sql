/*
  Warnings:

  - You are about to drop the `PedidoAnuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PedidoAnuncio" DROP CONSTRAINT "PedidoAnuncio_id_anuncio_fkey";

-- DropForeignKey
ALTER TABLE "public"."PedidoAnuncio" DROP CONSTRAINT "PedidoAnuncio_id_pedido_fkey";

-- DropForeignKey
ALTER TABLE "public"."pedidos" DROP CONSTRAINT "pedidos_id_comprador_fkey";

-- DropTable
DROP TABLE "public"."PedidoAnuncio";

-- DropTable
DROP TABLE "public"."pedidos";

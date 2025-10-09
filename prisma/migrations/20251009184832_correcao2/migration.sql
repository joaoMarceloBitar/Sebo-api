/*
  Warnings:

  - You are about to drop the `_AnuncioToPedido` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_AnuncioToPedido" DROP CONSTRAINT "_AnuncioToPedido_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AnuncioToPedido" DROP CONSTRAINT "_AnuncioToPedido_B_fkey";

-- DropTable
DROP TABLE "public"."_AnuncioToPedido";

-- CreateTable
CREATE TABLE "public"."propostas" (
    "id" SERIAL NOT NULL,
    "usuarioId" VARCHAR(36) NOT NULL,
    "anuncioId" INTEGER NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "resposta" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PedidoAnuncio" (
    "id_pedido" INTEGER NOT NULL,
    "id_anuncio" INTEGER NOT NULL,

    CONSTRAINT "PedidoAnuncio_pkey" PRIMARY KEY ("id_pedido","id_anuncio")
);

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "public"."Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoAnuncio" ADD CONSTRAINT "PedidoAnuncio_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoAnuncio" ADD CONSTRAINT "PedidoAnuncio_id_anuncio_fkey" FOREIGN KEY ("id_anuncio") REFERENCES "public"."Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

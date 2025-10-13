/*
  Warnings:

  - You are about to drop the `Anuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Anuncio" DROP CONSTRAINT "Anuncio_id_livro_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pedido" DROP CONSTRAINT "Pedido_id_comprador_fkey";

-- DropForeignKey
ALTER TABLE "public"."PedidoAnuncio" DROP CONSTRAINT "PedidoAnuncio_id_anuncio_fkey";

-- DropForeignKey
ALTER TABLE "public"."PedidoAnuncio" DROP CONSTRAINT "PedidoAnuncio_id_pedido_fkey";

-- DropForeignKey
ALTER TABLE "public"."propostas" DROP CONSTRAINT "propostas_anuncioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."propostas" DROP CONSTRAINT "propostas_usuarioId_fkey";

-- DropTable
DROP TABLE "public"."Anuncio";

-- DropTable
DROP TABLE "public"."Pedido";

-- DropTable
DROP TABLE "public"."Usuario";

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "endereco" TEXT,
    "tipo_usuario" "public"."TipoUsuario" NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."anuncios" (
    "id" SERIAL NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "condicao_detalhada" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_livro" INTEGER NOT NULL,

    CONSTRAINT "anuncios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedidos" (
    "id" SERIAL NOT NULL,
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."StatusPedido" NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "id_comprador" TEXT NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- AddForeignKey
ALTER TABLE "public"."anuncios" ADD CONSTRAINT "anuncios_id_livro_fkey" FOREIGN KEY ("id_livro") REFERENCES "public"."Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pedidos" ADD CONSTRAINT "pedidos_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."propostas" ADD CONSTRAINT "propostas_anuncioId_fkey" FOREIGN KEY ("anuncioId") REFERENCES "public"."anuncios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoAnuncio" ADD CONSTRAINT "PedidoAnuncio_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "public"."pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoAnuncio" ADD CONSTRAINT "PedidoAnuncio_id_anuncio_fkey" FOREIGN KEY ("id_anuncio") REFERENCES "public"."anuncios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

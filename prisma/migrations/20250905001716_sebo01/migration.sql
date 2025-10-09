/*
  Warnings:

  - You are about to drop the `carros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `marcas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `propostas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."carros" DROP CONSTRAINT "carros_marcaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."propostas" DROP CONSTRAINT "propostas_carroId_fkey";

-- DropForeignKey
ALTER TABLE "public"."propostas" DROP CONSTRAINT "propostas_clienteId_fkey";

-- DropTable
DROP TABLE "public"."carros";

-- DropTable
DROP TABLE "public"."clientes";

-- DropTable
DROP TABLE "public"."marcas";

-- DropTable
DROP TABLE "public"."propostas";

-- DropEnum
DROP TYPE "public"."Combustiveis";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "endereco" TEXT,
    "tipo_usuario" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Autor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nacionalidade" TEXT,
    "biografia" TEXT,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Editora" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT,

    CONSTRAINT "Editora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" SERIAL NOT NULL,
    "nome_categoria" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "ano_publicacao" INTEGER NOT NULL,
    "numero_paginas" INTEGER,
    "edicao" TEXT,
    "condicao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_autor" INTEGER NOT NULL,
    "id_editora" INTEGER NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LivroCategoria" (
    "id_livro" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "LivroCategoria_pkey" PRIMARY KEY ("id_livro","id_categoria")
);

-- CreateTable
CREATE TABLE "public"."Anuncio" (
    "id" SERIAL NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "condicao_detalhada" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_livro" INTEGER NOT NULL,
    "id_vendedor" INTEGER NOT NULL,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Carrinho" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "id_comprador" INTEGER NOT NULL,
    "id_anuncio" INTEGER NOT NULL,

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pedido" (
    "id" SERIAL NOT NULL,
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "id_comprador" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PedidoItem" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_item" DOUBLE PRECISION NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_anuncio" INTEGER NOT NULL,

    CONSTRAINT "PedidoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_categoria_key" ON "public"."Categoria"("nome_categoria");

-- AddForeignKey
ALTER TABLE "public"."Livro" ADD CONSTRAINT "Livro_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "public"."Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Livro" ADD CONSTRAINT "Livro_id_editora_fkey" FOREIGN KEY ("id_editora") REFERENCES "public"."Editora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LivroCategoria" ADD CONSTRAINT "LivroCategoria_id_livro_fkey" FOREIGN KEY ("id_livro") REFERENCES "public"."Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LivroCategoria" ADD CONSTRAINT "LivroCategoria_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Anuncio" ADD CONSTRAINT "Anuncio_id_livro_fkey" FOREIGN KEY ("id_livro") REFERENCES "public"."Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Anuncio" ADD CONSTRAINT "Anuncio_id_vendedor_fkey" FOREIGN KEY ("id_vendedor") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Carrinho" ADD CONSTRAINT "Carrinho_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Carrinho" ADD CONSTRAINT "Carrinho_id_anuncio_fkey" FOREIGN KEY ("id_anuncio") REFERENCES "public"."Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pedido" ADD CONSTRAINT "Pedido_id_comprador_fkey" FOREIGN KEY ("id_comprador") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoItem" ADD CONSTRAINT "PedidoItem_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoItem" ADD CONSTRAINT "PedidoItem_id_anuncio_fkey" FOREIGN KEY ("id_anuncio") REFERENCES "public"."Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

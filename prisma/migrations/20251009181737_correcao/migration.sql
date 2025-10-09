/*
  Warnings:

  - You are about to drop the `Carrinho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Carrinho" DROP CONSTRAINT "Carrinho_id_anuncio_fkey";

-- DropForeignKey
ALTER TABLE "public"."Carrinho" DROP CONSTRAINT "Carrinho_id_usuario_fkey";

-- DropTable
DROP TABLE "public"."Carrinho";

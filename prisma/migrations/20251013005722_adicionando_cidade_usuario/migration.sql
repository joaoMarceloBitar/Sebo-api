/*
  Warnings:

  - Added the required column `cidade` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Made the column `endereco` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."usuarios" ADD COLUMN     "cidade" TEXT NOT NULL,
ALTER COLUMN "endereco" SET NOT NULL;

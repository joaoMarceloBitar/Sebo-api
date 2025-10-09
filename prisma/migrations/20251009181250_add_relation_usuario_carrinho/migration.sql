-- CreateTable
CREATE TABLE "public"."Carrinho" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "id_usuario" TEXT NOT NULL,
    "id_anuncio" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carrinho_id_usuario_id_anuncio_key" ON "public"."Carrinho"("id_usuario", "id_anuncio");

-- AddForeignKey
ALTER TABLE "public"."Carrinho" ADD CONSTRAINT "Carrinho_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Carrinho" ADD CONSTRAINT "Carrinho_id_anuncio_fkey" FOREIGN KEY ("id_anuncio") REFERENCES "public"."Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

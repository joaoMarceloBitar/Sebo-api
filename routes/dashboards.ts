// backend/src/routes/dashboard.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ✅ Endpoint: dados gerais
router.get("/gerais", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.count();
    const anuncios = await prisma.anuncio.count();
    const propostas = await prisma.proposta.count();

    res.status(200).json({ usuarios, anuncios, propostas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar dados gerais" });
  }
});

// ✅ Endpoint: livros com anúncios
router.get("/livrosComAnuncios", async (req, res) => {
  try {
    const livros = await prisma.livro.findMany({
      select: {
        id: true,
        titulo: true,
        _count: { select: { anuncios: true } },
      },
    });

    // Filtra apenas livros com anúncios e formata para frontend
    const livrosFormatados = livros
      .filter(livro => livro._count.anuncios > 0)
      .map(livro => ({
        id: livro.id,
        titulo: livro.titulo,
        numAnuncios: livro._count.anuncios,
      }));

    res.status(200).json(livrosFormatados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar livros com anúncios" });
  }
});

// ✅ Endpoint: clientes por cidade
router.get("/clientesCidade", async (req, res) => {
  try {
    const clientes = await prisma.usuario.groupBy({
      by: ["cidade"],
      _count: { cidade: true },
    });

    const clientesFormatados = clientes.map(cliente => ({
      cidade: cliente.cidade,
      num: cliente._count.cidade,
    }));

    res.status(200).json(clientesFormatados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar clientes por cidade" });
  }
});

export default router;

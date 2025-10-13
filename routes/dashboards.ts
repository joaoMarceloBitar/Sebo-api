import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.count()
    const anuncios = await prisma.anuncio.count()
    const propostas = await prisma.proposta.count()
    res.status(200).json({ usuarios, anuncios, propostas })
  } catch (error) {
    res.status(400).json(error)
  }
})

type LivroComAnuncios = {
  id: number;
  titulo: string;
  _count: {
    anuncios: number;
  };
};

router.get("/livrosComAnuncios", async (req, res) => {
  try {
    const livros = await prisma.livro.findMany({
      select: {
        id: true,
        titulo: true,
        _count: {
          select: { anuncios: true }
        }
      }
    });

    const livrosFiltrados = livros
      .filter((livro: LivroComAnuncios) => livro._count.anuncios > 0)
      .map((livro: LivroComAnuncios) => ({
        id: livro.id,
        titulo: livro.titulo,
        numAnuncios: livro._count.anuncios
      }));

    res.status(200).json(livrosFiltrados);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar livros com anúncios." });
  }
});

type ClienteGroupByCidade = {
  cidade: string
  _count: {
    cidade: number
  }
}

router.get("/clientesCidade", async (req, res) => {
  try {
    const clientes = await prisma.usuario.groupBy({
      by: ['cidade'],
      _count: {
        cidade: true,
      },
    })

    const clientes2 = clientes.map((cliente: ClienteGroupByCidade) => ({
      cidade: cliente.cidade,
      num: cliente._count.cidade
    }))

    res.status(200).json(clientes2)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
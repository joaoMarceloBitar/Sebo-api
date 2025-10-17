import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { verificaToken } from "../middelwares/verificaToken";

const prisma = new PrismaClient();
const router = Router();

const anuncioSchema = z.object({
  preco: z.number().positive("Preço deve ser positivo"),
  condicao_detalhada: z.string().min(3, "Condição detalhada obrigatória"),
  disponivel: z.boolean().optional(),
  id_livro: z.number().int()
});

router.get("/", async (req, res) => {
  try {
    const anuncios = await prisma.anuncio.findMany({
      include: { livro: true }
    });
    res.status(200).json(anuncios);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar anúncios." });
  }
});

router.get("/destaques", async (req, res) => {
  try {
    const livros = await prisma.anuncio.findMany({
      include: {
        livro: true,
      },
      where: {
        destaque: true
      }
    })
    res.status(200).json(livros)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const anuncio = await prisma.anuncio.findUnique({
      where: { id: Number(id) },
      include: { livro: true }
    });
    if (!anuncio) {
      res.status(404).json({ erro: "Anúncio não encontrado." });
      return;
    }
    res.status(200).json(anuncio);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar anúncio." });
  }
});



router.post("/", async (req, res) => {
  const valida = anuncioSchema.safeParse(req.body);
  if (!valida.success) {
    res.status(400).json({ erro: valida.error });
    return;
  }
  try {
    const anuncio = await prisma.anuncio.create({
      data: {
        ...valida.data,
        disponivel: valida.data.disponivel ?? true // valor padrão true
      }
    });
    res.status(201).json(anuncio);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar anúncio." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const valida = anuncioSchema.partial().safeParse(req.body);
  if (!valida.success) {
    res.status(400).json({ erro: valida.error });
    return;
  }
  try {
    const anuncio = await prisma.anuncio.update({
      where: { id: Number(id) },
      data: valida.data
    });
    res.status(200).json(anuncio);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar anúncio." });
  }
});

router.delete("/:id", verificaToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.proposta.deleteMany({
      where: { anuncioId: Number(id) }
    });

    // Agora deletar o anúncio
    const anuncioDeletado = await prisma.anuncio.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      mensagem: "Anúncio e propostas relacionadas deletadas com sucesso",
      anuncio: anuncioDeletado
    });
  } catch (error: any) {
    console.error("Erro ao deletar anúncio:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ erro: "Anúncio não encontrado" });
    }

    res.status(400).json({
      erro: "Erro ao deletar anúncio",
      detalhes: error.message
    });
  }
});


router.patch("/destacar/:id", verificaToken, async (req, res) => {
  const { id } = req.params

  try {
    const anuncioDestacar = await prisma.anuncio.findUnique({
      where: { id: Number(id) },
      select: { destaque: true }, 
    });

    const carro = await prisma.anuncio.update({
      where: { id: Number(id) },
      data: { destaque: !anuncioDestacar?.destaque }
    })
    res.status(200).json(anuncioSchema)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router;
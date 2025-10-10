import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const autorSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  nacionalidade: z.string().optional(),
  biografia: z.string().optional()
});

router.get("/", async (req, res) => {
  try {
    const autores = await prisma.autor.findMany();
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar autores." });
  }
});

router.post("/", async (req, res) => {
  const valida = autorSchema.safeParse(req.body);
  if (!valida.success) {
    res.status(400).json({ erro: valida.error });
    return;
  }
  try {
    const autor = await prisma.autor.create({ data: valida.data });
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar autor." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const autor = await prisma.autor.findUnique({ where: { id: Number(id) } });
    if (!autor) {
      res.status(404).json({ erro: "Autor não encontrado." });
      return;
    }
    res.status(200).json(autor);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar autor." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const valida = autorSchema.partial().safeParse(req.body);
  if (!valida.success) {
    res.status(400).json({ erro: valida.error });
    return;
  }
  try {
    const autor = await prisma.autor.update({
      where: { id: Number(id) },
      data: valida.data
    });
    res.status(200).json(autor);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar autor." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.autor.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ erro: "Erro ao deletar autor." });
  }
});

export default router;
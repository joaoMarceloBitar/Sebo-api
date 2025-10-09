import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const propostaSchema = z.object({
  usuarioId: z.string(),
  anuncioId: z.number(),
  descricao: z.string().min(10,
    { message: "Descrição da Proposta deve possuir, no mínimo, 10 caracteres" }),
})
 
router.get("/", async (req, res) => {
  try {
    const propostas = await prisma.proposta.findMany({
     include: {
      usuario: true,
      anuncio: { include: { livro: true } } 
    },
      orderBy: { id: 'desc'}
    })
    res.status(200).json(propostas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {

  const valida = propostaSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }  
  const { usuarioId, anuncioId, descricao } = valida.data

  try {
    const proposta = await prisma.proposta.create({
      data: { usuarioId, anuncioId, descricao }

    })
    res.status(201).json(proposta)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params
  try {
    const propostas = await prisma.proposta.findMany({
      where: { usuarioId },
      include: { anuncio: { include: { livro: true } } }
    })
    res.status(200).json(propostas)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
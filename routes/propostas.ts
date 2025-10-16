import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { z } from 'zod'
import nodemailer from 'nodemailer'


const prisma = new PrismaClient()
const router = Router()

const propostaSchema = z.object({
  usuarioId: z.string(),
  anuncioId: z.number(),
  descricao: z.string().min(10,
    { message: "Descrição da Proposta deve possuir, no mínimo, 10 caracteres" }),
})
 

async function enviaEmail(nome: string, email: string,
  descricao: string, resposta: string) {

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_SENHA
  }
});

  const info = await transporter.sendMail({
    from: 'joaomarcelodu@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Re: Proposta Sebo dos Guris", // Subject line
    text: resposta, // plain text body
    html: `<h3>Estimado Cliente: ${nome}</h3>
           <h3>Proposta: ${descricao}</h3>
           <h3>Resposta do Sebo: ${resposta}</h3>
           <p>Muito obrigado pelo seu contato</p>
           <p>Sebo dos Guris</p>`
  });

  console.log("Message sent: %s", info.messageId);
}

router.get("/", async (req, res) => {
  const anuncioId = req.query.anuncioId ? Number(req.query.anuncioId) : undefined

  try {
    const propostas = await prisma.proposta.findMany({
      where: anuncioId ? { anuncioId } : {},
      include: {
        usuario: true,
        anuncio: { include: { livro: true } }
      },
      orderBy: { id: 'desc' }
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

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { resposta } = req.body

  if (!resposta) {
    res.status(400).json({ "erro": "Informe a resposta desta proposta" })
    return
  }

  try {
    const proposta = await prisma.proposta.update({
      where: { id: Number(id) },
      data: { resposta }
    })

    const dados = await prisma.proposta.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: true
      }
    })

    enviaEmail(dados?.usuario.nome as string,
      dados?.usuario.email as string,
      dados?.descricao as string,
      resposta)

    res.status(200).json(proposta)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const anuncioSchema = zod_1.z.object({
    preco: zod_1.z.number().positive("Preço deve ser positivo"),
    condicao_detalhada: zod_1.z.string().min(3, "Condição detalhada obrigatória"),
    disponivel: zod_1.z.boolean().optional(),
    id_livro: zod_1.z.number().int()
});
// Listar todos os anúncios
router.get("/", async (req, res) => {
    try {
        const anuncios = await prisma.anuncio.findMany({
            include: { livro: true }
        });
        res.status(200).json(anuncios);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao listar anúncios." });
    }
});
// Buscar anúncio por ID
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
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao buscar anúncio." });
    }
});
// Criar anúncio
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
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao criar anúncio." });
    }
});
// Atualizar anúncio
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
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar anúncio." });
    }
});
// Deletar anúncio
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.anuncio.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao deletar anúncio." });
    }
});
exports.default = router;

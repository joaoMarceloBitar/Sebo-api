"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const autorSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2, "Nome obrigatório"),
    nacionalidade: zod_1.z.string().optional(),
    biografia: zod_1.z.string().optional()
});
// Listar autores
router.get("/", async (req, res) => {
    try {
        const autores = await prisma.autor.findMany();
        res.status(200).json(autores);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao listar autores." });
    }
});
// Criar autor
router.post("/", async (req, res) => {
    const valida = autorSchema.safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const autor = await prisma.autor.create({ data: valida.data });
        res.status(201).json(autor);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao criar autor." });
    }
});
// Buscar autor por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const autor = await prisma.autor.findUnique({ where: { id: Number(id) } });
        if (!autor) {
            res.status(404).json({ erro: "Autor não encontrado." });
            return;
        }
        res.status(200).json(autor);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao buscar autor." });
    }
});
// Atualizar autor
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
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar autor." });
    }
});
// Deletar autor
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.autor.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao deletar autor." });
    }
});
exports.default = router;

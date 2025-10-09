"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const editoraSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2, "Nome da editora obrigatório"),
    cidade: zod_1.z.string().optional()
});
// Listar editoras
router.get("/", async (req, res) => {
    try {
        const editoras = await prisma.editora.findMany();
        res.status(200).json(editoras);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao listar editoras." });
    }
});
// Criar editora
router.post("/", async (req, res) => {
    const valida = editoraSchema.safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const editora = await prisma.editora.create({ data: valida.data });
        res.status(201).json(editora);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao criar editora." });
    }
});
// Buscar editora por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const editora = await prisma.editora.findUnique({ where: { id: Number(id) } });
        if (!editora) {
            res.status(404).json({ erro: "Editora não encontrada." });
            return;
        }
        res.status(200).json(editora);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao buscar editora." });
    }
});
// Atualizar editora
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const valida = editoraSchema.partial().safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const editora = await prisma.editora.update({
            where: { id: Number(id) },
            data: valida.data
        });
        res.status(200).json(editora);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar editora." });
    }
});
// Deletar editora
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.editora.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao deletar editora." });
    }
});
exports.default = router;

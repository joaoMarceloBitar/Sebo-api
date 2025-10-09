"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const categoriaSchema = zod_1.z.object({
    nome_categoria: zod_1.z.string().min(2, "Nome da categoria obrigatório")
});
// Listar categorias
router.get("/", async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.status(200).json(categorias);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao listar categorias." });
    }
});
// Criar categoria
router.post("/", async (req, res) => {
    const valida = categoriaSchema.safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const categoria = await prisma.categoria.create({ data: valida.data });
        res.status(201).json(categoria);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao criar categoria." });
    }
});
// Buscar categoria por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await prisma.categoria.findUnique({ where: { id: Number(id) } });
        if (!categoria) {
            res.status(404).json({ erro: "Categoria não encontrada." });
            return;
        }
        res.status(200).json(categoria);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao buscar categoria." });
    }
});
// Atualizar categoria
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const valida = categoriaSchema.partial().safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const categoria = await prisma.categoria.update({
            where: { id: Number(id) },
            data: valida.data
        });
        res.status(200).json(categoria);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar categoria." });
    }
});
// Deletar categoria
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.categoria.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao deletar categoria." });
    }
});
exports.default = router;

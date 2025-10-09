"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const livroSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(2, "Título obrigatório"),
    subtitulo: zod_1.z.string().optional(),
    imagem_url: zod_1.z.string().url("URL da imagem inválida").optional(),
    ano_publicacao: zod_1.z.number().int().min(1000, "Ano inválido"),
    numero_paginas: zod_1.z.number().int().positive().optional(),
    edicao: zod_1.z.string().optional(),
    condicao: zod_1.z.string().min(3, "Condição obrigatória"),
    descricao: zod_1.z.string().min(10, "Descrição obrigatória"),
    id_autor: zod_1.z.number().int(),
    id_editora: zod_1.z.number().int()
});
router.get("/", async (req, res) => {
    try {
        const livros = await prisma.livro.findMany({
            include: { autor: true, editora: true, categorias: true, anuncios: true }
        });
        res.status(200).json(livros);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao listar livros." });
    }
});
// Buscar livro por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
            include: { autor: true, editora: true, categorias: true, anuncios: true }
        });
        if (!livro) {
            res.status(404).json({ erro: "Livro não encontrado." });
            return;
        }
        res.status(200).json(livro);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao buscar livro." });
    }
});
// Criar livro
router.post("/", async (req, res) => {
    const valida = livroSchema.safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const livro = await prisma.livro.create({
            data: valida.data
        });
        res.status(201).json(livro);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao criar livro." });
    }
});
// Atualizar livro
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const valida = livroSchema.partial().safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const livro = await prisma.livro.update({
            where: { id: Number(id) },
            data: valida.data
        });
        res.status(200).json(livro);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar livro." });
    }
});
// Deletar livro
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.livro.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao deletar livro." });
    }
});
// PATCH para atualizar imagem_url de vários livros
router.patch("/imagens", async (req, res) => {
    const schema = zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number().int(),
        imagem_url: zod_1.z.string().url("URL da imagem inválida")
    }));
    const valida = schema.safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    try {
        const updates = await Promise.all(valida.data.map(item => prisma.livro.update({
            where: { id: item.id },
            data: { imagem_url: item.imagem_url }
        })));
        res.status(200).json(updates);
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar imagens dos livros." });
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { email, senha } = req.body;
    // em termos de segurança, o recomendado é exibir uma mensagem padrão
    // a fim de evitar de dar "dicas" sobre o processo de login para hackers
    const mensaPadrao = "Login ou senha incorretos";
    if (!email || !senha) {
        // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
        res.status(400).json({ erro: mensaPadrao });
        return;
    }
    try {
        const usuario = await prisma.usuario.findFirst({
            where: { email }
        });
        if (usuario == null) {
            // res.status(400).json({ erro: "E-mail inválido" })
            res.status(400).json({ erro: mensaPadrao });
            return;
        }
        // se o e-mail existe, faz-se a comparação dos hashs
        if (bcrypt_1.default.compareSync(senha, usuario.senha)) {
            // se confere, gera e retorna o token
            const token = jsonwebtoken_1.default.sign({
                usuarioLogadoId: usuario.id,
                usuarioLogadoNome: usuario.nome,
                usuarioLogadoNivel: usuario.tipo_usuario === "ADMIN" ? 1 : 0
            }, process.env.JWT_KEY, { expiresIn: "1h" });
            res.status(200).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                token
            });
        }
        else {
            res.status(400).json({ erro: mensaPadrao });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;

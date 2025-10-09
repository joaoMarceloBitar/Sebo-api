"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const usuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(10, {
        message: "Nome do cliente deve possuir, no mínimo, 10 caracteres"
    }),
    email: zod_1.z.string().email({ message: "Informe um e-mail válido" }),
    senha: zod_1.z.string(),
    endereco: zod_1.z.string().optional(),
    tipo_usuario: zod_1.z.enum(["CLIENTE", "ADMIN"])
});
router.get("/", async (req, res) => {
    try {
        const clientes = await prisma.usuario.findMany();
        res.status(200).json(clientes);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
function validaSenha(senha) {
    const mensa = [];
    // .length: retorna o tamanho da string (da senha)
    if (senha.length < 8) {
        mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres");
    }
    // contadores
    let pequenas = 0;
    let grandes = 0;
    let numeros = 0;
    let simbolos = 0;
    // senha = "abc123"
    // letra = "a"
    // percorre as letras da variável senha
    for (const letra of senha) {
        // expressão regular
        if ((/[a-z]/).test(letra)) {
            pequenas++;
        }
        else if ((/[A-Z]/).test(letra)) {
            grandes++;
        }
        else if ((/[0-9]/).test(letra)) {
            numeros++;
        }
        else {
            simbolos++;
        }
    }
    if (pequenas == 0) {
        mensa.push("Erro... senha deve possuir letra(s) minúscula(s)");
    }
    if (grandes == 0) {
        mensa.push("Erro... senha deve possuir letra(s) maiúscula(s)");
    }
    if (numeros == 0) {
        mensa.push("Erro... senha deve possuir número(s)");
    }
    if (simbolos == 0) {
        mensa.push("Erro... senha deve possuir símbolo(s)");
    }
    return mensa;
}
router.post("/", async (req, res) => {
    const valida = usuarioSchema.safeParse(req.body);
    if (!valida.success) {
        res.status(400).json({ erro: valida.error });
        return;
    }
    const erros = validaSenha(valida.data.senha);
    if (erros.length > 0) {
        res.status(400).json({ erro: erros.join("; ") });
        return;
    }
    const salt = bcrypt_1.default.genSaltSync(12);
    const hash = bcrypt_1.default.hashSync(valida.data.senha, salt);
    const { nome, email, endereco, tipo_usuario } = valida.data;
    try {
        const usuario = await prisma.usuario.create({
            data: { nome, email, senha: hash, endereco, tipo_usuario }
        });
        // Não retorne a senha!
        res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, tipo_usuario: usuario.tipo_usuario });
    }
    catch (error) {
        res.status(400).json({ erro: "Erro ao cadastrar usuário." });
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await prisma.usuario.findUnique({
            where: { id }
        });
        res.status(200).json(cliente);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;

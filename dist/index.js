"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const livros_1 = __importDefault(require("./routes/livros"));
const autores_1 = __importDefault(require("./routes/autores"));
const categorias_1 = __importDefault(require("./routes/categorias"));
const editoras_1 = __importDefault(require("./routes/editoras"));
const anuncios_1 = __importDefault(require("./routes/anuncios"));
const propostas_1 = __importDefault(require("./routes/propostas"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/login", login_1.default);
app.use("/api/usuarios", usuarios_1.default);
app.use("/api/livros", livros_1.default);
app.use("/api/autores", autores_1.default);
app.use("/api/categorias", categorias_1.default);
app.use("/api/editoras", editoras_1.default);
app.use("/api/anuncios", anuncios_1.default);
app.use("/api/propostas", propostas_1.default);
app.get('/', (req, res) => {
    res.json({
        message: 'API: Sebo Online - Sistema de Revenda de Livros',
        version: '1.0.0',
        endpoints: {
            login: '/api/login',
            usuarios: '/api/usuarios',
            autores: '/api/autores',
            editoras: '/api/editoras',
            categorias: '/api/categorias',
            livros: '/api/livros',
            livroCategoria: '/api/livro-categoria',
            anuncios: '/api/anuncios',
            pedidos: '/api/pedidos',
            propostas: '/api/propostas'
        }
    });
});
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta: ${port}`);
    console.log(`📚 API: Sebo Online - Sistema de Revenda de Livros`);
    console.log(`🌐 Acesse: http://localhost:${port}`);
});

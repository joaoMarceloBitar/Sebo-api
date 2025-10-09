# API Revenda de Veículos / Sebo de Livros

## 📋 Descrição do Projeto

Este projeto é uma API REST desenvolvida em TypeScript que inicialmente foi criada para uma **revenda de veículos**, mas passou por uma transformação significativa e agora está configurada para funcionar como um **sebo de livros** (sistema de compra e venda de livros usados).

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Express.js** - Framework web para Node.js
- **Prisma** - ORM (Object-Relational Mapping) para banco de dados
- **PostgreSQL** - Banco de dados relacional

### Bibliotecas e Dependências
- **bcrypt** - Criptografia de senhas
- **jsonwebtoken (JWT)** - Autenticação baseada em tokens
- **cors** - Middleware para Cross-Origin Resource Sharing
- **zod** - Validação de schemas e dados
- **ts-node-dev** - Desenvolvimento com hot-reload

### Ferramentas de Desenvolvimento
- **Prisma Client** - Cliente para interação com o banco
- **@types/express** - Tipagens TypeScript para Express
- **@types/node** - Tipagens TypeScript para Node.js
- **@types/bcrypt** - Tipagens TypeScript para bcrypt
- **@types/cors** - Tipagens TypeScript para CORS
- **@types/jsonwebtoken** - Tipagens TypeScript para JWT

## 🏗️ Estrutura do Projeto

```
emergentes_252_api-main/
├── index.ts                 # Arquivo principal da aplicação
├── package.json            # Dependências e scripts
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   └── migrations/         # Histórico de migrações
└── routes/
    ├── carros.ts          # Rotas para veículos (legado)
    ├── login.ts           # Autenticação de usuários
    ├── pedidos.ts         # Gestão de pedidos
    └── usuarios.ts        # Gestão de usuários
```

## 🗄️ Estrutura do Banco de Dados

### Modelos Principais (Sebo de Livros)

1. **Usuario** - Usuários do sistema (compradores e vendedores)
2. **Autor** - Autores dos livros
3. **Editora** - Editoras dos livros
4. **Categoria** - Categorias/gêneros literários
5. **Livro** - Catálogo de livros
6. **LivroCategoria** - Relacionamento N:M entre livros e categorias
7. **Anuncio** - Anúncios de venda de livros
8. **Carrinho** - Carrinho de compras
9. **Pedido** - Pedidos realizados
10. **PedidoItem** - Itens dos pedidos

## 🔧 Scripts Disponíveis

```bash
# Executar em modo de desenvolvimento
npm run dev
```

## 🌐 Endpoints da API

### Autenticação
- `POST /clientes/login` - Login de usuários

### Usuários
- `GET /usuarios` - Listar todos os usuários
- `POST /usuarios` - Criar novo usuário
- `GET /usuarios/:id` - Buscar usuário por ID

### Pedidos
- `GET /pedidos` - Listar todos os pedidos
- `POST /pedidos` - Criar novo pedido
- `GET /pedidos/usuario/:id_comprador` - Pedidos por usuário

### Veículos (Legado - não funcional)
- `GET /carros` - Listar carros
- `GET /carros/:id` - Buscar carro por ID
- `POST /carros` - Criar novo carro
- `PUT /carros/:id` - Atualizar carro
- `DELETE /carros/:id` - Deletar carro
- `GET /carros/pesquisa/:termo` - Pesquisar carros

## ⚠️ Problemas Identificados no Banco de Dados

### 1. **Inconsistência de Modelos**
- O schema atual define um sistema de **sebo de livros**, mas as rotas ainda referenciam **veículos**
- Existe uma desconexão entre o schema do banco e a implementação das rotas

### 2. **Tabelas Ausentes no Schema**
- **marcas** - Referenciada nas rotas de carros, mas não existe no schema atual
- **carros** - Referenciada nas rotas, mas foi removida do schema
- **clientes** - Usada no login, mas não existe no schema atual
- **propostas** - Criada em migração, mas removida posteriormente

### 3. **Problemas de Relacionamentos**
- As rotas de carros fazem referência a `marcaId` e `marca`, mas essas tabelas não existem
- O sistema de login busca por `cliente`, mas o schema só tem `Usuario`
- Falta consistência entre os tipos de usuário (cliente vs usuario)

### 4. **Migrações Conflitantes**
- A migração `sebo01` removeu todas as tabelas relacionadas a veículos
- As rotas de carros não funcionarão pois as tabelas não existem
- O sistema de login não funcionará corretamente

### 5. **Campos Ausentes**
- Falta campo `email` único na tabela `Usuario` (existe no schema mas pode ter problemas de migração)
- Falta validação de tipos de usuário
- Ausência de timestamps em algumas tabelas

## 🔧 Correções Necessárias

### Urgente
2. **Ajustar rotas**: Alinhar as rotas com o schema do banco
3. **Corrigir login**: Ajustar para usar tabela `Usuario` em vez de `cliente`
4. **Criar tabelas ausentes**: Se mantiver veículos, recriar tabelas `marcas` e `carros`

### Recomendado
1. **Adicionar validações**: Implementar validações mais robustas
2. **Melhorar segurança**: Adicionar middleware de autenticação
3. **Documentação**: Criar documentação da API com Swagger
4. **Testes**: Implementar testes unitários e de integração
5. **Logs**: Adicionar sistema de logging

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar banco de dados**:
   - Criar arquivo `.env` com `DATABASE_URL`
   - Executar migrações: `npx prisma migrate dev`

3. **Executar aplicação**:
   ```bash
   npm run dev
   ```

## 📝 Notas Importantes

- O projeto está em um estado de transição entre dois domínios diferentes
- É necessário definir claramente qual será o escopo final do sistema
- As rotas de carros não funcionarão até que as tabelas sejam recriadas
- O sistema de autenticação precisa ser ajustado para funcionar corretamente

## 👥 Contribuição

Para contribuir com o projeto, certifique-se de:
1. Resolver as inconsistências identificadas
2. Manter a consistência entre schema e rotas
3. Adicionar testes para novas funcionalidades
4. Documentar mudanças significativas

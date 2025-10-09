import express from 'express'
import cors from 'cors'
import routesLogin from './routes/login'
import routesUsuarios from './routes/usuarios'
import routesLivros from './routes/livros'
import routesAutores from './routes/autores'
import routesCategorias from './routes/categorias'
import routesEditoras from './routes/editoras'
import routesAnuncios from './routes/anuncios'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/api/login", routesLogin)
app.use("/api/usuarios", routesUsuarios)
app.use("/api/livros", routesLivros)
app.use("/api/autores", routesAutores)
app.use("/api/categorias", routesCategorias)
app.use("/api/editoras", routesEditoras)
app.use("/api/anuncios", routesAnuncios)

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
  })
})

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta: ${port}`)
  console.log(`📚 API: Sebo Online - Sistema de Revenda de Livros`)
  console.log(`🌐 Acesse: http://localhost:${port}`)
})
import express from 'express'
import cors from 'cors'
import routesLogin from './routes/login'
import routesUsuarios from './routes/usuarios'
import routesLivros from './routes/livros'
import routesAutores from './routes/autores'
import routesCategorias from './routes/categorias'
import routesEditoras from './routes/editoras'
import routesAnuncios from './routes/anuncios'
import routesPropostas from './routes/propostas'
import routesDashboard from './routes/dashboards'
import routesAdminLogin from './routes/adminLogin'
import routesAdmins from './routes/admins'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/login", routesLogin)
app.use("/usuarios", routesUsuarios)
app.use("/livros", routesLivros)
app.use("/autores", routesAutores)
app.use("/categorias", routesCategorias)
app.use("/editoras", routesEditoras)
app.use("/anuncios", routesAnuncios)
app.use("/propostas", routesPropostas)
app.use("/dashboards", routesDashboard)
app.use("/adminLogin", routesAdminLogin)
app.use("/admins", routesAdmins)

app.get('/', (req, res) => {
  res.json({
    message: 'API: Sebo Online - Sistema de Revenda de Livros',
    version: '1.0.0',
    endpoints: {
      login: '/login',
      usuarios: '/usuarios',
      autores: '/autores',
      editoras: '/editoras',
      categorias: '/categorias',
      livros: '/livros',
      livroCategoria: '/livro-categoria',
      anuncios: '/anuncios',
      propostas: '/propostas',
      dashboards: '/dashboards',
      adminLogin: '/adminLogin',
      admins: '/admins'
    }
  })
})

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta: ${port}`)
  console.log(`📚 API: Sebo Online - Sistema de Revenda de Livros`)
  console.log(`🌐 Acesse: http://localhost:${port}`)
})
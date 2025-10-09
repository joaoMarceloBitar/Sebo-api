import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'

type TokenType = {
  usuarioLogadoId: string
  usuarioLogadoNome: string
  usuarioLogadoNivel: number
}

export function verificaToken(req: Request | any, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({ error: "Token não informado" })
    return
  }

  const token = authorization.split(" ")[1]

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY as string)
    // console.log(decode)
    const { usuarioLogadoId, usuarioLogadoNome, usuarioLogadoNivel } = decode as TokenType

    req.usuarioLogadoId    = usuarioLogadoId
    req.usuarioLogadoNome  = usuarioLogadoNome
    req.usuarioLogadoNivel = usuarioLogadoNivel

    next()
  } catch (error) {
    res.status(401).json({ error: "Token inválido" })
  }
}
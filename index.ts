import * as express from 'express'
import {Request, Response, Application} from 'express'
import * as http from 'http'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import {Server, Socket} from 'socket.io'
import 'dotenv/config'

const app: Application = express()
const server = http.createServer(app)
const PORT = 80
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_URL,
        methods: ['GET', 'POST']
    }
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello RunnersHigh!')
})

server.listen(PORT, () => {
    console.log(`이 서버는 ${PORT}번 PORT에서 실행중입니다`)
})
 
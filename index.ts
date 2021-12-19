import * as express from 'express'
import {Request, Response, Application} from 'express'
import * as http from 'http'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import {Server, Socket} from 'socket.io'
import userRoute from './route/user'
import * as dotenv from 'dotenv'
dotenv.config()

const app: Application = express()
const server = http.createServer(app)
const PORT: number = 80
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_URL,
        methods: ['GET', 'POST']
    }
})

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_URL!,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}))

app.use('/users', userRoute)
// app.use('/users', postRoute)
// app.use('/users', chatRoute)

io.on('connection', (socket) => {
  console.log('연결성공')

  socket.on('message', (info) => {
    console.log(info)
    io.to(`${info.roomId}`).emit('message', info)
  })
  socket.on('joinRoom', ({ roomId: id, nickname }) => {
    socket.join(`${id}`)
    io.to(`${id}`).emit('joinRoom', `${nickname}님이 ${id}번방으로 입장했습니다`)
  })
    
  socket.on('disconnect', () => {
    console.log('연결해제')
  })
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello RunnersHigh!')
})

server.listen(PORT, () => {
    console.log(`이 서버는 ${PORT}번 PORT에서 실행중입니다`)
})
 
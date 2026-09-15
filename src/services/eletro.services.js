import express from 'express'
import { eletroRouter } from './routes/eletro.routes.js'

const app = express()
const port = 3000

app.use(express.json())

app.use("/eletronicos", eletroRouter)

app.listen(port, () => {
    console.log(`App rodando em http://localhost:3000`);
})
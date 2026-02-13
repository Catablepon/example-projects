import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import connectMongoDB from './db/mongodb.js'
import albumRouter from './routes/albums.js'
import queryRouter from './routes/queries.js'
import errorHandler from './middlewares/errorhandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
// const { PORT = 5001, MONGO_URI } 
const { MONGO_URI, PORT } = process.env

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/albums', albumRouter)
app.use('/query', queryRouter)

app.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})

app.use(errorHandler)

const startServer = async () => {
  try {
    await connectMongoDB(MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
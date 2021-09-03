import express, { Request, Response } from 'express'

const app = express()
const port: number = 3000

app.listen(port, () => {
  console.log(`The api is running on ${port}`)
})

app.get('/health', (request: Request, response: Response) => {
  console.log('health')

  response.json({
    message: 'health'
  }).end()
})

import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/maxmilhas/api', router)

  readdirSync(path.join(__dirname, '/../routes'))
    .filter((file: string) => !file.includes('.test.'))
    .map(async (file: string) => (await import(`../routes/${file}`)).default(router))
}

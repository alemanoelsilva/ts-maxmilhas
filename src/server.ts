import { MongoHelper } from './infrastructure/database/helpers/mongo-helper'
import env from './main/config/envs'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./main/config/app')).default
    return app.listen(env.port)
  })
  .then(() => console.log(`Api running on port ${env.port}`))
  .catch(console.error)

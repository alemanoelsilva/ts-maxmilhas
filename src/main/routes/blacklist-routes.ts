import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddBlacklistFactory } from '../factories/add-blacklist-factory'

export default (router: Router): void => {
  router.post('/blacklist', adaptRoute(makeAddBlacklistFactory()))
}

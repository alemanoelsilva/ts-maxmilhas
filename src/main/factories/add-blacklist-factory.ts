import { IController } from '../../presentation/protocols/controller'
import { AddBlacklistController } from '../../presentation/controllers/blacklist/add-blacklist-controller'
import { DocumentNumberValidation } from '../../utils/validators/adapters/document-number-validation'
import { AddBlacklistBusiness } from '../../application/business/add-blacklist-business'
import { BlacklistMongodbRepository } from '../../infrastructure/database/mongodb/blacklist-mongodb-repository'

export const makeAddBlacklistFactory = (): IController => {
  const documentNumberValidator = new DocumentNumberValidation()

  const blacklistMongoRepository = new BlacklistMongodbRepository()
  const addBlacklistBusiness = new AddBlacklistBusiness(blacklistMongoRepository, blacklistMongoRepository)

  const addBlacklistController = new AddBlacklistController(documentNumberValidator, addBlacklistBusiness)

  return addBlacklistController
}

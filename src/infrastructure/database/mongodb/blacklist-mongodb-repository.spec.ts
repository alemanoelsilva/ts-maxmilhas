import { BlacklistMongodbRepository } from './blacklist-mongodb-repository'
import { IBlacklistModel } from '../../../domain/models/blacklist'
import { Collection } from 'mongodb'

interface IMongoHelper {
  getCollection: (name: string) => Promise<Collection>
}

interface ITypes {
  sut: BlacklistMongodbRepository
  mongoHelperStub: IMongoHelper
}

const mongoInsertStub = async (): Promise<any> => {
  console.log('mongoInsertStub')
  return new Promise(resolve => resolve(true))
}

const makeMongoHelperStub = (): IMongoHelper => {
  class MongoHelper implements IMongoHelper {
    async getCollection(): Promise<any> {
      return new Promise(resolve => resolve({
        insert: mongoInsertStub
      }))
    }
  }
  return new MongoHelper()
}

const makeSut = (): ITypes => {
  const mongoHelperStub = makeMongoHelperStub()

  const sut = new BlacklistMongodbRepository(mongoHelperStub)

  return {
    sut,
    mongoHelperStub
  }
}

describe('Infrastructure - Blacklist Mongo Repository', () => {
  describe('Add Blacklist', () => {
    it('should return true when BlacklistMongodbRepository add method succeeds', async () => {
      const { sut } = makeSut()

      const fakeBlacklist: IBlacklistModel = {
        documentNumber: '999.999.999-99',
        version: '1'
      }

      const response = await sut.add(fakeBlacklist)

      expect(response).toBeTruthy()
    })
  })
})

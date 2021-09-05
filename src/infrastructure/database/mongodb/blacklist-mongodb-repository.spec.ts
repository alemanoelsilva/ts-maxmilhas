import { BlacklistMongodbRepository } from './blacklist-mongodb-repository'
import { IBlacklistModel } from '../../../domain/models/blacklist'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

interface ITypes {
  sut: BlacklistMongodbRepository
}

const makeSut = (): ITypes => {
  const sut = new BlacklistMongodbRepository()

  return {
    sut
  }
}

let collection: Collection

describe('Infrastructure - Blacklist Mongo Repository', () => {
  beforeAll(async () => MongoHelper.connect('mongodb://localhost:27017/ts-maxmilhas'))

  afterAll(async () => MongoHelper.disconnect())

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('blacklist')
    await collection.deleteMany({})
  })

  describe('Add Blacklist', () => {
    it('should return true when BlacklistMongodbRepository add method succeeds', async () => {
      const { sut } = makeSut()

      const fakeBlacklist: IBlacklistModel = {
        documentNumber: '999.999.999-99',
        version: '1'
      }

      const response: boolean = await sut.add(fakeBlacklist)

      expect(response).toBeTruthy()
    })
  })

  describe('Get Next Blacklist Version', () => {
    beforeEach(async () => {
      const blacklistMock: IBlacklistModel = {
        documentNumber: '999.999.999-99',
        version: '1'
      }
      await collection.insertOne(blacklistMock)
    })

    it('should return 2 as the next version of blacklist', async () => {
      const { sut } = makeSut()

      const fakeDocumentNumber = '999.999.999-99'

      const response: string = await sut.getNextVersion(fakeDocumentNumber)

      expect(response).toEqual('2')
    })
  })
})

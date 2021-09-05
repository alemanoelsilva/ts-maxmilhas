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

      const response = await sut.add(fakeBlacklist)

      expect(response).toBeTruthy()
    })
  })
})

import { MongoHelper as sut } from './mongo-helper'

describe('Infrastructure - Mongo Helper', () => {
  beforeAll(async () => sut.connect('mongodb://localhost:27017/ts-maxmilhas'))

  afterAll(async () => sut.disconnect())

  test('should reconnect if mongodb is down', async () => {
    let blacklistCollection = await sut.getCollection('blacklist')
    expect(blacklistCollection).toBeTruthy()
    await sut.disconnect()
    blacklistCollection = await sut.getCollection('blacklist')
    expect(blacklistCollection).toBeTruthy()
  })
})

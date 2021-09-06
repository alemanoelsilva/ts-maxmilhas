import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infrastructure/database/helpers/mongo-helper'

let collection: Collection

describe('Blacklist Routes', () => {
  beforeAll(async () => MongoHelper.connect(process.env.MONGO_URL || ''))

  afterAll(async () => MongoHelper.disconnect())

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('blacklist')
    await collection.deleteMany({})
  })

  describe('POST /blacklist', () => {
    test('should return 201 on blacklist creation', async () => {
      await request(app)
        .post('/maxmilhas/api/blacklist')
        .send({ documentNumber: '157.764.988-56' })
        .expect(201)
    })
  })
})

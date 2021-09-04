import { AddBlacklist } from './add-blacklist'
import { IHttpRequest } from '../protocols/http'

describe('Controller - Add Blacklist', () => {
  describe('Successful blacklist creation', () => {
    it('should return status code 201 when AddBlacklist succeeds', async() => {
      const addBlacklist = new AddBlacklist()

      const request: IHttpRequest = {
        body: {
          documentNumber: '999.999.999-99'
        }
      }

      const response = await addBlacklist.handler(request)

      expect(response).toEqual({
        body: {
          message: 'Document was created with success'
        },
        statusCode: 201
      })
    })
  })

  describe('Failure blacklist creation', () => {
    it('should return status code 400 when document number is not provided', async() => {
      const addBlacklist = new AddBlacklist()

      const request: IHttpRequest = {
        body: {}
      }

      const response = await addBlacklist.handler(request)

      expect(response).toEqual({
        body: {
          message: 'Document was not provided'
        },
        statusCode: 400
      })
    })
  })
})

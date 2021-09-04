import { AddBlacklist } from './add-blacklist'
import { HttpRequest, HttpResponse } from '../protocols/http'

describe('Controller - Add Blacklist', () => {
  describe('Successful blacklist creation', () => {
    it('should return status code 201 when AddBlacklist succeeds', () => {
      const addBlacklist = new AddBlacklist()

      const request: HttpRequest = {
        body: {
          documentNumber: '999.999.999-99'
        }
      }

      const response: HttpResponse = addBlacklist.handler(request)

      expect(response).toEqual({
        body: {
          message: 'Document was created with success'
        },
        statusCode: 201
      })
    })
  })

  describe('Failure blacklist creation', () => {
    it('should return status code 400 when document number is not provided', () => {
      const addBlacklist = new AddBlacklist()

      const request: HttpRequest = {
        body: {}
      }

      const response: HttpResponse = addBlacklist.handler(request)

      expect(response).toEqual({
        body: {
          message: 'Document was not provided'
        },
        statusCode: 400
      })
    })
  })
})

import { AddBlacklist } from './add-blacklist'

describe('Controller - Add Blacklist', () => {
  describe('Successful blacklist creation', () => {
    it('should return status code 201 when AddBlacklist succeeds', () => {
      const addBlacklist = new AddBlacklist()

      const request = {
        body: {
          documentNumber: '999.999.999-99'
        }
      }

      const response = addBlacklist.handler(request)

      expect(response).toEqual({
        message: 'Document was created with success',
        statusCode: 201
      })
    })
  })

  describe('Failure blacklist creation', () => {
    it('should return status code 400 when document number is not provided', () => {
      const addBlacklist = new AddBlacklist()

      const request = {
        body: {}
      }

      const response = addBlacklist.handler(request)

      expect(response).toEqual({
        message: 'Document was not provided',
        statusCode: 400
      })
    })
  })
})

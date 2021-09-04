import { AddBlacklist } from './add-blacklist'
import { IHttpRequest } from '../protocols/http'

interface ITypes {
  sut: AddBlacklist
}

const makeSut = (): ITypes => {
  const sut = new AddBlacklist()

  return {
    sut
  }
}

describe('Controller - Add Blacklist', () => {
  describe('Successful blacklist creation', () => {
    it('should return status code 201 when AddBlacklist succeeds', async() => {
      const { sut } = makeSut()

      const request: IHttpRequest = {
        body: {
          documentNumber: '999.999.999-99'
        }
      }

      const response = await sut.handler(request)

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
      const { sut } = makeSut()

      const request: IHttpRequest = {
        body: {}
      }

      const response = await sut.handler(request)

      expect(response).toEqual({
        body: {
          message: 'Document was not provided'
        },
        statusCode: 400
      })
    })
  })
})

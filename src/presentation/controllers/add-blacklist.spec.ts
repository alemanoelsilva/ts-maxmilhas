import { AddBlacklist } from './add-blacklist'
import { IHttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-params-error'
import { IDocumentNumberValidation } from '../protocols/validation'

interface ITypes {
  sut: AddBlacklist
  documentNumberValidationStub: IDocumentNumberValidation
}

const makeDocumentNumberValidationStub = (): IDocumentNumberValidation => {
  class DocumentNumberValidationStub implements IDocumentNumberValidation {
    validate(): boolean {
      return true
    }
  }
  return new DocumentNumberValidationStub()
}

const makeSut = (): ITypes => {
  const documentNumberValidationStub = makeDocumentNumberValidationStub()

  const sut = new AddBlacklist(documentNumberValidationStub)

  return {
    sut,
    documentNumberValidationStub
  }
}

const makeFakeRequest = (): any => {
  const succeed: IHttpRequest = {
    body: {
      documentNumber: '999.999.999-99'
    }
  }

  const missingParam: IHttpRequest = {
    body: {}
  }

  return {
    succeed,
    missingParam
  }
}

describe('Controller - Add Blacklist', () => {
  describe('Successful blacklist creation', () => {
    it('should return status code 201 when AddBlacklist succeeds', async() => {
      const { sut } = makeSut()

      const response = await sut.handler(makeFakeRequest().succeed)

      expect(response.body).toEqual({ message: 'Document was created with success' })
      expect(response.statusCode).toEqual(201)
    })
  })

  describe('Failure blacklist creation', () => {
    it('should return status code 400 when document number is not provided', async() => {
      const { sut } = makeSut()

      const response = await sut.handler(makeFakeRequest().missingParam)

      expect(response.body).toEqual(new MissingParamError('documentNumber'))
      expect(response.statusCode).toEqual(400)
    })

    it('should return status code 401 when document number is not valid', async() => {
      const { sut, documentNumberValidationStub } = makeSut()
      jest.spyOn(documentNumberValidationStub, 'validate').mockReturnValueOnce(false)

      const response = await sut.handler(makeFakeRequest().succeed)

      expect(response.body.message).toEqual('Document provided is not valid')
      expect(response.statusCode).toEqual(401)
    })
  })
})

import { AddBlacklist } from './add-blacklist'
import { IHttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-params-error'
import { IValidationAdapter } from '../protocols/validation-adapter'

interface ITypes {
  sut: AddBlacklist
  documentNumberValidationStub: IValidationAdapter
}

const makeDocumentNumberValidationStub = (): IValidationAdapter => {
  class DocumentNumberValidationStub implements IValidationAdapter {
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
  })
})

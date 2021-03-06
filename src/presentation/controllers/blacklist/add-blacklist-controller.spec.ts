import { AddBlacklistController } from './add-blacklist-controller'
import { IHttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-params-error'
import { IDocumentNumberValidation } from '../../protocols/validation'
import { InvalidDocumentNumberError } from '../../errors/invalid-document-number-error'
import { IntervalServerError } from '../../errors/interval-server-error'
import { IAddBlacklist } from '../../../domain/usecases/blacklist/add-blacklist'

interface ITypes {
  sut: AddBlacklistController
  documentNumberValidationStub: IDocumentNumberValidation
  addBlacklistStub: IAddBlacklist
}

const makeDocumentNumberValidationStub = (): IDocumentNumberValidation => {
  class DocumentNumberValidationStub implements IDocumentNumberValidation {
    validate(): boolean {
      return true
    }
  }
  return new DocumentNumberValidationStub()
}

const makeAddBlacklist = (): IAddBlacklist => {
  class AddBlackListStub implements IAddBlacklist {
    async add(document: string): Promise<void> {}
  }
  return new AddBlackListStub()
}

const makeSut = (): ITypes => {
  const documentNumberValidationStub = makeDocumentNumberValidationStub()
  const addBlacklistStub = makeAddBlacklist()

  const sut = new AddBlacklistController(documentNumberValidationStub, addBlacklistStub)

  return {
    sut,
    documentNumberValidationStub,
    addBlacklistStub
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
    it('should return status code 201 when AddBlacklistController succeeds', async() => {
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

      expect(response.body).toEqual(new InvalidDocumentNumberError())
      expect(response.statusCode).toEqual(401)
    })

    it('should return status code 500 when addBlacklist business throws', async() => {
      const fakeError = new Error('Fake error')
      const { sut, addBlacklistStub } = makeSut()
      jest.spyOn(addBlacklistStub, 'add').mockRejectedValue(fakeError)

      const response = await sut.handler(makeFakeRequest().succeed)

      expect(response.body).toEqual(new IntervalServerError(fakeError))
      expect(response.statusCode).toEqual(500)
    })
  })
})

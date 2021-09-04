import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { IController } from '../protocols/controller'
import { badRequest, succeed, unauthorizedRequest } from '../helpers/http/http-helpers'
import { MissingParamError } from '../errors/missing-params-error'
import { InvalidDocumentNumberError } from '../errors/invalid-document-number-error'
import { IDocumentNumberValidation } from '../protocols/validation'

export class AddBlacklist implements IController {
  constructor(private readonly documentNumberValidation: IDocumentNumberValidation) {}

  async handler(request: IHttpRequest): Promise<IHttpResponse> {
    const { documentNumber } = request.body

    if (!documentNumber) {
      const missingParamError = new MissingParamError('documentNumber')
      return new Promise(resolve => resolve(badRequest(missingParamError)))
    }

    if (!this.documentNumberValidation.validate(documentNumber)) {
      const invalidDocumentNumberError = new InvalidDocumentNumberError()
      return new Promise(resolve => resolve(unauthorizedRequest(invalidDocumentNumberError)))
    }

    return new Promise(resolve => resolve(succeed({
      body: {
        message: 'Document was created with success'
      },
      statusCode: 201
    })))
  }
}

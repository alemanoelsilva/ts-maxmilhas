import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { IController } from '../protocols/controller'
import { badRequest, internalServerError, succeed, unauthorizedRequest } from '../helpers/http/http-helpers'
import { MissingParamError } from '../errors/missing-params-error'
import { InvalidDocumentNumberError } from '../errors/invalid-document-number-error'
import { IDocumentNumberValidation } from '../protocols/validation'
import { IAddBlacklist } from '../../domain/usecases/add-blacklist'
import { IntervalServerError } from '../errors/interval-server-error'

export class AddBlacklist implements IController {
  constructor(
    private readonly documentNumberValidation: IDocumentNumberValidation,
    private readonly addBlacklist: IAddBlacklist
  ) {}

  async handler(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { documentNumber } = request.body

      if (!documentNumber) {
        const missingParamError = new MissingParamError('documentNumber')
        return badRequest(missingParamError)
      }

      if (!this.documentNumberValidation.validate(documentNumber)) {
        const invalidDocumentNumberError = new InvalidDocumentNumberError()
        return unauthorizedRequest(invalidDocumentNumberError)
      }

      await this.addBlacklist.add(documentNumber)

      return succeed({
        body: {
          message: 'Document was created with success'
        },
        statusCode: 201
      })
    } catch (error) {
      return internalServerError(new IntervalServerError(error))
    }
  }
}

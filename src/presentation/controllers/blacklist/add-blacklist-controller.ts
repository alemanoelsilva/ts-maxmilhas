import { IHttpRequest, IHttpResponse } from '../../protocols/http'
import { IController } from '../../protocols/controller'
import { badRequest, created, internalServerError, unauthorizedRequest } from '../../helpers/http/http-helpers'
import { MissingParamError } from '../../errors/missing-params-error'
import { InvalidDocumentNumberError } from '../../errors/invalid-document-number-error'
import { IDocumentNumberValidation } from '../../protocols/validation'
import { IntervalServerError } from '../../errors/interval-server-error'
import { IAddBlacklistBusiness } from '../../../application/protocols/add-blacklist'

export class AddBlacklistController implements IController {
  constructor(
    private readonly documentNumberValidation: IDocumentNumberValidation,
    private readonly addBlacklist: IAddBlacklistBusiness
  ) {}

  async handler(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { documentNumber } = request.body

      if (!documentNumber) {
        return badRequest(new MissingParamError('documentNumber'))
      }

      if (!this.documentNumberValidation.validate(documentNumber)) {
        return unauthorizedRequest(new InvalidDocumentNumberError())
      }

      await this.addBlacklist.add(documentNumber)

      return created({ message: 'Document was created with success' })
    } catch (error) {
      return internalServerError(new IntervalServerError(error))
    }
  }
}

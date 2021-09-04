import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { IController } from '../protocols/controller'
import { badRequest, succeed } from '../helpers/http/http-helpers'
import { MissingParamError } from '../errors/missing-params-error'

export class AddBlacklist implements IController {
  async handler(request: IHttpRequest): Promise<IHttpResponse> {
    const { documentNumber } = request.body

    if (!documentNumber) {
      const missingParamError = new MissingParamError('documentNumber')

      return new Promise(resolve => resolve(badRequest(missingParamError)))
    }

    return new Promise(resolve => resolve(succeed({
      body: {
        message: 'Document was created with success'
      },
      statusCode: 201
    })))
  }
}

import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { IController } from '../protocols/controller'

export class AddBlacklist implements IController {
  async handler(request: IHttpRequest): Promise<IHttpResponse> {
    const { documentNumber } = request.body

    if (!documentNumber) {
      return new Promise(resolve => resolve({
        body: {
          message: 'Document was not provided'
        },
        statusCode: 400
      }))
    }

    return new Promise(resolve => resolve({
      body: {
        message: 'Document was created with success'
      },
      statusCode: 201
    }))
  }
}

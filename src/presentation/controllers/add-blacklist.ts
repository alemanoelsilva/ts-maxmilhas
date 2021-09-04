import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'

export class AddBlacklist implements Controller {
  async handler(request: HttpRequest): Promise<HttpResponse> {
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

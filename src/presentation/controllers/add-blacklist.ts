import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddBlacklist {
  handler(request: HttpRequest): HttpResponse {
    if (request.body.documentNumber) {
      return {
        body: {
          message: 'Document was created with success'
        },
        statusCode: 201
      }
    }

    return {
      body: {
        message: 'Document was not provided'
      },
      statusCode: 400
    }
  }
}

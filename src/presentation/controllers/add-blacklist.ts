export class AddBlacklist {
  handler(request: any): any {
    if (request.body.documentNumber) {
      return {
        message: 'Document was created with success',
        statusCode: 201
      }
    }

    return {
      message: 'Document was not provided',
      statusCode: 400
    }
  }
}

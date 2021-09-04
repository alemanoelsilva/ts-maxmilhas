import { IHttpResponse } from '../../protocols/http'

export const succeed = ({ statusCode = 200, body = {} }): IHttpResponse => ({
  statusCode,
  body
})

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

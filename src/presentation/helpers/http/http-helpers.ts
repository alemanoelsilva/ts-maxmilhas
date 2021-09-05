import { IHttpResponse } from '../../protocols/http'

export const succeed = (body = {}): IHttpResponse => ({
  statusCode: 200,
  body
})

export const created = (body = {}): IHttpResponse => ({
  statusCode: 201,
  body
})

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorizedRequest = (error: Error): IHttpResponse => ({
  statusCode: 401,
  body: error
})

export const internalServerError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: error
})

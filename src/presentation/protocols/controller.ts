import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handler: (request: HttpRequest) => Promise<HttpResponse>
}

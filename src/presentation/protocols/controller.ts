import { IHttpRequest, IHttpResponse } from './http'

export interface IController {
  handler: (request: IHttpRequest) => Promise<IHttpResponse>
}

import { Request, Response } from 'express'
import { IController } from '../../presentation/protocols/controller'
import { IHttpRequest, IHttpResponse } from '../../presentation/protocols/http'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }

    const httpResponse: IHttpResponse = await controller.handler(httpRequest)

    if (httpResponse.statusCode < 300) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}

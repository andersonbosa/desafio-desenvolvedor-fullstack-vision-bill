import { ReasonPhrases, StatusCodes } from 'http-status-codes'

class ApiError extends Error {
  statusCode: number

  constructor(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR
  ) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export { ApiError }

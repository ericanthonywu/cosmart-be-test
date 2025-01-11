import STATUS_CODE from "../constant/statusCodeConstant";
import rTracer from "cls-rtracer";
import loggerUtil from "../util/loggerUtil";
import ResponseUtil from "../util/responseUtil";
import Joi from "joi";
import BadRequestException from "../exception/badRequestException";
import express from "express";

/**
 *
 * ../param error {BadRequestException | Error  | Joi.ValidationError}
 * ../param req {e.Request}
 * ../param res {e.Response}
 * ../param next {e.NextFunction}
 */
// eslint-disable-next-line no-unused-vars
export default (error: BadRequestException | Error | Joi.ValidationError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error_response: {message: string, details: any[] | Error} = {
    message: error.message,
    details: "details" in error ? error.details : error,
  };
  res.statusCode = "status" in error ? error.status : STATUS_CODE.INTERNAL_SERVER_ERROR;

  switch (error.constructor.name) {
    case "BadRequestException":
      error_response.message = "Bad Request";
      error_response.details = error.message.split(",");
      break;
    case "UnauthorizedException":
      error_response.details = [];
      break;
    case "JsonWebTokenError":
      res.statusCode = STATUS_CODE.UNAUTHORIZED;
      break;
  }

  if ("isJoi" in error && error.isJoi) {
    res.statusCode = STATUS_CODE.BAD_REQUEST;
    error_response.details = error.details.map(({ message }) => message);
    error_response.message =
      "Some Request is not fulfilling the current requirement";
  }

  if (res.statusCode >= STATUS_CODE.INTERNAL_SERVER_ERROR) {
    loggerUtil.error(`${rTracer.id()} error occurred: ${error} \n stack: ${error.stack}`);
  }

  res.json(
    new ResponseUtil()
      .setError(error_response)
      .setMessage("an error occurred check log for details")
      .toObject(),
  );
};

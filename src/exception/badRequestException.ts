import STATUS_CODE from "../constant/statusCodeConstant";

export default class BadRequestException extends Error {
  status = STATUS_CODE.BAD_REQUEST;
}

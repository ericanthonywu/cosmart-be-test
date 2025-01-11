import winston from "winston";
import rTracer from "cls-rtracer";

const uuidFormat = winston.format((info) => {
  info.uuid = rTracer.id();
  return info;
});

const loggerUtil = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    uuidFormat(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export default loggerUtil;

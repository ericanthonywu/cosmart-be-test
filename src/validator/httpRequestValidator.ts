import Joi from "joi";
import express from "express";

/**
 * General request validator
 *
 * @param key {string}
 * @param schema {Record<string, any>}
 * @returns {(function(express.Request, express.Response, express.NextFunction): Promise<void>)}
 */
const requestValidator = (key: string, schema: Record<string, any>): ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) =>
    async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
      try {
        // @ts-ignore
          req[key] = await Joi.object(schema)
            .options({
              abortEarly: false,
            })
              // @ts-ignore
            .validateAsync(req[key]);
        next();
      } catch (e) {
        next(e);
      }
    };

export const bodyValidator = (schema: Record<string, any>): any => requestValidator("body", schema);

export const queryStringValidator = (schema: Record<string, any>): any => requestValidator("query", schema);

export const urlPathValidator = (schema: Record<string, any>): any => requestValidator("params", schema);

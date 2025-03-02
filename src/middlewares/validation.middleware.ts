import { ObjectSchema } from "yup";
import { Task } from "../schemas/task.schema.ts";
import { NextFunction, Request, Response } from "express";

export function validateBody(schema: ObjectSchema<any>) {
  return validate(schema, 'body');
}

export function validateParams(schema: ObjectSchema<any>) {
  return validate(schema, 'params');
}
export function validateQuery() {

}

export function validate(schema: ObjectSchema<any>, type: ParameterType['field']) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req[type], {abortEarly: false});
    }
    catch (error) {
      res.status(422).send(error.errors);
      return;
    }
    next();
  }
}

interface ParameterType {
  field: 'body' | 'params' | 'query'
}
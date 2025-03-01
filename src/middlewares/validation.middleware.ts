import { ObjectSchema } from "yup";
import { Task } from "../schemas/task.schema.ts";
import { NextFunction, Request, Response } from "express";

export function validateBody(schema: ObjectSchema<Task>) {
  return validate(schema, 'body');
}

export function validateParams() {

}
export function validateQuery() {

}

export function validate(schema: ObjectSchema<any>, type: RequestType['field']) {
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

interface RequestType {
  field: 'body' | 'params' | 'query'
}
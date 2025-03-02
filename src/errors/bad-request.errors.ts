import { badRequestError } from "../helpers/errorHelper";

export function taskBadRequestError(){
  return badRequestError("Task not modified");
}
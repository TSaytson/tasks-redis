import { conflictError } from "../helpers/errorHelper";

export function taskConflictError(){
  return conflictError("Task already exists");
}
import { notFoundError } from "../helpers/errorHelper";

export function taskNotFoundError(){
  return notFoundError("Task does not exists")
}
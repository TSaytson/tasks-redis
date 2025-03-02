import { taskBadRequestError } from "../errors/bad-request.errors.ts";
import { taskConflictError } from "../errors/conflict.errors.ts";
import { taskNotFoundError } from "../errors/not-found.errors.ts";
import { tasksRepository } from "../repositories/tasks.repository.ts";
import {Task} from "../schemas/task.schema.ts";

async function createTask(task: Task){
  const taskFound = await tasksRepository.findByTitle(task.title);
  if (taskFound) throw taskConflictError();
  return await tasksRepository.create(task);
}

async function getTasks(){
  return await tasksRepository.find();
}

async function getTaskById(id: string){
  return await tasksRepository.findById(id);
}

async function updateTask(id: string, task:Task){
  const taskExists = await tasksRepository.findById(id);
  if (!taskExists) throw taskNotFoundError();
  const {modifiedCount} = await tasksRepository.update(id, task);
  if (!modifiedCount) throw taskBadRequestError();
}

async function deleteTask(id:string){
  const taskExists = await tasksRepository.findById(id);
  if (!taskExists) throw taskNotFoundError();
  return await tasksRepository.remove(id);
}

export const tasksService = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
}
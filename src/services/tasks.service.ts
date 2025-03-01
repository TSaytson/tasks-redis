import { tasksRepository } from "../repositories/tasks.repository.ts";
import {Task} from "../schemas/task.schema.ts";

async function createTask(task: Task){
  const taskFound = await tasksRepository.findByTitle(task.title);
  if (taskFound) throw new Error('Task already exists');
  return await tasksRepository.create(task);
}

async function getTasks(){
  return await tasksRepository.find();
}

async function getTaskById(id: string){
  return await tasksRepository.findById(id);
}

async function updateTask(id: string, task:Task){
  return await tasksRepository.update(id, task);
}

async function deleteTask(id:string){
  return await tasksRepository.remove(id);
}

export const tasksService = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
}
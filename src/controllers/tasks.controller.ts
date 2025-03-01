import {Request, Response} from "express";
import { tasksService } from "../services/tasks.service.ts";
import { Task } from "../schemas/task.schema.ts";

export async function getTasks(req:Request, res:Response){
  const tasks = await tasksService.getTasks();
  res.status(200).send(tasks);
}

export async function postTasks(req:Request, res:Response){
  const task:Task = req.body;
  await tasksService.createTask(req.body);
  res.status(201).send({message:`Task ${task.title} created`})
}

export async function getTaskById(req:Request, res:Response){
  const {id} = req.params;
  const task = await tasksService.getTaskById(id);
  res.status(200).send(task);
}

export async function updateTask(req:Request, res:Response){
  const {id} = req.params;
  const task:Task = req.body;
  const {modifiedCount} = await tasksService.updateTask(id, task);
  if (!modifiedCount) throw new Error('Task not modified');
  res.status(200).send(task);
}

export async function deleteTask(req:Request, res:Response){
  const {id} = req.params;
  const {deletedCount} = await tasksService.deleteTask(id);
  if (!deletedCount) throw new Error("Task not deleted");
  res.sendStatus(204)
}
import { Router } from "express";
import { deleteTask, getTaskById, getTasks, postTasks, updateTask } from "../controllers/tasks.controller.ts";
import { validateBody } from "../middlewares/validation.middleware.ts";
import { taskSchema } from "../schemas/task.schema.ts";

export const tasksRouter:Router = Router()

tasksRouter.post('/tasks',validateBody(taskSchema), postTasks);
tasksRouter.get('/tasks', getTasks);
tasksRouter.get('/tasks/:id',/*validateParams()*/ getTaskById);
tasksRouter.put('/tasks/:id', updateTask);
tasksRouter.delete('/tasks/:id', deleteTask);

import { Router } from "express";
import { deleteTask, getTaskById, getTasks, postTasks, updateTask } from "../controllers/tasks.controller.ts";
import { validateBody, validateParams } from "../middlewares/validation.middleware.ts";
import { taskSchema } from "../schemas/task.schema.ts";
import { mongoIdParamsSchema } from "../schemas/idParams.schema.ts";

export const tasksRouter:Router = Router()

tasksRouter.post('/tasks',validateBody(taskSchema), postTasks);
tasksRouter.get('/tasks', getTasks);
tasksRouter.get('/tasks/:id', validateParams(mongoIdParamsSchema), getTaskById);
tasksRouter.put('/tasks/:id', validateParams(mongoIdParamsSchema), updateTask);
tasksRouter.delete('/tasks/:id', validateParams(mongoIdParamsSchema), deleteTask);

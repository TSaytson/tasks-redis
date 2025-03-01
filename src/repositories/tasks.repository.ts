import { ObjectId } from "mongodb";
import { db, redisClient } from "../config/database.ts";
import * as Task from "../schemas/task.schema.ts";

async function create(task: Task.Task) {
  return await db.collection('tasks').insertOne({
    title: task.title,
    done: task.done
  })
}

async function findByTitle(title: string) {
  return await db.collection('tasks').findOne({
    title
  })
}

async function find() {
  const cachedTasks = await redisClient.get('tasks')
  if (!cachedTasks) {
    const tasks = await db.collection('tasks').find().toArray();
    await redisClient.setEx('tasks', 120, JSON.stringify(tasks));
    return tasks;
  }
  return cachedTasks;
}

async function findById(id: string) {
  return await db.collection('tasks').findOne({
    _id: new ObjectId(id)
  })
}

async function remove(id: string) {
  return await db.collection('tasks').deleteOne({
    _id: new ObjectId(id)
  })
}

async function update(id: string, task: Task.Task) {
  return await db.collection('tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: task }
  )
}
export const tasksRepository = {
  create,
  findByTitle,
  find,
  findById,
  update,
  remove
}
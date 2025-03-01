import { MongoClient } from 'mongodb';
import {createClient, RedisClientType} from 'redis';
import 'dotenv/config';

const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017'
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

const mongoClient = new MongoClient(mongoUri, {
  connectTimeoutMS: 1000,
  serverSelectionTimeoutMS: 1000
});

(async () => {
  try {
    await mongoClient.connect();
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
})()

const redisClient:RedisClientType = createClient({url: redisUrl});

redisClient.on('error', error => console.log(`Redis Client Error ${error}`));

(async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected');
  } catch (error) {
    console.error(error);
  } 
})()

const db = mongoClient.db();

export {
  db,
  redisClient
}

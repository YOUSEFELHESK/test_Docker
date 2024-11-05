import express from "express";
import mongoose from "mongoose";
import pkg from 'pg';
const { Client } = pkg;
import redis from 'redis'
//init app
const app = express();

//connect to redis
const REDIS_HOST='redis'
const REDIS_PORT=6379
const redisClient =redis.createClient({
  url:`redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on("error",(err)=> console.log('Redis client Error',err))
redisClient.on("connect",()=> console.log('Connected ro redis',))
redisClient.connect()
//connect db by mongoose
// const DB_USER='root'
// const DB_PASSWORD='example'
// const DB_PORT=27017
// const DB_HOST = 'mongo';

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// mongoose.connect(URI)
//   .then(() => console.log('MongoDB connected.....'))
//   .catch(err => console.log('Failed to connect to MongoDB', err));


//connect db by postgres
const DB_USER='root'
const DB_PASSWORD='example'
const DB_PORT=5432
const DB_HOST = 'postgres';

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client=new Client({
  connectionString:URI
})

client.connect()
  .then(() => console.log('postgres connected.....'))
  .catch(err => console.log('Failed to connect to postgres', err));



const Port = process.env.PORT || 4000;
app.get ("/", (req, res) =>
{
  redisClient.set('products','product.......')
res.send("<h1>Hello from docker serve new the docker..</h1>")
}
);
app.get ("/data", async(req, res) =>
 { const product =await redisClient.get('products');
     res.send(`<h1>Hello from docker serve new docker</h1>
      <h2>${product}</h2>`)
  });

app.listen(Port, () => { 
  console.log("app runnig in port 4000");
});


